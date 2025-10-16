import { NextResponse } from 'next/server';
import pool from '@/lib/database';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM scholarships ORDER BY created_at DESC");
    const data = result.rows;
    client.release();
    
    return NextResponse.json({
      success: true,
      data: data,
      count: data.length
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
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
          await require('fs').promises.access(uploadsDir);
        } catch {
          await require('fs').promises.mkdir(uploadsDir, { recursive: true });
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

    
    // Test database connection first
    try {
      await pool.query('SELECT 1');
    } catch (dbError) {
      return NextResponse.json(
        { success: false, error: 'Database connection failed' },
        { status: 500 }
      );
    }

    // Insert into database
    const result = await pool.query(
      `INSERT INTO scholarships (
        s_name, s_image, s_country, s_university, s_language, s_gender, 
        s_study_level, s_app_deadline, s_duration, s_funding_type, 
        s_overview, s_detailed_info, s_eligibility, s_app_procces, s_benefits
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) 
      RETURNING *`,
      [
        s_name, imageUrl, s_country, s_university, s_language, s_gender,
        s_study_level, s_app_deadline, s_duration, s_funding_type,
        s_overview, s_detailed_info, s_eligibility, s_app_procces, s_benefits
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Scholarship created successfully',
      data: result.rows[0]
    });

  } catch (error) {
    
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
    const scholarshipResult = await pool.query(
      'SELECT s_image FROM scholarships WHERE id = $1',
      [id]
    );

    if (scholarshipResult.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Scholarship not found' },
        { status: 404 }
      );
    }

    // Delete the scholarship
    const result = await pool.query(
      'DELETE FROM scholarships WHERE id = $1 RETURNING *',
      [id]
    );

    // Optional: Delete the associated image file
    const scholarship = scholarshipResult.rows[0];
    if (scholarship.s_image && scholarship.s_image.startsWith('/scholarshipfile/')) {
      try {
        const fs = require('fs').promises;
        const imagePath = path.join(process.cwd(), 'public', scholarship.s_image);
        await fs.unlink(imagePath);
      } catch (fileError) {
        // Continue even if file deletion fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Scholarship deleted successfully',
      data: result.rows[0]
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
    const currentScholarship = await pool.query(
      'SELECT s_image FROM scholarships WHERE id = $1',
      [id]
    );

    if (currentScholarship.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Scholarship not found' },
        { status: 404 }
      );
    }

    let imageUrl = currentScholarship.rows[0].s_image;

    // Handle image removal
    if (remove_image === 'true') {
      // Delete the old image file
      if (imageUrl && imageUrl.startsWith('/scholarshipfile/')) {
        try {
          const fs = require('fs').promises;
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
          const fs = require('fs').promises;
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
        await require('fs').promises.access(uploadsDir);
      } catch {
        await require('fs').promises.mkdir(uploadsDir, { recursive: true });
      }

      // Write file to public/uploads directory
      await writeFile(publicPath, buffer);

      // Set the new image URL
      imageUrl = `/scholarshipfile/${fileName}`;
    }

    // Update the scholarship
    const result = await pool.query(
      `UPDATE scholarships SET 
        s_name = $1, s_image = $2, s_country = $3, s_university = $4, 
        s_language = $5, s_gender = $6, s_study_level = $7, s_app_deadline = $8, 
        s_duration = $9, s_funding_type = $10, s_overview = $11, s_detailed_info = $12, 
        s_eligibility = $13, s_app_procces = $14, s_benefits = $15,
        updated_at = NOW()
      WHERE id = $16 
      RETURNING *`,
      [
        s_name, imageUrl, s_country, s_university, s_language, s_gender,
        s_study_level, s_app_deadline, s_duration, s_funding_type,
        s_overview, s_detailed_info, s_eligibility, s_app_procces, s_benefits,
        id
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Scholarship updated successfully',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update scholarship' },
      { status: 500 }
    );
  }
}