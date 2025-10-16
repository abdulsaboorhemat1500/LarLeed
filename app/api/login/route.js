// app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool from '@/lib/database';

export async function POST(request) {
  let client;
  try {
    const { email, password } = await request.json();
    console.log('Login attempt for:', email);

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email and password are required',
          field: 'email'
        },
        { status: 400 }
      );
    }

    client = await pool.connect();
    console.log('Database connected');

    // Find user by email
    const result = await client.query(
      'SELECT * FROM users WHERE email = $1 AND is_active = true',
      [email.toLowerCase().trim()]
    );

    if (result.rows.length === 0) {
      console.log('No user found with email:', email);
      return NextResponse.json(
        { 
          success: false, 
          error: 'No account found with this email',
          field: 'email'
        },
        { status: 401 }
      );
    }

    const user = result.rows[0];
    console.log('User found:', user.email);

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    
    if (!isPasswordValid) {
      console.log('Invalid password for user:', user.email);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Incorrect password',
          field: 'password'
        },
        { status: 401 }
      );
    }

    console.log('Login successful for:', user.email);

    // Prepare response data
    const responseData = {
      success: true,
      data: {
        id: user.id,
        fullName: user.full_name,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.created_at
      },
      message: 'Login successful'
    };

    // Create response with session data
    const response = NextResponse.json(responseData);

    // Optional: Set HTTP-only cookie for more secure session
    // response.cookies.set('user_session', user.id.toString(), {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: 'strict',
    //   maxAge: 60 * 60 * 24 * 7 // 1 week
    // });

    return response;

  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to login',
        details: error.message 
      },
      { status: 500 }
    );
  } finally {
    if (client) {
      console.log('Releasing database connection');
      client.release();
    }
  }
}