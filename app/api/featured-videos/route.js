import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import path from 'path';
import fs from 'fs/promises';

// GET all featured videos
export async function GET() {
  try {
    // Create table if it doesn't exist (Note: This might not be needed if tables are already created)
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS featured_videos (
          id SERIAL PRIMARY KEY,
          v_title VARCHAR(500) NOT NULL,
          v_image VARCHAR(500),
          v_creature VARCHAR(255),
          v_link VARCHAR(500),
          v_description TEXT,
          v_category VARCHAR(100),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
    } catch (createError) {
      // Table might already exist, continue
    }

    const result = await sql`
      SELECT * FROM featured_videos 
      ORDER BY created_at DESC
    `;
    
    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching featured videos:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch featured videos' },
      { status: 500 }
    );
  }
}

// POST new featured video
export async function POST(request) {
  try {
    const formData = await request.formData();
    
    const v_title = formData.get('v_title');
    const v_creature = formData.get('v_creature');
    const v_link = formData.get('v_link');
    const v_description = formData.get('v_description');
    const v_category = formData.get('v_category');
    const v_image = formData.get('v_image');

    // Validate required fields
    if (!v_title || !v_category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: v_title and v_category are required' },
        { status: 400 }
      );
    }

    let imagePath = null;

    // Handle image upload
    if (v_image && v_image.size > 0) {
      try {
        const bytes = await v_image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Create unique filename
        const timestamp = Date.now();
        const originalName = v_image.name;
        const fileExtension = originalName.split('.').pop();
        const fileName = `video-${timestamp}.${fileExtension}`;
        
        // Define upload directory
        const uploadDir = path.join(process.cwd(), 'public/featured-videos');
        
        // Ensure upload directory exists
        try {
          await fs.access(uploadDir);
        } catch {
          await fs.mkdir(uploadDir, { recursive: true });
        }
        
        // Save file
        const filePath = path.join(uploadDir, fileName);
        await fs.writeFile(filePath, buffer);
        
        imagePath = `/featured-videos/${fileName}`;
      } catch (imageError) {
        console.error("Error processing image:", imageError);
        // Continue without image if image processing fails
      }
    }

    // Insert into database
    const result = await sql`
      INSERT INTO featured_videos 
      (v_title, v_image, v_creature, v_link, v_description, v_category) 
      VALUES (${v_title}, ${imagePath}, ${v_creature}, ${v_link}, ${v_description}, ${v_category})
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      data: result[0],
      message: 'Featured video created successfully'
    });

  } catch (error) {
    console.error('Error creating featured video:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create featured video' },
      { status: 500 }
    );
  }
}