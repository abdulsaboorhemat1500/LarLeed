import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import path from 'path';
import fs from 'fs/promises';

export async function GET() {
  try {
    const result = await sql`
      SELECT * FROM post_roshangari 
      ORDER BY created_at DESC
    `;
    
    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    console.log("API Route called");

    const formData = await request.formData();
    
    // Log all form data fields
    console.log("FormData entries:");
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: File - ${value.name} (${value.size} bytes)`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }
    
    const post_title = formData.get('post_title');
    const auther_name = formData.get('auther_name');
    const auther_email = formData.get('auther_email');
    const auther_job_title = formData.get('auther_job_title');
    const post_category = formData.get('post_category');
    const post_description = formData.get('post_description');
    const post_image = formData.get('post_image');

    console.log("Extracted values:", {
      post_title,
      auther_name,
      auther_email,
      auther_job_title,
      post_category,
      post_description,
      has_image: !!post_image
    });

    // Validate required fields
    if (!post_title || !auther_name || !post_description) {
      console.log("Validation failed - missing required fields");
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: post_title, auther_name, and post_description are required' 
        },
        { status: 400 }
      );
    }

    let imagePath = null;

    // Handle image upload
    if (post_image && post_image.size > 0) {
      console.log("Processing image upload...");
      try {
        const bytes = await post_image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Create unique filename
        const timestamp = Date.now();
        const originalName = post_image.name;
        const fileExtension = originalName.split('.').pop();
        const fileName = `post-${timestamp}.${fileExtension}`;
        
        // Define upload directory
        const uploadDir = path.join(process.cwd(), 'public/posts');
        
        console.log("Upload directory:", uploadDir);
        
        // Ensure upload directory exists
        try {
          await fs.access(uploadDir);
          console.log("Upload directory exists");
        } catch {
          console.log("Creating upload directory...");
          await fs.mkdir(uploadDir, { recursive: true });
        }
        
        // Save file
        const filePath = path.join(uploadDir, fileName);
        console.log("Saving file to:", filePath);
        await fs.writeFile(filePath, buffer);
        
        imagePath = `/posts/${fileName}`;
        console.log("Image saved successfully:", imagePath);
      } catch (imageError) {
        console.error("Error processing image:", imageError);
        // Continue without image if image processing fails
      }
    } else {
    }

    
    // Test database connection first
    try {
      console.log("Testing database connection...");
      const testResult = await sql`SELECT 1 as test`;
      console.log("Database connection test passed:", testResult);
    } catch (dbError) {
      console.error("Database connection failed:", dbError);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Database connection failed: ' + dbError.message 
        },
        { status: 500 }
      );
    }

    // Insert into database - FIXED: Use correct column names that match your table
    const result = await sql`
      INSERT INTO post_roshangari 
      (post_title, author_name, author_email, author_job_title, category, post_image, post_description) 
      VALUES (
        ${post_title},
        ${auther_name},
        ${auther_email},
        ${auther_job_title},
        ${post_category},
        ${imagePath},
        ${post_description}
      )
      RETURNING *
    `;

    if (!result || result.length === 0) {
      throw new Error('Database insert failed - no rows returned');
    }

    const createdPost = result[0];

    return NextResponse.json({
      success: true,
      data: createdPost,
      message: 'Post created successfully'
    });

  } catch (error) {
    console.error('Error creating post:', error);
    console.error('Error stack:', error.stack);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create post: ' + error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}