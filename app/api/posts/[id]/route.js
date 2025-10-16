import { NextResponse } from 'next/server';
import pool from '@/lib/database';
import path from 'path';
import fs from 'fs/promises';

// GET single post
export async function GET(request, { params }) {
  console.log('GET single post called with params:', params);
  let client;
  try {
    
    const { id } = params;
    console.log('Post ID:', id);
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { success: false, error: 'Invalid post ID' },
        { status: 400 }
      );
    }

    client = await pool.connect();
    console.log('Database connected, querying for post ID:', id);
    
    const result = await client.query(
      'SELECT * FROM post_roshangari WHERE id = $1',
      [parseInt(id)]
    );
    
    console.log('Query result:', result.rows);
    
    if (result.rows.length === 0) {
      console.log('No post found with ID:', id);
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch post: ' + error.message },
      { status: 500 }
    );
  } finally {
    if (client) client.release();
  }
}


export async function PUT(request, { params }) {
  let client;
  try {
    console.log('PUT update post called with params:', params);
    
    const { id } = params;
    console.log('Post ID to update:', id);
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { success: false, error: 'Invalid post ID' },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    
    // Log all form data for debugging
    console.log("FormData entries:");
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: File - ${value.name} (${value.size} bytes)`);
      } else {
        console.log(`${key}: ${value}`);
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

    console.log("Extracted values:", {
      post_title,
      author_name,
      author_email,
      author_job_title,
      category,
      post_description,
      has_image: !!post_image,
      remove_image
    });

    // Validate required fields
    if (!post_title || !author_name || !post_description) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: post_title, author_name, and post_description are required' },
        { status: 400 }
      );
    }

    // Get current post data
    client = await pool.connect();
    const currentResult = await client.query(
      'SELECT * FROM post_roshangari WHERE id = $1',
      [parseInt(id)]
    );

    if (currentResult.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    let imagePath = currentResult.rows[0].post_image;

    // Handle image removal
    if (remove_image === 'true' && imagePath) {
      console.log('Removing current image:', imagePath);
      // Delete old image file
      const oldImagePath = path.join(process.cwd(), 'public', imagePath);
      try {
        await fs.unlink(oldImagePath);
        console.log('Old image deleted successfully');
      } catch (error) {
        console.error('Error deleting old image:', error);
      }
      imagePath = null;
    }

    // Handle new image upload
    if (post_image && post_image.size > 0) {
      console.log('Processing new image upload...');
      
      // Delete old image if exists
      if (imagePath) {
        const oldImagePath = path.join(process.cwd(), 'public', imagePath);
        try {
          await fs.unlink(oldImagePath);
          console.log('Old image replaced successfully');
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
        console.log('New image saved successfully:', imagePath);
      } catch (imageError) {
        console.error('Error processing image:', imageError);
        // Continue without image if image processing fails
      }
    }

    // Update database - Note: Your database uses 'auther_' fields but frontend uses 'author_'
    console.log('Updating database...');
    const updateResult = await client.query(
      `UPDATE post_roshangari 
       SET post_title = $1, author_name = $2, author_email = $3, author_job_title = $4, 
           category = $5, post_image = $6, post_description = $7, updated_at = CURRENT_TIMESTAMP
       WHERE id = $8 RETURNING *`,
      [post_title, author_name, author_email, author_job_title, category, imagePath, post_description, parseInt(id)]
    );

    console.log('Update result:', updateResult.rows[0]);

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
  } finally {
    if (client) client.release();
  }
}

// DELETE post
export async function DELETE(request, { params }) {
  let client;
  try {
    console.log('DELETE post called with params:', params);
    
    const { id } = params;
    console.log('Post ID to delete:', id);
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { success: false, error: 'Invalid post ID' },
        { status: 400 }
      );
    }

    // Get current post data to delete image
    client = await pool.connect();
    console.log('Database connected, checking if post exists...');
    
    const currentResult = await client.query(
      'SELECT * FROM post_roshangari WHERE id = $1',
      [parseInt(id)]
    );

    console.log('Current post result:', currentResult.rows);

    if (currentResult.rows.length === 0) {
      console.log('Post not found for deletion, ID:', id);
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    // Delete associated image file
    if (currentResult.rows[0].post_image) {
      const imagePath = path.join(process.cwd(), 'public', currentResult.rows[0].post_image);
      console.log('Attempting to delete image:', imagePath);
      try {
        await fs.unlink(imagePath);
        console.log('Image deleted successfully');
      } catch (error) {
        console.error('Error deleting image file:', error);
      }
    }

    // Delete from database
    console.log('Deleting post from database...');
    await client.query('DELETE FROM post_roshangari WHERE id = $1', [parseInt(id)]);

    console.log('Post deleted successfully');
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
  } finally {
    if (client) client.release();
  }
}

