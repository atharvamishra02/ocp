"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function BookAppointmentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const slot = searchParams.get("slot");
  const doctor = searchParams.get("doctor");
  const [confirmed, setConfirmed] = useState(false);
  const [appointmentId, setAppointmentId] = useState("");

  const handleConfirm = async () => {
    // You can call API to confirm appointment and get ID
    const res = await fetch("/api/confirm-appointment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ doctor, slot }),
    });
    const data = await res.json();

    setAppointmentId(data.id || Math.floor(Math.random() * 100000));
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-green-700 mb-4">Appointment Confirmed!</h1>
        <p className="text-lg">Your ID: <span className="font-bold">{appointmentId}</span></p>
        <p className="text-lg">Time: <span className="font-bold">{slot}</span></p>
      </div>
    );
  }

  return (
    <div className="p-6 text-center">
      <h1 className="text-xl font-bold mb-4">Confirm Your Appointment</h1>
      <p className="mb-2">Doctor ID: {doctor}</p>
      <p className="mb-4">Slot: {slot}</p>
      <button
        onClick={handleConfirm}
        className="bg-green-600 text-white py-2 px-6 rounded font-bold hover:bg-green-700 transition"
      >
        Confirm Appointment
      </button>
    </div>
  );
}
