import { NextResponse } from 'next/server';
import pool from '@/lib/database';

export async function POST(request) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingEmail = await pool.query(
      'SELECT id FROM get_in_touch WHERE email = $1',
      [email]
    );

    if (existingEmail.rows.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Email already subscribed' },
        { status: 409 }
      );
    }

    // Insert new email
    const result = await pool.query(
      'INSERT INTO get_in_touch (email, subscribed_at) VALUES ($1, NOW()) RETURNING *',
      [email]
    );

    return NextResponse.json({
      success: true,
      message: 'Email subscribed successfully',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}