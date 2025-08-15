'use client';
import React, { useState, useEffect } from 'react'; // Import React for React.use
import Image from 'next/image';
import SlotPicker from '@/components/SlotPicker';

export default function DoctorProfile({ params }) {
  // Unwrap params with React.use()
  const unwrappedParams = React.use(params);
  const id = unwrappedParams.id;

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/doctors/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch doctor details');
        return res.json();
      })
      .then((data) => {
        setDoctor(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Could not load doctor information. Please try again.');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto py-10 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent"></div>
        <p className="mt-2 text-gray-600">Loading doctor profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <div className="bg-red-50 p-4 rounded-md text-red-700">
          <p>{error}</p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!doctor) return null;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Doctor Info */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6">
                <div className="relative h-32 w-32 rounded-full overflow-hidden bg-green-100 mb-4 sm:mb-0 sm:mr-6">
                  <Image
                    src={doctor.imageUrl || '/globe.svg'}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    {doctor.name}
                  </h1>
                  <p className="text-green-700 font-medium text-lg">
                    {doctor.specialization}
                  </p>
                  <div className="mt-2 flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {doctor.mode === 'online'
                        ? 'Online Consultation'
                        : 'In-Person Consultation'}
                    </span>
                    {doctor.experience && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {doctor.experience} years experience
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  About
                </h2>
                <p className="text-gray-600">
                  {doctor.bio ||
                    'Dr. ' +
                      doctor.name +
                      ' is an experienced Ayurvedic practitioner specializing in ' +
                      doctor.specialization +
                      '. With a holistic approach to health and wellness, they provide personalized treatment plans to address the root cause of health issues.'}
                </p>
              </div>

              <div className="border-t border-gray-200 mt-6 pt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Specialties
                </h2>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {doctor.specialization}
                  </span>
                  {doctor.specialization === 'Panchakarma' && (
                    <>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Detoxification
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Rejuvenation
                      </span>
                    </>
                  )}
                  {doctor.specialization === 'Nutrition' && (
                    <>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Diet Planning
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Lifestyle Counseling
                      </span>
                    </>
                  )}
                  {doctor.specialization === 'Herbal Medicine' && (
                    <>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Formulations
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Therapeutic Applications
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 mt-6 pt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Consultation Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-medium text-gray-800 mb-2">
                      Consultation Fee
                    </h3>
                    <p className="text-green-700 font-bold text-lg">
                      ₹{doctor.fee || '800'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-medium text-gray-800 mb-2">Duration</h3>
                    <p className="text-gray-700">
                      {doctor.duration || '30'} minutes
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-medium text-gray-800 mb-2">Languages</h3>
                    <p className="text-gray-700">
                      {doctor.languages || 'English, Hindi'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-medium text-gray-800 mb-2">
                      Availability
                    </h3>
                    <p className="text-gray-700">
                      {doctor.availability
                        ? typeof doctor.availability === 'object'
                          ? `${doctor.availability.days}, ${doctor.availability.hours}`
                          : doctor.availability
                        : 'Mon-Sat, 10:00 AM - 7:00 PM'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="md:col-span-1">
          <SlotPicker doctorId={id} />
        </div>
      </div>
    </div>
  );
}