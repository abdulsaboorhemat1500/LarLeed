import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    console.log(`🔄 GET /api/scholarships/${id} called`);

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { success: false, error: 'Invalid scholarship ID' },
        { status: 400 }
      );
    }

    const result = await sql`
      SELECT 
        id,
        s_name,
        s_image as imageUrl,
        s_country,
        s_university,
        s_language,
        s_gender,
        s_study_level,
        s_app_deadline,
        s_duration,
        s_funding_type,
        s_overview,
        s_detailed_info,
        s_eligibility,
        s_app_procces,
        s_benefits,
        created_at
       FROM scholarships 
       WHERE id = ${parseInt(id)}
    `;
    
    const data = result[0];

    if (!data) {
      return NextResponse.json(
        { success: false, error: 'Scholarship not found' },
        { status: 404 }
      );
    }

    console.log('✅ Scholarship found:', data.id);
    
    return NextResponse.json({
      success: true,
      data: data
    });
  } catch (error) {
    console.error('❌ GET Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch scholarship',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}