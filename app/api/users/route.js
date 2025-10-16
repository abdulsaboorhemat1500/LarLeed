import { NextResponse } from 'next/server';
import pool from '@/lib/database';

export async function GET() {
  let client;
  try {
    client = await pool.connect();

    const result = await client.query(`
      SELECT id, full_name, username, email, role, is_active, created_at, updated_at 
      FROM users 
      ORDER BY created_at DESC
    `);

    return NextResponse.json({
      success: true,
      data: result.rows,
      total: result.rows.length
    });

  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    );
  } finally {
    if (client) client.release();
  }
}

export async function POST(request) {
  let client;
  try {
    const { fullName, username, email, password, role } = await request.json();

    // Validate required fields
    if (!fullName || !username || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    client = await pool.connect();

    // Check if user already exists
    const existingUser = await client.query(
      'SELECT * FROM users WHERE email = $1 OR username = $2',
      [email, username]
    );

    if (existingUser.rows.length > 0) {
      const existingEmail = existingUser.rows.find(user => user.email === email);
      const existingUsername = existingUser.rows.find(user => user.username === username);
      
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

    // Hash password
    const bcrypt = await import('bcryptjs');
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Insert new user
    const result = await client.query(
      `INSERT INTO users (full_name, username, email, password_hash, role) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, full_name, username, email, role, is_active, created_at`,
      [fullName, username, email, passwordHash, role || 'user']
    );

    const user = result.rows[0];

    return NextResponse.json({
      success: true,
      data: user,
      message: 'User created successfully'
    });

  } catch (error) {
    console.error('Create user error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create user' },
      { status: 500 }
    );
  } finally {
    if (client) client.release();
  }
}