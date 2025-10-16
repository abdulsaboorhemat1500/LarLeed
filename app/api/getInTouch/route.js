import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {
    const data = await sql`
      SELECT * FROM get_in_touch 
      ORDER BY subscribed_at DESC
    `;
    
    return NextResponse.json({
      success: true,
      data: data,
      count: data.length
    });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch subscribers',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

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