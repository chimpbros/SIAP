import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../firebase-config';

const Navbar: React.FC = () => {
  const { currentUser, isAdmin, nama, pangkat, nrp } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error("Error signing out: ", error);
      // Optionally show an error message to the user
    }
  };

  // Basic user display string
  const userDisplay = currentUser
    ? `${nama || 'Pengguna'} ${pangkat || ''} - ${nrp || ''} [${isAdmin ? 'Admin' : 'User'}]`
    : 'Loading...';

  return (
    <nav className="bg-indigo-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side: App Name */}
          <div className="flex-shrink-0">
            <Link to="/dashboard" className="font-bold text-xl">
              SIAP
            </Link>
            <span className="ml-2 text-sm hidden md:inline">Sistem Informasi Administrasi dan Pengarsipan</span>
          </div>

          {/* Center: Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/dashboard"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600"
              >
                Dashboard
              </Link>
              <Link
                to="/archive" // TODO: Create this page
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600"
              >
                Daftar Arsip
              </Link>
              <Link
                to="/add" // TODO: Create this page
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600"
              >
                Tambah Dokumen Baru
              </Link>
              {isAdmin && (
                <Link
                  to="/admin" // TODO: Create this page
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600"
                >
                  Admin Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Right side: User Info and Logout */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <span className="text-sm mr-4">{userDisplay}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Mobile menu button (optional, can be added later) */}
          {/* <div className="-mr-2 flex md:hidden"> ... </div> */}
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state (optional) */}
      {/* <div className="md:hidden"> ... </div> */}
    </nav>
  );
};

export default Navbar;
