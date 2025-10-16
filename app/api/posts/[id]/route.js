import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import path from 'path';
import fs from 'fs/promises';

// GET single post
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { success: false, error: 'Invalid post ID' },
        { status: 400 }
      );
    }
    
    const result = await sql`
      SELECT * FROM post_roshangari WHERE id = ${parseInt(id)}
    `;
    
    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      data: result[0]
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch post: ' + error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { success: false, error: 'Invalid post ID' },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
      } else {
      }
    }
    
    const post_title = formData.get('post_title');
    const author_name = formData.get('author_name');
    const author_email = formData.get('author_email');
    const author_job_title = formData.get('author_job_title');
    const category = formData.get('category');
    const post_description = formData.get('post_description');
    const post_image = formData.get('post_image');
    const remove_image = formData.get('remove_image');

    // Validate required fields
    if (!post_title || !author_name || !post_description) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: post_title, author_name, and post_description are required' },
        { status: 400 }
      );
    }

    // Get current post data
    const currentResult = await sql`
      SELECT * FROM post_roshangari WHERE id = ${parseInt(id)}
    `;

    if (currentResult.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    let imagePath = currentResult[0].post_image;

    // Handle image removal
    if (remove_image === 'true' && imagePath) {
      // Delete old image file
      const oldImagePath = path.join(process.cwd(), 'public', imagePath);
      try {
        await fs.unlink(oldImagePath);
      } catch (error) {
        console.error('Error deleting old image:', error);
      }
      imagePath = null;
    }

    // Handle new image upload
    if (post_image && post_image.size > 0) {
      // Delete old image if exists
      if (imagePath) {
        const oldImagePath = path.join(process.cwd(), 'public', imagePath);
        try {
          await fs.unlink(oldImagePath);
        } catch (error) {
          console.error('Error deleting old image:', error);
        }
      }

      // Upload new image
      try {
        const bytes = await post_image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const timestamp = Date.now();
        const originalName = post_image.name;
        const fileExtension = originalName.split('.').pop();
        const fileName = `post-${timestamp}.${fileExtension}`;
        const uploadDir = path.join(process.cwd(), 'public', 'posts');
        
        // Ensure upload directory exists
        try {
          await fs.access(uploadDir);
        } catch {
          await fs.mkdir(uploadDir, { recursive: true });
        }
        
        const filePath = path.join(uploadDir, fileName);
        await fs.writeFile(filePath, buffer);
        
        imagePath = `/posts/${fileName}`;
      } catch (imageError) {
        console.error('Error processing image:', imageError);
        // Continue without image if image processing fails
      }
    }

    // Update database
    const updateResult = await sql`
      UPDATE post_roshangari 
      SET 
        post_title = ${post_title},
        author_name = ${author_name},
        author_email = ${author_email},
        author_job_title = ${author_job_title},
        category = ${category},
        post_image = ${imagePath},
        post_description = ${post_description},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${parseInt(id)}
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      data: {
        id: parseInt(id),
        post_title,
        author_name,
        author_email,
        author_job_title,
        category,
        post_image: imagePath,
        post_description
      },
      message: 'Post updated successfully'
    });

  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update post: ' + error.message },
      { status: 500 }
    );
  }
}

// DELETE post
export async function DELETE(request, { params }) {
  try {
    
    const { id } = params;
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { success: false, error: 'Invalid post ID' },
        { status: 400 }
      );
    }

    // Get current post data to delete image
    
    const currentResult = await sql`
      SELECT * FROM post_roshangari WHERE id = ${parseInt(id)}
    `;

    if (currentResult.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    // Delete associated image file
    if (currentResult[0].post_image) {
      const imagePath = path.join(process.cwd(), 'public', currentResult[0].post_image);
      try {
        await fs.unlink(imagePath);
      } catch (error) {
        console.error('Error deleting image file:', error);
      }
    }

    // Delete from database
    await sql`DELETE FROM post_roshangari WHERE id = ${parseInt(id)}`;
    return NextResponse.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete post: ' + error.message },
      { status: 500 }
    );
  }
}