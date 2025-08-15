import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Doctor from '@/app/models/Doctor';

// GET: Fetch doctors (all or filtered)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const specialization = searchParams.get('specialization');
    const mode = searchParams.get('mode');

    await connectDB();

    const query = {};
    if (specialization) query.specialization = specialization;
    if (mode) query.mode = mode;

    const doctors = await Doctor.find(query);
    return NextResponse.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  }
}

// POST: Add a new doctor
export async function POST(request) {
  try {
    const body = await request.json();
    await connectDB();

    // Create and save new doctor
    const newDoctor = await Doctor.create(body);

    return NextResponse.json(newDoctor, { status: 201 });
  } catch (error) {
    console.error('Error adding doctor:', error);
    return NextResponse.json({ error: 'Failed to add doctor' }, { status: 500 });
  }
}
