import Link from 'next/link';
import Image from 'next/image';

export default function DoctorCard({ doctor }) {
  // Default avatar if doctor doesn't have an image
  const avatarUrl = doctor.imageUrl || '/globe.svg';
  
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100 transition-all hover:shadow-lg">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="relative h-16 w-16 rounded-full overflow-hidden bg-green-100 mr-4">
            <Image 
              src={avatarUrl}
              alt={doctor.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{doctor.name}</h2>
            <p className="text-green-700 font-medium">{doctor.specialization}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center text-gray-600 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{doctor.mode === 'online' ? 'Online Consultation' : 'In-Person Consultation'}</span>
          </div>
          
          {doctor.experience && (
            <div className="flex items-center text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{doctor.experience} years of experience</span>
            </div>
          )}
        </div>
        
        <Link
          href={`/doctor/${doctor._id}`}
          className="block w-full text-center py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded transition-colors"
        >
          View Profile & Book
        </Link>
      </div>
    </div>
  );
}
