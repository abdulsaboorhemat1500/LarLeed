import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {
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
      ORDER BY created_at DESC
    `;

    return NextResponse.json({
      success: true,
      data: result,
      total: result.length
    });

  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch users',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { fullName, username, email, password, role } = await request.json();

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
    const bcrypt = await import('bcryptjs');
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Insert new user
    const result = await sql`
      INSERT INTO users (full_name, username, email, password_hash, role) 
      VALUES (${fullName}, ${username}, ${email}, ${passwordHash}, ${role || 'user'})
      RETURNING id, full_name, username, email, role, is_active, created_at
    `;

    const user = result[0];

    return NextResponse.json({
      success: true,
      data: user,
      message: 'User created successfully'
    });

  } catch (error) {
    console.error('Create user error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create user',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}