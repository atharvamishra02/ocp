import { connectDB } from "@/lib/db";
import Appointment from "@/models/Appointment";

export async function POST(req) {
  try {
    const body = await req.json();
    await connectDB();

    const newAppointment = new Appointment(body);
    await newAppointment.save();

    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}
