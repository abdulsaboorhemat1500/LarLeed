import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

// GET all contact messages
export async function GET() {
  try {
    const result = await sql`
      SELECT * FROM contact_us 
      ORDER BY created_at DESC
    `;
    
    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contact messages' },
      { status: 500 }
    );
  }
}

// POST new contact message
export async function POST(request) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, email, subject, and message are required' },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO contact_us (name, email, phone, subject, message) 
      VALUES (${name}, ${email}, ${phone}, ${subject}, ${message}) 
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      data: result[0],
      message: 'Contact message submitted successfully'
    });

  } catch (error) {
    console.error('Error creating contact message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit contact message' },
      { status: 500 }
    );
  }
}