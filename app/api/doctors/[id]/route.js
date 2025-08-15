import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Doctor from '@/app/models/Doctor';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectDB();
    
    // Try to find the doctor by ID
    let doctor;
    try {
      doctor = await Doctor.findById(id);
    } catch (e) {
      // If error (likely invalid ID format), return mock data for testing
      doctor = null;
    }
    
    if (!doctor) {
      // Return mock data for the requested ID
      const mockDoctors = {
        '1': {
          _id: '1',
          name: 'Dr. Ayush Sharma',
          specialization: 'Ayurvedic Physician',
          mode: 'both',
          experience: 15,
          fees: 1200,
          rating: 4.8,
          reviewCount: 124,
          description: 'Dr. Ayush Sharma is an experienced Ayurvedic physician with expertise in treating chronic diseases using traditional Ayurvedic methods.',
          availability: {
            days: ['Monday', 'Wednesday', 'Friday'],
            hours: { start: '10:00', end: '18:00' }
          }
        },
        '2': {
          _id: '2',
          name: 'Dr. Meera Patel',
          specialization: 'Panchakarma Specialist',
          mode: 'in-person',
          experience: 10,
          fees: 1500,
          rating: 4.6,
          reviewCount: 98,
          description: 'Dr. Meera Patel specializes in Panchakarma therapies and has helped numerous patients with detoxification and rejuvenation treatments.',
          availability: {
            days: ['Tuesday', 'Thursday', 'Saturday'],
            hours: { start: '09:00', end: '17:00' }
          }
        },
        '3': {
          _id: '3',
          name: 'Dr. Rajesh Kumar',
          specialization: 'Ayurvedic Dermatology',
          mode: 'online',
          experience: 8,
          fees: 900,
          rating: 4.5,
          reviewCount: 76,
          description: 'Dr. Rajesh Kumar focuses on skin conditions and offers Ayurvedic solutions for various dermatological issues.',
          availability: {
            days: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
            hours: { start: '11:00', end: '19:00' }
          }
        }
      };
      
      if (mockDoctors[id]) {
        return NextResponse.json(mockDoctors[id]);
      } else {
        return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
      }
    }
    
    return NextResponse.json(doctor);
  } catch (error) {
    console.error('Error fetching doctor:', error);
    return NextResponse.json({ error: 'Failed to fetch doctor details' }, { status: 500 });
  }
}