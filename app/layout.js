import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Amrutam Ayurvedic Platform',
  description: 'Find and book appointments with experienced Ayurvedic doctors for holistic healing',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <footer className="bg-white border-t border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center">
                  <img src="/globe.svg" alt="Amrutam" className="h-8 w-8" />
                  <span className="ml-2 text-xl font-bold text-green-700">Amrutam</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Holistic Ayurvedic Healthcare</p>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-500 hover:text-green-700">
                  About Us
                </a>
                <a href="#" className="text-gray-500 hover:text-green-700">
                  Contact
                </a>
                <a href="#" className="text-gray-500 hover:text-green-700">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-500 hover:text-green-700">
                  Terms of Service
                </a>
              </div>
            </div>
            <div className="mt-4 text-center text-sm text-gray-500">
              © {new Date().getFullYear()} Amrutam. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
