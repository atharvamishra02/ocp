import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Appointment from "@/app/models/Appointment";

export async function POST(req) {
  try {
    const body = await req.json();
    await connectDB();

    const newAppt = await Appointment.create({
      doctor: body.doctor,
      slot: body.slot,
      status: "confirmed",
    });

    return NextResponse.json({ id: newAppt._id });
  } catch (error) {
    return NextResponse.json({ error: "Failed to confirm" }, { status: 500 });
  }
}
