import React from 'react';
import { Link } from 'react-router-dom';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Free',
      price: 'Rp 0',
      period: '/selamanya',
      description: 'Mulai belajar analisis crypto dengan fitur dasar',
      features: [
        'Prediksi 24h (3 koin)',
        'Top 5 market data (view only)',
        'Sentiment harian',
        'Indikator dasar: SMA, RSI, MACD',
        'Dashboard web',
        'Email support basic'
      ],
      limitations: [
        'Tanpa prediksi 7 hari',
        'Tanpa alert real-time',
        'Maks 3 koin dipilih'
      ],
      recommended: false,
      buttonText: 'Mulai Gratis',
      buttonLink: '/register?plan=free'
    },
    {
      name: 'Premium',
      price: 'Rp 150.000',
      period: '/bulan (~$10)',
      description: 'Akses penuh prediksi & alert real-time',
      features: [
        'Semua 5 koin (BTC, ETH, BNB, ADA, DOGE)',
        'Prediksi 24h & 7d',
        'Sentiment real-time',
        'Alert harga Telegram',
        'Tracking akurasi historis',
        'Indikator lanjutan dasar',
        'Prioritas update fitur'
      ],
      limitations: [],
      recommended: true,
      buttonText: 'Upgrade Premium',
      buttonLink: '/register?plan=premium'
    },
    {
      name: 'Developer API',
      price: 'Rp 375.000',
      period: '/bulan (~$25)',
      description: 'Akses API untuk integrasi aplikasi',
      features: [
        'Semua fitur Premium',
        '1000 API calls / bulan',
        'Dokumentasi lengkap',
        'Support teknis',
        'Sandbox environment'
      ],
      limitations: [
        'Rate limit 60 req / menit'
      ],
      recommended: false,
      buttonText: 'Mulai Integrasi',
      buttonLink: '/register?plan=developer'
    },
    {
      name: 'Business API',
      price: 'Rp 1.500.000',
      period: '/bulan (~$100)',
      description: 'Skala bisnis dengan dukungan prioritas',
      features: [
        'Unlimited API calls (Fair Use)',
        'Custom indikator',
        'White-label opsi',
        'Prioritas support & SLA',
        'Konsultasi onboarding'
      ],
      limitations: [],
      recommended: false,
      buttonText: 'Hubungi Kami',
      buttonLink: '/kontak?plan=business'
    }
  ];

  return (
    <div className="page-container">
      <div className="content-wrapper">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="section-title">Paket CryptoPredict ID</h1>
          <p className="text-tv-text-secondary text-lg max-w-3xl mx-auto">
            Model freemium fokus nilai nyata: mulai gratis dengan prediksi 24h & sentiment harian, upgrade untuk 7 hari & alert real-time.
          </p>
        </div>

        {/* Pricing Cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div key={index} className={`tv-card relative ${plan.recommended ? 'ring-2 ring-tv-blue' : ''}`}>
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-tv-blue text-white px-4 py-2 rounded-full text-sm font-medium">
                    Paling Populer
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-tv-text mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-tv-text-secondary">{plan.period}</span>
                </div>
                <p className="text-tv-text-secondary text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-tv-text mb-3">Fitur Utama:</h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-tv-text-secondary text-sm">
                      <svg className="w-4 h-4 text-tv-green mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {plan.limitations.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-tv-text mb-3">Keterbatasan:</h4>
                  <ul className="space-y-2">
                    {plan.limitations.map((limitation, i) => (
                      <li key={i} className="flex items-center text-tv-text-secondary text-sm">
                        <svg className="w-4 h-4 text-tv-red mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                        </svg>
                        {limitation}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Link 
                to={plan.buttonLink}
                className={`block w-full text-center py-3 px-4 rounded-md font-medium transition-all duration-200 ${
                  plan.recommended 
                    ? 'tv-button-primary' 
                    : 'tv-button-secondary'
                }`}
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="tv-card mb-12">
          <h2 className="subsection-title text-center mb-8">Pertanyaan Umum tentang Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-tv-text mb-2">Apakah ada trial gratis?</h3>
              <p className="text-tv-text-secondary text-sm mb-4">
                Ya, paket Basic kami gratis selamanya. Untuk paket Pro, Anda bisa trial 7 hari gratis.
              </p>
              
              <h3 className="font-semibold text-tv-text mb-2">Bisakah upgrade/downgrade kapan saja?</h3>
              <p className="text-tv-text-secondary text-sm mb-4">
                Tentu saja! Anda bisa upgrade atau downgrade paket kapan saja melalui dashboard Anda.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-tv-text mb-2">Metode pembayaran apa saja?</h3>
              <p className="text-tv-text-secondary text-sm mb-4">
                Kami menerima transfer bank, e-wallet, kartu kredit, dan pembayaran crypto.
              </p>
              
              <h3 className="font-semibold text-tv-text mb-2">Apakah ada diskon untuk annual plan?</h3>
              <p className="text-tv-text-secondary text-sm">
                Ya! Dapatkan diskon 20% untuk pembayaran tahunan. Hubungi sales kami untuk detailnya.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="tv-card text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Masih Ada Pertanyaan?
          </h2>
          <p className="text-tv-text-secondary mb-6">
            Tim sales kami siap membantu Anda memilih paket yang tepat sesuai kebutuhan trading Anda.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/kontak" className="tv-button-primary">
              Hubungi Sales
            </Link>
            <Link to="/faq" className="tv-button-secondary">
              Lihat FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
