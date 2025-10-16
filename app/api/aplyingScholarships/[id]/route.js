import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    console.log(`🚀 GET /api/aplyingScholarships/${id} called`);

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { success: false, error: 'Invalid application ID' },
        { status: 400 }
      );
    }

    // NEW SYNTAX: Using tagged template literal
    const result = await sql`
      SELECT * FROM scholarship_submission_form 
      WHERE id = ${parseInt(id)}
    `;
    
    const data = result[0]; // Neon returns array directly

    if (!data) {
      return NextResponse.json(
        { success: false, error: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data
    });
  } catch (error) {
    console.error('💥 GET Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch application',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}