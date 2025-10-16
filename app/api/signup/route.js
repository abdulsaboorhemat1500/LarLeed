import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool from '@/lib/database';

export async function POST(request) {
  let client;
  try {
    const { fullName, username, email, password } = await request.json();

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
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Insert new user
    const result = await client.query(
      `INSERT INTO users (full_name, username, email, password_hash) 
       VALUES ($1, $2, $3, $4) RETURNING id, full_name, username, email, role, created_at`,
      [fullName, username, email, passwordHash]
    );

    const user = result.rows[0];

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        fullName: user.full_name,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.created_at
      },
      message: 'Account created successfully'
    });

  } catch (error) {
    console.error('Signup API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create account',
        details: error.message 
      },
      { status: 500 }
    );
  } finally {
    if (client) {
      client.release();
    }
  }
}