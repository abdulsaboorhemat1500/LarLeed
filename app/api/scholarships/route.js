import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { writeFile } from 'fs/promises';
import path from 'path';
import fs from 'fs/promises';

export async function GET() {
  try {
    const result = await sql`SELECT * FROM scholarships ORDER BY created_at DESC`;
    
    return NextResponse.json({
      success: true,
      data: result,
      count: result.length
    });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch scholarships',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    // Extract all form fields
    const s_name = formData.get('s_name');
    const s_country = formData.get('s_country');
    const s_university = formData.get('s_university');
    const s_language = formData.get('s_language');
    const s_gender = formData.get('s_gender');
    const s_study_level = formData.get('s_study_level');
    const s_app_deadline = formData.get('s_app_deadline');
    const s_duration = formData.get('s_duration');
    const s_funding_type = formData.get('s_funding_type');
    const s_overview = formData.get('s_overview');
    const s_detailed_info = formData.get('s_detailed_info');
    const s_eligibility = formData.get('s_eligibility');
    const s_app_procces = formData.get('s_app_procces');
    const s_benefits = formData.get('s_benefits');
    const file = formData.get('s_image');

    // Validate required fields
    if (!s_name || !s_country || !s_university) {
      console.log('❌ Missing required fields:', { s_name, s_country, s_university });
      return NextResponse.json(
        { success: false, error: 'Name, country, and university are required' },
        { status: 400 }
      );
    }

    let imageUrl = '';

    // Handle file upload if a file was provided
    if (file && file.size > 0) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        console.log('❌ Invalid file type:', file.type);
        return NextResponse.json(
          { success: false, error: 'Only image files are allowed' },
          { status: 400 }
        );
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        console.log('❌ File too large:', file.size);
        return NextResponse.json(
          { success: false, error: 'File size must be less than 5MB' },
          { status: 400 }
        );
      }

      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const timestamp = Date.now();
        const originalName = file.name;
        const fileExtension = path.extname(originalName);
        const fileName = `scholarship-${timestamp}${fileExtension}`;
        
        // Path to public folder
        const publicPath = path.join(process.cwd(), 'public', 'scholarshipfile', fileName);
        
        // Ensure uploads directory exists
        const uploadsDir = path.join(process.cwd(), 'public', 'scholarshipfile');
        try {
          await fs.access(uploadsDir);
        } catch {
          await fs.mkdir(uploadsDir, { recursive: true });
        }

        await writeFile(publicPath, buffer);

        // Set the image URL
        imageUrl = `/scholarshipfile/${fileName}`;
        
      } catch (fileError) {
        return NextResponse.json(
          { success: false, error: 'Failed to upload image file' },
          { status: 500 }
        );
      }
    } else {
      console.log('📁 No file provided or empty file');
    }

    // Insert into database
    const result = await sql`
      INSERT INTO scholarships (
        s_name, s_image, s_country, s_university, s_language, s_gender, 
        s_study_level, s_app_deadline, s_duration, s_funding_type, 
        s_overview, s_detailed_info, s_eligibility, s_app_procces, s_benefits
      ) VALUES (
        ${s_name},
        ${imageUrl},
        ${s_country},
        ${s_university},
        ${s_language},
        ${s_gender},
        ${s_study_level},
        ${s_app_deadline},
        ${s_duration},
        ${s_funding_type},
        ${s_overview},
        ${s_detailed_info},
        ${s_eligibility},
        ${s_app_procces},
        ${s_benefits}
      )
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      message: 'Scholarship created successfully',
      data: result[0]
    });

  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create scholarship',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// DELETE scholarship by ID
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Scholarship ID is required' },
        { status: 400 }
      );
    }

    // First, get the scholarship to check if it has an image to delete
    const scholarshipResult = await sql`
      SELECT s_image FROM scholarships WHERE id = ${parseInt(id)}
    `;

    if (scholarshipResult.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Scholarship not found' },
        { status: 404 }
      );
    }

    // Delete the scholarship
    const result = await sql`
      DELETE FROM scholarships WHERE id = ${parseInt(id)}
      RETURNING *
    `;

    // Optional: Delete the associated image file
    const scholarship = scholarshipResult[0];
    if (scholarship.s_image && scholarship.s_image.startsWith('/scholarshipfile/')) {
      try {
        const imagePath = path.join(process.cwd(), 'public', scholarship.s_image);
        await fs.unlink(imagePath);
      } catch (fileError) {
        // Continue even if file deletion fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Scholarship deleted successfully',
      data: result[0]
    });

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete scholarship' },
      { status: 500 }
    );
  }
}

// PUT update scholarship
export async function PUT(request) {
  try {
    const formData = await request.formData();
    
    // Extract all form fields
    const id = formData.get('id');
    const s_name = formData.get('s_name');
    const s_country = formData.get('s_country');
    const s_university = formData.get('s_university');
    const s_language = formData.get('s_language');
    const s_gender = formData.get('s_gender');
    const s_study_level = formData.get('s_study_level');
    const s_app_deadline = formData.get('s_app_deadline');
    const s_duration = formData.get('s_duration');
    const s_funding_type = formData.get('s_funding_type');
    const s_overview = formData.get('s_overview');
    const s_detailed_info = formData.get('s_detailed_info');
    const s_eligibility = formData.get('s_eligibility');
    const s_app_procces = formData.get('s_app_procces');
    const s_benefits = formData.get('s_benefits');
    const file = formData.get('s_image');
    const remove_image = formData.get('remove_image');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Scholarship ID is required' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!s_name || !s_country || !s_university) {
      return NextResponse.json(
        { success: false, error: 'Name, country, and university are required' },
        { status: 400 }
      );
    }

    // First, get the current scholarship data
    const currentScholarship = await sql`
      SELECT s_image FROM scholarships WHERE id = ${parseInt(id)}
    `;

    if (currentScholarship.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Scholarship not found' },
        { status: 404 }
      );
    }

    let imageUrl = currentScholarship[0].s_image;

    // Handle image removal
    if (remove_image === 'true') {
      // Delete the old image file
      if (imageUrl && imageUrl.startsWith('/scholarshipfile/')) {
        try {
          const imagePath = path.join(process.cwd(), 'public', imageUrl);
          await fs.unlink(imagePath);
          console.log('🗑️ Deleted old image file:', imageUrl);
        } catch (fileError) {
          console.warn('⚠️ Could not delete old image file:', fileError.message);
        }
      }
      imageUrl = '';
    }

    // Handle new file upload
    if (file && file.size > 0) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        return NextResponse.json(
          { success: false, error: 'Only image files are allowed' },
          { status: 400 }
        );
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, error: 'File size must be less than 5MB' },
          { status: 400 }
        );
      }

      // Delete the old image file if it exists
      if (imageUrl && imageUrl.startsWith('/scholarshipfile/')) {
        try {
          const oldImagePath = path.join(process.cwd(), 'public', imageUrl);
          await fs.unlink(oldImagePath);
          console.log('🗑️ Deleted old image file:', imageUrl);
        } catch (fileError) {
          console.warn('⚠️ Could not delete old image file:', fileError.message);
        }
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create unique filename
      const timestamp = Date.now();
      const originalName = file.name;
      const fileExtension = path.extname(originalName);
      const fileName = `scholarship-${timestamp}${fileExtension}`;
      
      // Path to public folder
      const publicPath = path.join(process.cwd(), 'public', 'scholarshipfile', fileName);
      
      // Ensure uploads directory exists
      const uploadsDir = path.join(process.cwd(), 'public', 'scholarshipfile');
      try {
        await fs.access(uploadsDir);
      } catch {
        await fs.mkdir(uploadsDir, { recursive: true });
      }

      // Write file to public/uploads directory
      await writeFile(publicPath, buffer);

      // Set the new image URL
      imageUrl = `/scholarshipfile/${fileName}`;
    }

    // Update the scholarship
    const result = await sql`
      UPDATE scholarships SET 
        s_name = ${s_name},
        s_image = ${imageUrl},
        s_country = ${s_country},
        s_university = ${s_university},
        s_language = ${s_language},
        s_gender = ${s_gender},
        s_study_level = ${s_study_level},
        s_app_deadline = ${s_app_deadline},
        s_duration = ${s_duration},
        s_funding_type = ${s_funding_type},
        s_overview = ${s_overview},
        s_detailed_info = ${s_detailed_info},
        s_eligibility = ${s_eligibility},
        s_app_procces = ${s_app_procces},
        s_benefits = ${s_benefits},
        updated_at = NOW()
      WHERE id = ${parseInt(id)}
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      message: 'Scholarship updated successfully',
      data: result[0]
    });

  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update scholarship' },
      { status: 500 }
    );
  }
}