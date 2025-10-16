import { NextResponse } from 'next/server';
import pool from '@/lib/database';

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM scholarship_submission_form ORDER BY id DESC");
    const data = result.rows;
    client.release();
    
    return NextResponse.json({
      success: true,
      data: data,
      count: data.length
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


export async function POST(request) {
  
  try {
    
    // Parse the request body
    const body = await request.json();

    const {
      full_name,
      email,
      address,
      phone,
      date_of_birth,
      uni_name,
      level_of_study,
      graduation_year,
      major,
      gpa,
      sch_name,
      sch_country,
      sch_university,
      sch_level,
      sch_deadline
    } = body;


    // Validate required fields
    if (!full_name || !email || !uni_name || !sch_name) {
      console.log('❌ Missing required fields');
      return NextResponse.json(
        { success: false, error: 'Full name, email, university, and scholarship name are required' },
        { status: 400 }
      );
    }

    await pool.query('SELECT 1');

    const result = await pool.query(
      `INSERT INTO scholarship_submission_form (
        full_name, email, address, phone, date_of_birth, uni_name, 
        level_of_study, graduation_year, major, gpa, sch_name, 
        sch_country, sch_university, sch_level, sch_deadline
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) 
      RETURNING *`,
      [
        full_name, email, address, phone, date_of_birth, uni_name,
        level_of_study, graduation_year, major, gpa, sch_name,
        sch_country, sch_university, sch_level, sch_deadline
      ]
    );

    
    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully!',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('💥 POST Error:', error);
    console.error('💥 Error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    
    // Handle duplicate email error
    if (error.code === '23505') {
      return NextResponse.json(
        { success: false, error: 'An application with this email already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to submit application',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}


