import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

interface PlanDef {
  name: string;
  monthly: number; // IDR per month
  description: string;
  features: string[];
  limitations?: string[];
  recommended?: boolean;
  buttonText: string;
  buttonLink: string;
  type: 'free' | 'premium' | 'dev' | 'biz';
  note?: string;
  annualBonus?: string;
}

const rawPlans: PlanDef[] = [
  {
    name: 'Free',
    monthly: 0,
    description: 'Belajar & eksplorasi dasar prediksi + sentiment',
    features: ['Prediksi 24h (3 koin)', 'Market data 5 koin', 'Sentiment harian', 'SMA • RSI • MACD', 'Dashboard web'],
    limitations: ['Tanpa 7d forecast', 'Tanpa alert real-time', 'Maks 3 koin'],
    buttonText: 'Mulai Gratis',
    buttonLink: '/register?plan=free',
    type: 'free'
  },
  {
    name: 'Premium',
    monthly: 150000,
    description: 'Prediksi penuh + sentiment real-time & alert',
    features: ['5 koin penuh', 'Prediksi 24h & 7d', 'Sentiment real-time', 'Alert Telegram', 'Tracking akurasi', 'Prioritas fitur'],
    buttonText: 'Upgrade Premium',
    buttonLink: '/register?plan=premium',
    type: 'premium',
    recommended: true,
    annualBonus: 'Diskon 20% tahunan'
  },
  {
    name: 'Developer API',
    monthly: 375000,
    description: 'Integrasi data ke aplikasi & bot Anda',
    features: ['Semua Premium', '1.000 API call / bln', 'Dokumentasi lengkap', 'Support teknis', 'Sandbox'],
    limitations: ['Rate limit 60 req / menit'],
    buttonText: 'Mulai Integrasi',
    buttonLink: '/register?plan=developer',
    type: 'dev'
  },
  {
    name: 'Business API',
    monthly: 1500000,
    description: 'Skala bisnis + dukungan prioritas & custom',
    features: ['Unlimited (Fair Use)', 'Custom indikator', 'White-label opsi', 'SLA & prioritas support', 'Onboarding konsultasi'],
    buttonText: 'Hubungi Kami',
    buttonLink: '/kontak?plan=business',
    type: 'biz',
    annualBonus: 'Custom kontrak'
  }
];

const formatIDR = (v:number) => v === 0 ? 'Rp 0' : 'Rp ' + v.toLocaleString('id-ID');

const Pricing: React.FC = () => {
  const [cycle, setCycle] = useState<'monthly'|'annual'>('monthly');
  const discount = 0.2; // 20% annual
  const plans = useMemo(()=> rawPlans.map(p => {
    const annualPrice = Math.round(p.monthly * 12 * (1-discount));
    return {
      ...p,
      displayPrice: cycle==='monthly'? formatIDR(p.monthly) : formatIDR(annualPrice),
      displayPeriod: cycle==='monthly'? '/bulan' : '/tahun',
      savings: cycle==='annual' && p.monthly>0 ? `Hemat ${(discount*100).toFixed(0)}%` : undefined
    };
  }),[cycle]);

  return (
    <div className="pricing-page">
      <div className="pricing-hero">
        <h1>Paket CryptoPredict ID</h1>
        <p>Mulai gratis. Upgrade saat butuh prediksi lebih panjang, sentiment real-time & API.</p>
        <div className="billing-toggle" role="radiogroup" aria-label="Siklus tagihan">
          <button onClick={()=>setCycle('monthly')} className={cycle==='monthly'? 'active':''} aria-pressed={cycle==='monthly'}>Bulanan</button>
          <button onClick={()=>setCycle('annual')} className={cycle==='annual'? 'active':''} aria-pressed={cycle==='annual'}>Tahunan <span className="save">-20%</span></button>
        </div>
        <span className="cycle-note">Harga ditampilkan dalam Rupiah • Pajak belum termasuk</span>
      </div>

      <div className="plan-grid">
        {plans.map(p => (
          <div className={`plan-card ${p.recommended? 'recommended':''}`} key={p.name}>
            {p.recommended && <div className="flag">Paling Populer</div>}
            <div className="plan-header">
              <h3>{p.name}</h3>
              <div className="price-line">
                <span className="price">{p.displayPrice}</span>
                <span className="period">{p.displayPeriod}</span>
              </div>
              {p.savings && <div className="savings-badge">{p.savings}</div>}
              <p className="desc">{p.description}</p>
            </div>
            <ul className="feature-list" aria-label="Fitur utama">
              {p.features.map(f => (
                <li key={f}><span className="ic ok"/> {f}</li>
              ))}
            </ul>
            {p.limitations && p.limitations.length>0 && (
              <ul className="limit-list" aria-label="Keterbatasan">
                {p.limitations.map(l => <li key={l}><span className="ic no"/> {l}</li>)}
              </ul>
            )}
            <Link to={p.buttonLink} className={`plan-cta ${p.recommended? 'primary':'ghost'}`}>{p.buttonText}</Link>
          </div>
        ))}
      </div>

      <div className="comparison-note">Butuh volume API lebih tinggi atau kebutuhan khusus? <Link to="/kontak" className="lnk">Hubungi kami</Link>.</div>

      <div className="faq-lite">
        <div className="faq-item">
          <h4>Apakah Free benar-benar gratis?</h4>
          <p>Ya. Tidak perlu kartu kredit. Anda bisa upgrade kapan saja.</p>
        </div>
        <div className="faq-item">
          <h4>Perbedaan utama Premium?</h4>
          <p>Prediksi 7 hari, sentiment real-time, alert Telegram, tracking akurasi.</p>
        </div>
        <div className="faq-item">
          <h4>Diskon tahunan?</h4>
          <p>20% untuk pembayaran upfront 12 bulan (Premium & Developer API).</p>
        </div>
        <div className="faq-item">
          <h4>Pembayaran diterima?</h4>
          <p>Transfer bank, e-wallet, kartu kredit, dan crypto populer.</p>
        </div>
      </div>

      <div className="pricing-cta">
        <h2>Siap Optimalkan Keputusan Trading?</h2>
        <p>Mulai gratis sekarang. Upgrade hanya jika Anda merasakan manfaat.</p>
        <div className="cta-actions">
          <Link to="/register?plan=free" className="cta-outline">Mulai Gratis</Link>
          <Link to="/pricing" className="cta-solid">Lihat Demo</Link>
        </div>
        <span className="disclaimer">Bukan nasihat investasi. Lakukan riset sendiri.</span>
      </div>
    </div>
  );
};

export default Pricing;
