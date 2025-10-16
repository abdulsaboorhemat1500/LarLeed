import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

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
    const existingEmail = await sql`
      SELECT id FROM get_in_touch WHERE email = ${email}
    `;

    if (existingEmail.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Email already subscribed' },
        { status: 409 }
      );
    }

    // Insert new email
    const result = await sql`
      INSERT INTO get_in_touch (email, subscribed_at) 
      VALUES (${email}, NOW()) 
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      message: 'Email subscribed successfully',
      data: result[0]
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}