import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeTerms: false,
    subscribeNewsletter: false
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'Nama depan wajib diisi';
    if (!formData.lastName.trim()) newErrors.lastName = 'Nama belakang wajib diisi';
    if (!formData.email.trim()) newErrors.email = 'Email wajib diisi';
    if (!formData.password) newErrors.password = 'Password wajib diisi';
    if (formData.password.length < 8) newErrors.password = 'Password minimal 8 karakter';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password tidak sesuai';
    }
    if (!formData.agreeTerms) newErrors.agreeTerms = 'Anda harus menyetujui syarat dan ketentuan';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle registration logic here
      console.log('Registration attempt:', formData);
    }
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="max-w-2xl mx-auto">
          <div className="tv-card">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Bergabung dengan AkuRajaCrypto</h1>
              <p className="text-tv-text-secondary">Buat akun dan mulai journey trading crypto Anda</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-tv-text font-medium mb-2">
                    Nama Depan *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`tv-input w-full ${errors.firstName ? 'border-tv-red' : ''}`}
                    placeholder="Masukkan nama depan"
                  />
                  {errors.firstName && <p className="text-tv-red text-sm mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-tv-text font-medium mb-2">
                    Nama Belakang *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`tv-input w-full ${errors.lastName ? 'border-tv-red' : ''}`}
                    placeholder="Masukkan nama belakang"
                  />
                  {errors.lastName && <p className="text-tv-red text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-tv-text font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`tv-input w-full ${errors.email ? 'border-tv-red' : ''}`}
                  placeholder="Masukkan email Anda"
                />
                {errors.email && <p className="text-tv-red text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-tv-text font-medium mb-2">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="tv-input w-full"
                  placeholder="Masukkan nomor telepon (opsional)"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="password" className="block text-tv-text font-medium mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`tv-input w-full ${errors.password ? 'border-tv-red' : ''}`}
                    placeholder="Minimal 8 karakter"
                  />
                  {errors.password && <p className="text-tv-red text-sm mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-tv-text font-medium mb-2">
                    Konfirmasi Password *
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`tv-input w-full ${errors.confirmPassword ? 'border-tv-red' : ''}`}
                    placeholder="Ulangi password"
                  />
                  {errors.confirmPassword && <p className="text-tv-red text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="mt-1 mr-3"
                  />
                  <span className="text-tv-text-secondary text-sm">
                    Saya menyetujui{' '}
                    <Link to="/terms" className="text-tv-blue hover:underline">Syarat dan Ketentuan</Link>
                    {' '}serta{' '}
                    <Link to="/privacy" className="text-tv-blue hover:underline">Kebijakan Privasi</Link>
                    {' '}AkuRajaCrypto *
                  </span>
                </label>
                {errors.agreeTerms && <p className="text-tv-red text-sm">{errors.agreeTerms}</p>}

                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="subscribeNewsletter"
                    checked={formData.subscribeNewsletter}
                    onChange={handleChange}
                    className="mt-1 mr-3"
                  />
                  <span className="text-tv-text-secondary text-sm">
                    Saya ingin menerima newsletter dan update terbaru seputar crypto dan trading
                  </span>
                </label>
              </div>

              <button type="submit" className="w-full tv-button-primary py-3">
                Buat Akun
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-tv-text-secondary">
                Sudah punya akun?{' '}
                <Link to="/login" className="text-tv-blue hover:underline">
                  Masuk di sini
                </Link>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-tv-border">
              <div className="text-center mb-4">
                <span className="text-tv-text-secondary text-sm">Atau daftar dengan</span>
              </div>
              <button className="w-full bg-white text-gray-900 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
