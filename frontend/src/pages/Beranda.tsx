import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import TradingViewWidget from '../components/charts/TradingViewWidget';
import SentimentChart from '../components/charts/SentimentChart';
import { usePlan } from '../context/PlanContext';
import { useMarketData } from '../hooks/useMarketData';

const Beranda: React.FC = () => {
  const { plan } = usePlan();

  const { prices, global, loading, error, reload } = useMarketData(60000, 40);
  const coins = prices;
  const mockPredict = (base: number, change24h: number) => ({
    next24h: base * (1 + (change24h/100)), // placeholder projection
    pct: change24h
  });

  // Simulate realtime-ish sentiment fluctuation for premium users while backend not ready
  const [sentScore, setSentScore] = useState(0.12);
  useEffect(() => {
    if (plan === 'free') return; // free remains slower update
    const id = setInterval(() => {
      setSentScore(s => {
        const drift = (Math.random() - 0.5) * 0.06; // small random walk
        let next = s + drift;
        if (next > 0.9) next = 0.9; if (next < -0.9) next = -0.9;
        return parseFloat(next.toFixed(3));
      });
    }, 5000);
    return () => clearInterval(id);
  }, [plan]);

  // Accessibility: focus announcement for reload errors
  const errorRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => { if (error && errorRef.current) errorRef.current.focus(); }, [error]);

  const skeletonItems = Array.from({ length: 5 });

  const renderSpark = (history?: number[], change24h?: number) => {
    if (!history || history.length < 4) return null;
    const max = Math.max(...history);
    const min = Math.min(...history);
    const range = max - min || 1;
    const points = history.map((p, i) => {
      const x = (i / (history.length - 1)) * 100;
      const y = 100 - ((p - min) / range) * 100;
      return `${x},${y}`;
    }).join(' ');
    const up = (change24h ?? 0) >= 0;
    return (
      <svg className="spark" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <polyline fill="none" stroke={up ? '#22c55e' : '#ef4444'} strokeWidth={2} points={points} vectorEffect="non-scaling-stroke" />
      </svg>
    );
  };

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
            <div className="grid sm:grid-cols-3 md:grid-cols-5 gap-4 min-h-[130px]">
              {loading && coins.length === 0 && skeletonItems.map((_,i) => (
                <div key={i} className="mini-coin-card skeleton" aria-hidden="true">
                  <div className="sk-line w-8" />
                  <div className="sk-line w-14 mt-2" />
                  <div className="sk-line w-10 mt-3" />
                </div>
              ))}
              {coins.map(c => {
                const p = mockPredict(c.price, c.change24h);
                const dir = p.pct >= 0;
                const delta = c.delta || 0;
                const showDelta = c.prevPrice !== undefined && Math.abs(delta) > 0;
                return (
                  <div key={c.symbol} className="mini-coin-card">
                    <div className="flex items-center justify-between mb-1">
                      <span className="coin-symbol">{c.symbol}</span>
                      <span className={`change-badge ${dir ? 'up' : 'down'}`}>{dir ? '+' : ''}{p.pct.toFixed(2)}%</span>
                    </div>
                    <div className="price-line flex items-baseline gap-1">
                      <span>${c.price.toLocaleString()}</span>
                      {showDelta && <span className={`delta ${delta>0?'up':'down'}`}>{delta>0?'+':''}{delta.toFixed(c.price<10?4:2)}</span>}
                    </div>
                    <div className="spark-wrapper">{renderSpark(c.history, c.change24h)}</div>
                    <div className="base-line">Proj 24h: ${p.next24h.toLocaleString(undefined,{maximumFractionDigits: c.price < 10 ? 4 : 2})}</div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="disclaimer-inline">Proyeksi sementara = harga sekarang * (1 + change24h). Model ML segera hadir.</p>
              <div className="flex items-center gap-2">
                {error && <button onClick={reload} className="retry-btn">Retry</button>}
                <button onClick={reload} className="refresh-btn" aria-label="Refresh data" title="Refresh">↻</button>
              </div>
            </div>
          </div>
          <div className="tv-card p-6 flex flex-col justify-between">
            <h2 className="section-subtitle mb-4">Sentiment Sosial</h2>
            <SentimentChart score={plan==='free'?0.15:sentScore} frequency={plan === 'free' ? 'daily' : 'realtime'} history={plan==='free'?undefined:[sentScore-0.05,sentScore-0.02,sentScore]} />
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
        <section className="value-section" aria-labelledby="value-heading">
          <h2 id="value-heading" className="value-heading">Kenapa CryptoPredict ID?</h2>
          <p className="value-intro">Difokuskan agar cepat paham & relevan untuk keputusan trading harian. Fitur inti ditata ulang — jelas, ringan, tepat sasaran.</p>
          <div className="value-grid" role="list">
            {[
              { title: 'Prediksi Fokus', key:'focus', desc: 'Hanya 5 koin utama (BTC, ETH, BNB, ADA, DOGE) untuk stabilitas performa model awal.' },
              { title: 'Sentiment Lokal', key:'sentiment', desc: 'Mengutamakan konteks percakapan crypto Indonesia + agregasi global yang relevan.' },
              { title: 'Indikator Inti', key:'indicator', desc: 'SMA, RSI, MACD dasar — cukup untuk validasi arah tanpa kebisingan.' },
              { title: 'Alert Telegram', key:'alert', desc: 'Pergerakan ekstrem & trigger teknikal penting (Premium).' },
              { title: 'Akurasi Terukur', key:'accuracy', desc: 'Target awal ≥70% arah 24h — dilacak & ditampilkan transparan.' },
              { title: 'Freemium Fair', key:'freemium', desc: 'Gratis untuk 24h. 7d, alert & sentiment real-time saat upgrade.' },
            ].map((v, i) => (
              <div key={v.title} role="listitem" className="vp-card fx-card" style={{animationDelay: `${i*70}ms`}}>
                <div className="vp-icon-wrap" aria-hidden="true">
                  <span className="vp-icon-glow" />
                  <svg className={`anim-icon icon-${v.key}`} viewBox="0 0 48 48" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    {v.key==='focus' && <g stroke="url(#gradFocus)"><circle cx="24" cy="24" r="10" /><path d="M24 8v4M24 36v4M8 24h4M36 24h4" /></g>}
                    {v.key==='sentiment' && <g stroke="url(#gradSent)"><path d="M8 20c0-6 5-11 11-11 4 0 7 2 9 5 1-1 3-2 5-2 4 0 7 3 7 7 0 8-10 15-16 19-6-4-16-11-16-18Z" fill="url(#gradSentFill)" strokeWidth="1.8"/></g>}
                    {v.key==='indicator' && <g stroke="url(#gradInd)"><path d="M6 34l10-14 8 8 10-18 8 12" /><path d="M6 12h6" /><path d="M6 18h10" /></g>}
                    {v.key==='alert' && <g stroke="url(#gradAlert)"><path d="M24 10c-5.5 0-10 4.5-10 10v5.2c0 1.1-.4 2.2-1.2 3.1L11 30h26l-1.8-1.7c-.8-.9-1.2-2-1.2-3.1V20c0-5.5-4.5-10-10-10Z"/><path d="M21 34h6"/></g>}
                    {v.key==='accuracy' && <g stroke="url(#gradAcc)"><circle cx="24" cy="24" r="14" /><path d="M18 24l4 4 8-8" /></g>}
                    {v.key==='freemium' && <g stroke="url(#gradFree)"><rect x="10" y="14" width="28" height="20" rx="4"/><path d="M10 20h28" /><path d="M18 26h4" /><path d="M26 26h4" /></g>}
                    <defs>
                      <linearGradient id="gradFocus" x1="0" x2="48" y1="0" y2="48"><stop stopColor="#3b82f6"/><stop offset="1" stopColor="#8b5cf6"/></linearGradient>
                      <linearGradient id="gradSent" x1="0" x2="48" y1="0" y2="48"><stop stopColor="#2563eb"/><stop offset="1" stopColor="#22c55e"/></linearGradient>
                      <linearGradient id="gradSentFill" x1="0" x2="48" y1="0" y2="48"><stop stopColor="#2563eb" stopOpacity="0.25"/><stop offset="1" stopColor="#22c55e" stopOpacity="0.15"/></linearGradient>
                      <linearGradient id="gradInd" x1="0" x2="48" y1="0" y2="48"><stop stopColor="#38bdf8"/><stop offset="1" stopColor="#6366f1"/></linearGradient>
                      <linearGradient id="gradAlert" x1="0" x2="48" y1="0" y2="48"><stop stopColor="#f59e0b"/><stop offset="1" stopColor="#ef4444"/></linearGradient>
                      <linearGradient id="gradAcc" x1="0" x2="48" y1="0" y2="48"><stop stopColor="#10b981"/><stop offset="1" stopColor="#2563eb"/></linearGradient>
                      <linearGradient id="gradFree" x1="0" x2="48" y1="0" y2="48"><stop stopColor="#6366f1"/><stop offset="1" stopColor="#3b82f6"/></linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="vp-text">
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Teaser (refined) */}
        <div className="pricing-teaser">
          <div className="teaser-copy">
            <h2>Mulai Gratis Sekarang</h2>
            <p>Akses prediksi 24h & sentiment dasar tanpa kartu kredit. Saat butuh jangkauan 7 hari, alert cepat & sentiment real-time — upgrade dengan sekali klik.</p>
          </div>
          <div className="teaser-actions">
            <Link to="/register?plan=free" className="teaser-btn ghost" aria-label="Coba Gratis">Coba</Link>
            <Link to="/pricing" className="teaser-btn solid" aria-label="Lihat & Upgrade Paket">Upgrade</Link>
          </div>
        </div>

  {/* FAQ removed to streamline landing (bisa pindah ke /faq) */}

        {/* Final CTA (revamped) */}
        <div className="final-cta enhanced-cta" role="region" aria-labelledby="cta-heading">
          <div className="cta-bg-orb" aria-hidden="true" />
          <div className="cta-illustration" aria-hidden="true">
            <div className="orb orb-a" />
            <div className="orb orb-b" />
            <div className="orb orb-c" />
            <svg className="cta-line" viewBox="0 0 220 220"><circle cx="110" cy="110" r="92" stroke="#3b82f640" strokeWidth="1.5" strokeDasharray="4 6" fill="none"/><circle cx="110" cy="110" r="55" stroke="#6366f150" strokeWidth="1" strokeDasharray="3 5" fill="none"/></svg>
          </div>
          <div className="cta-content text-center">
            <h2 id="cta-heading">Bergabung & Rasakan Insight yang Relevan</h2>
            <p className="cta-sub">Optimalkan keputusan trading berbasis data real-time, sentiment lokal, dan indikator inti.</p>
            <div className="cta-trust" aria-label="Key advantages">
              <span className="trust-badge">Tanpa Kartu Kredit</span>
              <span className="trust-badge">Transparan Akurasi</span>
              <span className="trust-badge">Update 15 Menit</span>
            </div>
            <div className="cta-actions-main">
              <Link to="/register" className="cta-btn primary">Daftar Gratis</Link>
              <Link to="/dashboard" className="cta-btn outline">Lihat Demo</Link>
            </div>
            <div className="cta-social-proof" aria-label="Pengguna awal">
              <div className="avatar-stack" aria-hidden="true">
                <span className="av"/><span className="av"/><span className="av"/><span className="av more">+</span>
              </div>
              <span className="proof-text">Puluhan pengguna awal sudah mencoba versi MVP.</span>
            </div>
            <p className="cta-disclaimer">Bukan nasihat investasi. Lakukan riset sendiri sebelum mengambil keputusan.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Beranda;
