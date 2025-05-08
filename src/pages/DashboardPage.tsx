import React from 'react';
import { Link } from 'react-router-dom'; // For the "Tambah Dokumen Baru" button link
import Navbar from '../components/Navbar'; // Import the Navbar

// Placeholder components for content sections
const DokumenBulanIni: React.FC = () => {
  // TODO: Fetch actual count from Firestore
  const count = 0; // Placeholder
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Dokumen Bulan Ini</h2>
      <p className="text-3xl font-bold text-indigo-600">{count}</p>
    </div>
  );
};

const StatistikUploadBulanan: React.FC = () => {
  // TODO: Fetch data and implement chart (e.g., using Chart.js)
  return (
    <div className="bg-white shadow rounded-lg p-6 mt-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Statistik Upload Bulanan (12 Bulan Terakhir)</h2>
      <div className="text-center text-gray-500">
        {/* Placeholder for chart */}
        Grafik akan ditampilkan di sini.
      </div>
    </div>
  );
};


const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Dashboard Header / Quick Actions */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard Utama</h1>
            <Link
              to="/add" // Link to Add Document page
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Tambah Dokumen Baru
            </Link>
          </div>

          {/* Dashboard Content Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Card: Dokumen Bulan Ini */}
            <div className="md:col-span-1">
              <DokumenBulanIni />
            </div>

            {/* Section: Statistik Upload Bulanan */}
            <div className="md:col-span-2">
              <StatistikUploadBulanan />
            </div>

            {/* Add more dashboard widgets here if needed */}

          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
