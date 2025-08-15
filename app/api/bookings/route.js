import Booking from '@/app/models/Booking';
import { connectDB } from '@/lib/db';

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const booking = await Booking.create(body);
  return Response.json(booking, { status: 201 });
}