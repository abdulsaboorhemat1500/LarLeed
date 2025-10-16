import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {
    // NEW SYNTAX: Using tagged template literal
    const data = await sql`
      SELECT * FROM scholarship_submission_form 
      ORDER BY id DESC
    `;
    
    return NextResponse.json({
      success: true,
      data: data,
      count: data.length
    });
  } catch (error) {
    console.error('💥 GET All Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch applications',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
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

    // NEW SYNTAX: Using tagged template literal with RETURNING
    const result = await sql`
      INSERT INTO scholarship_submission_form (
        full_name, email, address, phone, date_of_birth, uni_name, 
        level_of_study, graduation_year, major, gpa, sch_name, 
        sch_country, sch_university, sch_level, sch_deadline
      ) VALUES (
        ${full_name}, ${email}, ${address}, ${phone}, ${date_of_birth}, ${uni_name},
        ${level_of_study}, ${graduation_year}, ${major}, ${gpa}, ${sch_name},
        ${sch_country}, ${sch_university}, ${sch_level}, ${sch_deadline}
      ) 
      RETURNING *
    `;

    const newApplication = result[0];
    
    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully!',
      data: newApplication
    });

  } catch (error) {
    console.error('💥 POST Error:', error);
    console.error('💥 Error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    
    // Handle duplicate email error (PostgreSQL error code)
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