import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { success: false, error: 'Invalid team member ID' },
        { status: 400 }
      );
    }

    const result = await sql`
      SELECT * FROM mentor_team_member WHERE id = ${parseInt(id)}
    `;
    
    const data = result[0];

    if (!data) {
      return NextResponse.json(
        { success: false, error: 'Team member not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch team member',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { success: false, error: 'Invalid team member ID' },
        { status: 400 }
      );
    }

    // Check if team member exists
    const checkResult = await sql`
      SELECT * FROM mentor_team_member WHERE id = ${parseInt(id)}
    `;

    if (checkResult.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Team member not found' },
        { status: 404 }
      );
    }

    // Delete team member
    await sql`DELETE FROM mentor_team_member WHERE id = ${parseInt(id)}`;
    
    return NextResponse.json({
      success: true,
      message: 'Team member deleted successfully!'
    });

  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete team member',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { success: false, error: 'Invalid team member ID' },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    
    // Get all form fields
    const full_name = formData.get('full_name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const job_title = formData.get('job_title');
    const summary = formData.get('summary');
    const facebook_link = formData.get('facebook_link');
    const linkedin_link = formData.get('linkedin_link');
    const youtube_link = formData.get('youtube_link');
    const category = formData.get('category');
    const experience = formData.get('experience');
    const imageFile = formData.get('image');
    const remove_image = formData.get('remove_image');

    // Validate required fields
    if (!full_name || !email || !job_title || !summary) {
      return NextResponse.json(
        { success: false, error: 'Full name, email, job title, and summary are required' },
        { status: 400 }
      );
    }

    // Check if team member exists
    const checkResult = await sql`
      SELECT * FROM mentor_team_member WHERE id = ${parseInt(id)}
    `;

    if (checkResult.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Team member not found' },
        { status: 404 }
      );
    }

    let imagePath = checkResult[0].profile_image; // Keep current image by default

    // Handle image upload/removal
    if (remove_image === 'true') {
      // Remove image
      imagePath = null;
    } else if (imageFile && imageFile.size > 0) {
      // Handle new image upload
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'mentor-team-profile');
      
      // Create uploads directory if it doesn't exist
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(imageFile.type)) {
        return NextResponse.json(
          { success: false, error: 'Invalid image file type. Please upload JPEG, PNG, or GIF.' },
          { status: 400 }
        );
      }

      // Validate file size (5MB max)
      if (imageFile.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, error: 'Image size must be less than 5MB' },
          { status: 400 }
        );
      }

      // Generate unique filename
      const fileExtension = path.extname(imageFile.name);
      const fileName = `mentor-${Date.now()}${fileExtension}`;
      imagePath = `/uploads/mentor-team-profile/${fileName}`;
      const filePath = path.join(uploadsDir, fileName);

      // Convert file to buffer and save
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      try {
        fs.writeFileSync(filePath, buffer);
        console.log('✅ New image saved to:', filePath);
      } catch (fileError) {
        console.error('❌ File save error:', fileError);
        return NextResponse.json(
          { success: false, error: 'Failed to save image file' },
          { status: 500 }
        );
      }
    }

    // Update team member
    const result = await sql`
      UPDATE mentor_team_member 
      SET 
        full_name = ${full_name},
        email = ${email},
        phone = ${phone || null},
        job_title = ${job_title},
        summary = ${summary},
        facebook_link = ${facebook_link || null},
        linkedin_link = ${linkedin_link || null},
        youtube_link = ${youtube_link || null},
        category = ${category || null},
        experience = ${experience || null},
        profile_image = ${imagePath}
      WHERE id = ${parseInt(id)}
      RETURNING *
    `;

    console.log('✅ Team member updated successfully:', result[0].id);
    
    return NextResponse.json({
      success: true,
      message: 'Team member updated successfully!',
      data: result[0]
    });

  } catch (error) {
    console.error('❌ PUT Error:', error);
    
    // Handle duplicate email error
    if (error.code === '23505') {
      return NextResponse.json(
        { success: false, error: 'A team member with this email already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update team member',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}