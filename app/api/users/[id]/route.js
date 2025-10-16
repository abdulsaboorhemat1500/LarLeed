import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const result = await sql`
      SELECT 
        id, 
        full_name, 
        username, 
        email, 
        role, 
        is_active, 
        created_at, 
        updated_at 
      FROM users 
      WHERE id = ${parseInt(id)}
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result[0]
    });

  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch user',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { fullName, username, email, role, is_active } = await request.json();

    // Check if user exists
    const userCheck = await sql`SELECT * FROM users WHERE id = ${parseInt(id)}`;
    if (userCheck.length === 0) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Check for duplicate email or username
    const duplicateCheck = await sql`
      SELECT * FROM users 
      WHERE (email = ${email} OR username = ${username}) 
      AND id != ${parseInt(id)}
    `;

    if (duplicateCheck.length > 0) {
      const existingEmail = duplicateCheck.find(user => user.email === email);
      const existingUsername = duplicateCheck.find(user => user.username === username);
      
      if (existingEmail) {
        return NextResponse.json(
          { success: false, error: 'Email already exists' },
          { status: 400 }
        );
      }
      if (existingUsername) {
        return NextResponse.json(
          { success: false, error: 'Username already exists' },
          { status: 400 }
        );
      }
    }

    // Update user
    const result = await sql`
      UPDATE users 
      SET 
        full_name = ${fullName},
        username = ${username},
        email = ${email},
        role = ${role},
        is_active = ${is_active},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${parseInt(id)}
      RETURNING id, full_name, username, email, role, is_active, created_at, updated_at
    `;

    return NextResponse.json({
      success: true,
      data: result[0],
      message: 'User updated successfully'
    });

  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update user',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // Check if user exists
    const userCheck = await sql`SELECT * FROM users WHERE id = ${parseInt(id)}`;
    if (userCheck.length === 0) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Delete user
    await sql`DELETE FROM users WHERE id = ${parseInt(id)}`;

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete user',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}