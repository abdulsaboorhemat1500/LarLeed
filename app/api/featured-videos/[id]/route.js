import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import path from 'path';
import fs from 'fs/promises';

// GET single featured video
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { success: false, error: 'Invalid video ID' },
        { status: 400 }
      );
    }

    const result = await sql`
      SELECT * FROM featured_videos WHERE id = ${parseInt(id)}
    `;
    
    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Video not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: result[0]
    });
  } catch (error) {
    console.error('Error fetching video:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch video' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { success: false, error: 'Invalid video ID' },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    
    const v_title = formData.get('v_title');
    const v_creature = formData.get('v_creature');
    const v_link = formData.get('v_link');
    const v_description = formData.get('v_description');
    const v_category = formData.get('v_category');
    const v_image = formData.get('v_image');
    const remove_image = formData.get('remove_image');

    // Validate required fields
    if (!v_title || !v_category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: v_title and v_category are required' },
        { status: 400 }
      );
    }

    // Get current video data
    const currentResult = await sql`
      SELECT * FROM featured_videos WHERE id = ${parseInt(id)}
    `;

    if (currentResult.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Video not found' },
        { status: 404 }
      );
    }

    let imagePath = currentResult[0].v_image;

    // Handle image removal
    if (remove_image === 'true' && imagePath) {
      const oldImagePath = path.join(process.cwd(), 'public', imagePath);
      
      try {
        await fs.unlink(oldImagePath);
      } catch (error) {
        // Continue even if deletion fails
      }
      imagePath = null;
    }

    // Handle new image upload
    if (v_image && v_image.size > 0) {
      
      // Delete old image if exists
      if (imagePath) {
        const oldImagePath = path.join(process.cwd(), 'public', imagePath);
        try {
          await fs.unlink(oldImagePath);
        } catch (error) {
        }
      }

      // Upload new image
      try {
        const bytes = await v_image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        const timestamp = Date.now();
        const originalName = v_image.name;
        const fileExtension = originalName.split('.').pop();
        const fileName = `video-${timestamp}.${fileExtension}`;
        
        const uploadDir = path.join(process.cwd(), 'public', 'featured-videos');
        
        // Ensure upload directory exists
        try {
          await fs.access(uploadDir);
        } catch {
          await fs.mkdir(uploadDir, { recursive: true });
        }
        
        const filePath = path.join(uploadDir, fileName);
        
        await fs.writeFile(filePath, buffer);
        
        imagePath = `/featured-videos/${fileName}`;
      } catch (imageError) {
        // Continue without image if image processing fails
      }
    }

    // Update database
    const updateResult = await sql`
      UPDATE featured_videos 
      SET 
        v_title = ${v_title},
        v_image = ${imagePath},
        v_creature = ${v_creature},
        v_link = ${v_link},
        v_description = ${v_description},
        v_category = ${v_category},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${parseInt(id)}
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      data: updateResult[0],
      message: 'Video updated successfully'
    });

  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update video: ' + error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

// DELETE featured video
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { success: false, error: 'Invalid video ID' },
        { status: 400 }
      );
    }

    // Get current video data to delete image
    const currentResult = await sql`
      SELECT * FROM featured_videos WHERE id = ${parseInt(id)}
    `;

    if (currentResult.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Video not found' },
        { status: 404 }
      );
    }

    // Delete associated image file
    if (currentResult[0].v_image) {
      const imagePath = path.join(process.cwd(), 'public', currentResult[0].v_image);
      try {
        await fs.unlink(imagePath);
      } catch (error) {
        console.error('Error deleting image file:', error);
      }
    }

    // Delete from database
    await sql`DELETE FROM featured_videos WHERE id = ${parseInt(id)}`;

    return NextResponse.json({
      success: true,
      message: 'Video deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting video:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete video' },
      { status: 500 }
    );
  }
}