import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { sql } from '@/lib/db';

export async function POST(request) {
  try {
    const { fullName, username, email, password } = await request.json();

    // Validate required fields
    if (!fullName || !username || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email} OR username = ${username}
    `;

    if (existingUser.length > 0) {
      const existingEmail = existingUser.find(user => user.email === email);
      const existingUsername = existingUser.find(user => user.username === username);
      
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
    const result = await sql`
      INSERT INTO users (full_name, username, email, password_hash) 
      VALUES (${fullName}, ${username}, ${email}, ${passwordHash})
      RETURNING id, full_name, username, email, role, created_at
    `;

    const user = result[0];

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
  }
}