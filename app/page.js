"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import DoctorCard from "@/components/DoctorCard";

export default function HomePage() {
  const [specialization, setSpecialization] = useState("");
  const [mode, setMode] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/doctors?specialization=${specialization}&mode=${mode}`)
      .then(res => res.json())
      .then(data => {
        setDoctors(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [specialization, mode]);

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-green-800 mb-2">Find Ayurvedic Doctors</h1>
        <p className="text-gray-600">Connect with experienced Ayurvedic practitioners for holistic healing</p>
      </div>

      <div className="bg-green-50 p-6 rounded-lg shadow-sm mb-8">
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <select 
            value={specialization} 
            onChange={(e) => setSpecialization(e.target.value)}
            className="p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">All Specializations</option>
            <option value="Panchakarma">Panchakarma</option>
            <option value="Nutrition">Nutrition</option>
            <option value="Herbal Medicine">Herbal Medicine</option>
          </select>

          <select 
            value={mode} 
            onChange={(e) => setMode(e.target.value)}
            className="p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">All Modes</option>
            <option value="online">Online</option>
            <option value="in-person">In-Person</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading doctors...</p>
        </div>
      ) : doctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-600">No doctors found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
