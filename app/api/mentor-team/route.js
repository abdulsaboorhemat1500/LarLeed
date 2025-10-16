import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const result = await sql`
      SELECT * FROM mentor_team_member ORDER BY id DESC
    `;
    
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
        error: 'Failed to fetch team members',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
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

    // Validate required fields
    if (!full_name || !email || !job_title || !summary) {
      return NextResponse.json(
        { success: false, error: 'Full name, email, job title, and summary are required' },
        { status: 400 }
      );
    }

    let imagePath = null;

    // Handle image upload
    if (imageFile && imageFile.size > 0) {
      // Create mentor-team-profile directory in public folder
      const uploadsDir = path.join(process.cwd(), 'public', 'mentor-team-profile');
      
      // Create uploads directory if it doesn't exist
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
        console.log('✅ Created directory:', uploadsDir);
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
      imagePath = `/mentor-team-profile/${fileName}`;
      const filePath = path.join(uploadsDir, fileName);

      // Convert file to buffer and save
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      try {
        fs.writeFileSync(filePath, buffer);
        console.log('✅ Image saved to:', filePath);
      } catch (fileError) {
        console.error('❌ File save error:', fileError);
        return NextResponse.json(
          { success: false, error: 'Failed to save image file' },
          { status: 500 }
        );
      }
    }

    // Check if email already exists
    const existingMember = await sql`
      SELECT id FROM mentor_team_member WHERE email = ${email}
    `;

    if (existingMember.length > 0) {
      return NextResponse.json(
        { success: false, error: 'A team member with this email already exists' },
        { status: 400 }
      );
    }

    // Insert into database
    const result = await sql`
      INSERT INTO mentor_team_member (
        full_name, email, phone, job_title, summary, 
        facebook_link, linkedin_link, youtube_link, 
        category, experience, profile_image
      ) VALUES (
        ${full_name},
        ${email},
        ${phone || null},
        ${job_title},
        ${summary},
        ${facebook_link || null},
        ${linkedin_link || null},
        ${youtube_link || null},
        ${category || null},
        ${experience || null},
        ${imagePath}
      )
      RETURNING *
    `;
    
    return NextResponse.json({
      success: true,
      message: 'Team member added successfully!',
      data: result[0]
    });

  } catch (error) {
    console.error('❌ POST Error:', error);
    
    // Handle duplicate email error (PostgreSQL error code)
    if (error.code === '23505') {
      return NextResponse.json(
        { success: false, error: 'A team member with this email already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to add team member',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}