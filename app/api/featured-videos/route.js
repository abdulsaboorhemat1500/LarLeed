import { NextResponse } from 'next/server';
import pool from '@/lib/database';
import path from 'path';
import fs from 'fs/promises';

// GET all featured videos
export async function GET() {
  let client;
  try {
    client = await pool.connect();
    
    // Create table if it doesn't exist
    await client.query(`
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
    `);

    const result = await client.query(`
      SELECT * FROM featured_videos 
      ORDER BY created_at DESC
    `);
    
    return NextResponse.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching featured videos:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch featured videos' },
      { status: 500 }
    );
  } finally {
    if (client) client.release();
  }
}

// POST new featured video
export async function POST(request) {
  let client;
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

    client = await pool.connect();
    
    // Insert into database
    const result = await client.query(
      `INSERT INTO featured_videos 
       (v_title, v_image, v_creature, v_link, v_description, v_category) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [v_title, imagePath, v_creature, v_link, v_description, v_category]
    );

    return NextResponse.json({
      success: true,
      data: result.rows[0],
      message: 'Featured video created successfully'
    });

  } catch (error) {
    console.error('Error creating featured video:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create featured video' },
      { status: 500 }
    );
  } finally {
    if (client) client.release();
  }
}