import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// TODO: Import Firebase auth functions, Firestore functions, and navigation hooks

const RegisterPage: React.FC = () => {
  const [namaLengkap, setNamaLengkap] = useState('');
  const [pangkat, setPangkat] = useState('');
  const [nrp, setNrp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [konfirmasiPassword, setKonfirmasiPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!namaLengkap || !pangkat || !nrp || !email || !password || !konfirmasiPassword) {
      setError("Semua field harus diisi.");
      setLoading(false);
      return;
    }
    if (password !== konfirmasiPassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      setLoading(false);
      return;
    }

    // TODO: Implement Firebase registration logic
    // 1. Create user with email and password in Firebase Auth
    // 2. On success, save user details (nama, pangkat, nrp, email, is_admin: false, is_approved: false, registration_timestamp) to Firestore 'users' collection with UID as doc ID.
    // 3. Handle errors (email already in use, weak password, etc.)
    // 4. Display success message and optionally redirect or clear form.
    // 5. Consider triggering a Cloud Function for admin notification.

    console.log('Attempting registration with:', { namaLengkap, pangkat, nrp, email, password });
    // Placeholder for actual registration logic
    setTimeout(() => {
      setSuccess('Fungsi registrasi belum diimplementasikan. Anggap berhasil untuk UI testing.');
      // setError('Fungsi registrasi belum diimplementasikan.');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Sistem Informasi Administrasi dan Pengarsipan
        </h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="namaLengkap" className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="namaLengkap"
              value={namaLengkap}
              onChange={(e) => setNamaLengkap(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="pangkat" className="block text-sm font-medium text-gray-700 mb-1">
              Pangkat
            </label>
            <input
              type="text"
              id="pangkat"
              value={pangkat}
              onChange={(e) => setPangkat(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="nrp" className="block text-sm font-medium text-gray-700 mb-1">
              NRP
            </label>
            <input
              type="text"
              id="nrp"
              value={nrp}
              onChange={(e) => setNrp(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="konfirmasiPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Konfirmasi Password
            </label>
            <input
              type="password"
              id="konfirmasiPassword"
              value={konfirmasiPassword}
              onChange={(e) => setKonfirmasiPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md text-sm">
              {success}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
            >
              {loading ? 'Memproses...' : 'Daftar'}
            </button>
          </div>
        </form>
        <p className="mt-8 text-center text-sm text-gray-600">
          Sudah punya akun?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
