'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getMe } from '@/lib/auth';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    // Check if user is logged in
    getMe().then(userData => {
      if (!userData) {
        router.push('/login');
        return;
      }
      setUser(userData);
      
      // Fetch user's appointments
      fetch('/api/appointments')
        .then(res => res.json())
        .then(data => {
          setAppointments(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }).catch(() => {
      router.push('/login');
    });
  }, [router]);

  // Format date for display
  const formatAppointmentDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Format time for display
  const formatAppointmentTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter appointments based on active tab
  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    const today = new Date();
    
    if (activeTab === 'upcoming') {
      return appointmentDate >= today;
    } else {
      return appointmentDate < today;
    }
  });

  if (loading) {
    return (
      <div className="container mx-auto py-10 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent"></div>
        <p className="mt-2 text-gray-600">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">My Dashboard</h1>
          
          {user && (
            <div className="bg-green-50 p-4 rounded-md mb-6">
              <h2 className="text-lg font-medium text-green-800">Welcome, {user.name}!</h2>
              <p className="text-green-700">Manage your appointments and health journey here.</p>
            </div>
          )}

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'upcoming' 
                  ? 'border-green-500 text-green-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Upcoming Appointments
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'past' 
                  ? 'border-green-500 text-green-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Past Appointments
              </button>
            </nav>
          </div>

          {/* Appointments list */}
          {filteredAppointments.length > 0 ? (
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <div key={appointment._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">{appointment.doctorName}</h3>
                      <p className="text-sm text-gray-500">{appointment.specialization}</p>
                      <div className="mt-2">
                        <p className="text-gray-700">
                          <span className="font-medium">Date:</span> {formatAppointmentDate(appointment.date)}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Time:</span> {formatAppointmentTime(appointment.date)}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Mode:</span> {appointment.mode}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end justify-between">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${activeTab === 'upcoming' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {activeTab === 'upcoming' ? 'Upcoming' : 'Completed'}
                      </span>
                      
                      {activeTab === 'upcoming' && (
                        <div className="mt-4 flex space-x-2">
                          <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                            Reschedule
                          </button>
                          <button className="px-3 py-1 border border-red-300 text-red-600 text-sm rounded hover:bg-red-50">
                            Cancel
                          </button>
                        </div>
                      )}
                      
                      {activeTab === 'past' && (
                        <div className="mt-4">
                          <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                            Book Again
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No {activeTab} appointments</h3>
              <p className="mt-1 text-sm text-gray-500">
                {activeTab === 'upcoming' 
                  ? 'You don\'t have any upcoming appointments scheduled.' 
                  : 'You don\'t have any past appointment records.'}
              </p>
              {activeTab === 'upcoming' && (
                <div className="mt-6">
                  <button
                    onClick={() => router.push('/')}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Book an Appointment
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}