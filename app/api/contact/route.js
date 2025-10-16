import { NextResponse } from 'next/server';
import pool from '@/lib/database';

// GET all contact messages
export async function GET() {
  let client;
  try {
    client = await pool.connect();
    
    // Create table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS contact_us (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        subject VARCHAR(500) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const result = await client.query(`
      SELECT * FROM contact_us 
      ORDER BY created_at DESC
    `);
    
    return NextResponse.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contact messages' },
      { status: 500 }
    );
  } finally {
    if (client) client.release();
  }
}

// POST new contact message
export async function POST(request) {
  let client;
  try {
    const { name, email, phone, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, email, subject, and message are required' },
        { status: 400 }
      );
    }

    client = await pool.connect();
    
    // Create table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS contact_us (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        subject VARCHAR(500) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const result = await client.query(
      `INSERT INTO contact_us (name, email, phone, subject, message) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, email, phone, subject, message]
    );

    return NextResponse.json({
      success: true,
      data: result.rows[0],
      message: 'Contact message submitted successfully'
    });

  } catch (error) {
    console.error('Error creating contact message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit contact message' },
      { status: 500 }
    );
  } finally {
    if (client) client.release();
  }
}