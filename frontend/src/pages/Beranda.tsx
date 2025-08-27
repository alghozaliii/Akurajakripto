import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import TradingViewWidget from '../components/charts/TradingViewWidget';
import SentimentChart from '../components/charts/SentimentChart';
import { usePlan } from '../context/PlanContext';
import { useMarketData } from '../hooks/useMarketData';

const Beranda: React.FC = () => {
  const { plan } = usePlan();

  const { prices, global, loading, error } = useMarketData(60000);
  const coins = prices;
  const mockPredict = (base: number, change24h: number) => ({
    next24h: base * (1 + (change24h/100)), // simple projection using 24h change
    pct: change24h
  });

  return (
    <div className="landing-root relative overflow-hidden">
      {/* Decorative Background */}
      <div className="hero-gradient"></div>
      <div className="hero-noise"></div>

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-spectrum" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-badge">MVP • Fokus 5 Koin</div>
          <h1 className="hero-title-split">
            <span>Lihat Lebih Dulu</span>
            <span className="alt">Baru Eksekusi</span>
          </h1>
          <p className="hero-subtitle">
            Platform prediksi harga & sentiment crypto terfokus untuk pasar Indonesia. Insight jelas, noise berkurang.
          </p>
          <div className="hero-cta">
            <Link to="/dashboard" className="btn-primary-lg">Buka Dashboard</Link>
            <Link to="/pricing" className="btn-outline-lg">Lihat Paket</Link>
          </div>
          <p className="hero-plan-note">Paket: <span className="capitalize font-semibold text-white">{plan}</span> • <Link className="underline text-tv-yellow" to="/pricing">Upgrade &gt;</Link></p>
          <div className="hero-stats-grid mt-10">
            {[
              { l:'Prediksi 24h', v:'5 Koin' },
              { l:'Akurasi Target', v:'≥70%' },
              { l:'Update Data', v:'15 Menit' },
              { l:'Alert', v:'Telegram' }
            ].map(box => (
              <div className="stat-box" key={box.l}>
                <span className="stat-label">{box.l}</span>
                <span className="stat-value">{box.v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mini Predictions & Sentiment */}
      <section className="content-wrapper mt-0 -mt-10 relative z-10">
        <div className="grid gap-6 lg:grid-cols-3 mb-12">
          <div className="lg:col-span-2 tv-card p-6 backdrop-blur">
            <div className="flex items-center justify-between mb-3">
              <h2 className="section-subtitle">Pergerakan 24h (Live)</h2>
              {global && (
                <span className="text-[10px] text-gray-500">Update: {new Date(global.lastUpdated).toLocaleTimeString()}</span>
              )}
            </div>
            {error && <div className="text-tv-red text-xs mb-2">Gagal memuat data: {error}</div>}
            <div className="grid sm:grid-cols-3 md:grid-cols-5 gap-4 min-h-[120px]">
              {loading && coins.length === 0 && (
                <div className="col-span-full text-center text-xs text-gray-500">Memuat data harga...</div>
              )}
              {coins.map(c => {
                const p = mockPredict(c.price, c.change24h);
                const dir = p.pct >= 0;
                return (
                  <div key={c.symbol} className="mini-coin-card">
                    <div className="flex items-center justify-between mb-1">
                      <span className="coin-symbol">{c.symbol}</span>
                      <span className={`change-badge ${dir ? 'up' : 'down'}`}>{dir ? '+' : ''}{p.pct.toFixed(2)}%</span>
                    </div>
                    <div className="price-line">${c.price.toLocaleString()}</div>
                    <div className="base-line">Proj 24h: ${p.next24h.toLocaleString(undefined,{maximumFractionDigits: c.price < 10 ? 4 : 2})}</div>
                  </div>
                );
              })}
            </div>
            <p className="disclaimer-inline">Proyeksi sederhana = harga sekarang * (1 + change24h). Model ML akan menggantikan ini.</p>
          </div>
          <div className="tv-card p-6 flex flex-col justify-between">
            <h2 className="section-subtitle mb-4">Sentiment Sosial</h2>
            <SentimentChart score={0.15} frequency={plan === 'free' ? 'daily' : 'realtime'} />
            <p className="text-[11px] text-tv-text-secondary mt-3 leading-snug">Sumber: Twitter & Reddit (agregasi bahasa Indonesia + English). Free = daily snapshot, Premium = real-time.</p>
          </div>
        </div>

        {/* Global Market Snapshot */}
        {global && (
          <div className="grid md:grid-cols-4 gap-4 mb-14">
            <div className="stat-box !bg-[#1e2635]">
              <span className="stat-label">Market Cap</span>
              <span className="stat-value">${(global.marketCap/1e12).toFixed(2)}T</span>
              <span className={`text-[10px] ${global.marketCapChangePct>=0?'text-tv-green':'text-tv-red'}`}>{global.marketCapChangePct>=0?'+':''}{global.marketCapChangePct.toFixed(2)}%</span>
            </div>
            <div className="stat-box !bg-[#1e2635]">
              <span className="stat-label">24h Volume</span>
              <span className="stat-value">${(global.volume24h/1e9).toFixed(1)}B</span>
            </div>
            <div className="stat-box !bg-[#1e2635]">
              <span className="stat-label">BTC Dominance</span>
              <span className="stat-value">{global.btcDominance.toFixed(1)}%</span>
            </div>
            <div className="stat-box !bg-[#1e2635] flex flex-col justify-between">
              <span className="stat-label">Sesi</span>
              <span className="stat-value">{new Date().toLocaleTimeString()}</span>
              <Link to="/dashboard" className="mt-2 text-[10px] underline text-tv-yellow">Detail &gt;</Link>
            </div>
          </div>
        )}

        {/* Value Props */}
        <div className="mb-16">
          <h2 className="section-title text-center mb-10">Kenapa CryptoPredict ID?</h2>
          <div className="value-grid">
            {[
              { title: 'Prediksi Fokus', desc: 'Hanya 5 koin utama (BTC, ETH, BNB, ADA, DOGE) untuk kualitas model lebih stabil.' },
              { title: 'Sentiment Lokal', desc: 'Analisa khusus percakapan crypto Indonesia + sumber global relevan.' },
              { title: 'Indikator Dasar Efektif', desc: 'SMA, RSI, MACD yang paling sering dipakai trader ritel.' },
              { title: 'Alert Telegram', desc: 'Notifikasi pergerakan harga signifikan (Premium).' },
              { title: 'Akurasi Terukur', desc: 'Target ≥70% directional accuracy dengan retraining berkala.' },
              { title: 'Freemium Fair', desc: 'Prediksi 24h gratis, 7d & real-time sentiment di Premium.' },
            ].map((v, i) => (
              <div key={v.title} className="vp-card" style={{animationDelay: `${i*60}ms`}}>
                <div className="vp-icon"/>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Teaser (simplified) */}
        <div className="tv-card mb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Mulai Gratis Sekarang</h2>
            <p className="text-tv-text-secondary text-sm max-w-lg">Akses prediksi 24h & sentiment dasar tanpa kartu kredit. Upgrade kapan saja untuk 7 hari & alert.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Link to="/register?plan=free" className="btn-outline-lg flex-1 md:flex-none">Coba</Link>
            <Link to="/pricing" className="btn-primary-lg flex-1 md:flex-none">Upgrade</Link>
          </div>
        </div>

  {/* FAQ removed to streamline landing (bisa pindah ke /faq) */}

        {/* Final CTA */}
        <div className="final-cta text-center">
          <h2>Bergabung & Rasakan Insight yang Relevan</h2>
          <p>Optimalkan keputusan trading berbasis data & sentiment lokal.</p>
          <div className="flex justify-center gap-4 mt-6">
            <Link to="/register" className="btn-primary-lg">Daftar Gratis</Link>
            <Link to="/dashboard" className="btn-outline-lg">Lihat Demo</Link>
          </div>
          <p className="text-[11px] mt-6 text-tv-text-secondary">Bukan nasihat investasi. Lakukan riset sendiri sebelum mengambil keputusan.</p>
        </div>
      </section>
    </div>
  );
};

export default Beranda;
