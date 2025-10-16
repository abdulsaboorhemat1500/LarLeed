import { NextResponse } from 'next/server';
import pool from '@/lib/database';

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM get_in_touch");
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