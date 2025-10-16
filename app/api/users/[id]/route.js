import { NextResponse } from 'next/server';
import pool from '@/lib/database';

export async function GET(request, { params }) {
  let client;
  try {
    const { id } = params;
    client = await pool.connect();

    const result = await client.query(
      `SELECT id, full_name, username, email, role, is_active, created_at, updated_at 
       FROM users WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user' },
      { status: 500 }
    );
  } finally {
    if (client) client.release();
  }
}

export async function PUT(request, { params }) {
  let client;
  try {
    const { id } = params;
    const { fullName, username, email, role, is_active } = await request.json();

    client = await pool.connect();

    // Check if user exists
    const userCheck = await client.query('SELECT * FROM users WHERE id = $1', [id]);
    if (userCheck.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Check for duplicate email or username
    const duplicateCheck = await client.query(
      'SELECT * FROM users WHERE (email = $1 OR username = $2) AND id != $3',
      [email, username, id]
    );

    if (duplicateCheck.rows.length > 0) {
      const existingEmail = duplicateCheck.rows.find(user => user.email === email);
      const existingUsername = duplicateCheck.rows.find(user => user.username === username);
      
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
    const result = await client.query(
      `UPDATE users 
       SET full_name = $1, username = $2, email = $3, role = $4, is_active = $5, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $6 
       RETURNING id, full_name, username, email, role, is_active, created_at, updated_at`,
      [fullName, username, email, role, is_active, id]
    );

    return NextResponse.json({
      success: true,
      data: result.rows[0],
      message: 'User updated successfully'
    });

  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update user' },
      { status: 500 }
    );
  } finally {
    if (client) client.release();
  }
}

export async function DELETE(request, { params }) {
  let client;
  try {
    const { id } = params;
    client = await pool.connect();

    // Check if user exists
    const userCheck = await client.query('SELECT * FROM users WHERE id = $1', [id]);
    if (userCheck.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Delete user
    await client.query('DELETE FROM users WHERE id = $1', [id]);

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete user' },
      { status: 500 }
    );
  } finally {
    if (client) client.release();
  }
}