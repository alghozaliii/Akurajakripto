import React, { useState, useMemo } from 'react';
import TradingViewWidget from '../components/charts/TradingViewWidget';
import CryptoWatchlist from '../components/dashboard/CryptoWatchlist';
import SentimentChart from '../components/charts/SentimentChart';
import PredictionCard from '../components/dashboard/PredictionCard';
import MetricCard from '../components/dashboard/MetricCard';
import { usePlan } from '../context/PlanContext';
import { useMarketData } from '../hooks/useMarketData';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { plan, features } = usePlan();
  const { prices, global, loading, error, reload } = useMarketData(60000, 40);
  const main = prices[0];
  const [openAcc, setOpenAcc] = useState<string | null>('package');
  const toggleAcc = (id: string) => setOpenAcc(o => o === id ? null : id);

  const intervals = [
    { label: '1m', value: '1' },
    { label: '5m', value: '5' },
    { label: '15m', value: '15' },
    { label: '1h', value: '60' },
    { label: '4h', value: '240' },
    { label: '1D', value: 'D' },
    { label: '1W', value: 'W' },
  ];

  const symbols = [
    { label: 'BTC/USDT', value: 'BINANCE:BTCUSDT', base: 43250 },
    { label: 'ETH/USDT', value: 'BINANCE:ETHUSDT', base: 2650 },
    { label: 'BNB/USDT', value: 'BINANCE:BNBUSDT', base: 315 },
    { label: 'ADA/USDT', value: 'BINANCE:ADAUSDT', base: 0.52 },
    { label: 'DOGE/USDT', value: 'BINANCE:DOGEUSDT', base: 0.082 },
  ];

  const allowedSymbols = useMemo(() => symbols.slice(0, features.maxCoins), [symbols, features.maxCoins]);

  return (
    <div className="page-container dashboard-root relative">
      <div className="dashboard-bg-pattern" aria-hidden="true" />
      <div className="content-wrapper pb-16 relative z-10">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-start md:items-center justify-between gap-4 mb-6">
          <div className="space-y-2">
            <h1 className="section-title mb-0">Dashboard Prediksi</h1>
            <p className="text-tv-text-secondary text-xs md:text-sm max-w-xl">MVP: Fokus insight ringkas untuk 5 koin. Data, sentiment & proyeksi 24h — iterasi cepat berdasarkan feedback komunitas.</p>
            {error && <div className="text-tv-red text-[11px]">{error} <button onClick={reload} className="underline ml-1">Retry</button></div>}
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-2 md:mt-0">
            {plan !== 'free' && <button className="tv-button-primary text-sm">Set Alert</button>}
          </div>
        </div>

        {/* Top Stats Strip */}
        <div className="dash-stats-grid mb-10">
          {!global && (
            <>
              {Array.from({length:6}).map((_,i) => (
                <div key={i} className="stat-card skeleton-line" aria-hidden="true" />
              ))}
            </>
          )}
          {global && (
            <>
              <div className="stat-card">
                <div className="stat-label">Market Cap</div>
                <div className="stat-value anim-number">${(global.marketCap/1e12).toFixed(2)}T</div>
                <div className={`stat-change ${global.marketCapChangePct>=0?'up':'down'}`}>{global.marketCapChangePct>=0?'+':''}{global.marketCapChangePct.toFixed(2)}%</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Volume 24h</div>
                <div className="stat-value">${(global.volume24h/1e9).toFixed(1)}B</div>
                <div className="stat-sub">Likuiditas</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">BTC Dominance</div>
                <div className="stat-value">{global.btcDominance.toFixed(1)}%</div>
                <div className="stat-sub">Dominasi</div>
              </div>
              <div className="stat-card hidden xl:flex flex-col">
                <div className="stat-label">Update</div>
                <div className="stat-value !text-base">{new Date(global.lastUpdated).toLocaleTimeString()}</div>
                <button onClick={reload} className="refresh-tiny">Refresh</button>
              </div>
              <div className="stat-card hidden md:flex flex-col">
                <div className="stat-label">Plan</div>
                <div className="stat-value capitalize !text-base">{plan}</div>
                <Link to="/pricing" className="refresh-tiny">Kelola</Link>
              </div>
            </>
          )}
        </div>

  <div className="grid grid-cols-12 gap-6">
          {/* Main Area */}
          <div className="col-span-12 xl:col-span-9 space-y-6">
            {/* Chart Section */}
            <div className="tv-card mb-4 chart-wrapper relative">
              <div className="chart-glow" aria-hidden="true" />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                <div className="text-[10px] text-tv-text-secondary flex items-center gap-2">
                  <span>Koneksi: <span className="text-tv-green">Live</span></span>
                  {loading && <span className="animate-pulse">Memuat…</span>}
                </div>
              </div>
              <TradingViewWidget
                height={560}
                theme="dark"
                containerId="dashboard_chart"
              />
            </div>
            {/* KPI / Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 kpi-grid">
              <MetricCard title="BTC Dom" value={global?global.btcDominance.toFixed(1)+'%':'--'} subtitle="Market" />
              <MetricCard title="Mkt Cap" value={global? (global.marketCap/1e12).toFixed(2)+'T':'--'} subtitle={global?global.marketCapChangePct.toFixed(1)+'%':''} signal={global? (global.marketCapChangePct>0?'BUY':global.marketCapChangePct<0?'SELL':'NEUTRAL'):undefined} />
              <MetricCard title="Vol 24h" value={global? (global.volume24h/1e9).toFixed(1)+'B':'--'} subtitle="Liquidity" />
              <MetricCard title="Update" value={global? new Date(global.lastUpdated).toLocaleTimeString():'--'} subtitle={<span className="inline-flex items-center gap-1"><button onClick={reload} className="underline text-[10px]">Reload</button></span> as any} />
            </div>

            {/* Predictions & Sentiment */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Prediction Panel */}
              <div className="prediction-panel tv-card flex flex-col gap-4 lg:col-span-2 relative overflow-hidden">
                <div className="prediction-glow" aria-hidden="true" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <h3 className="subsection-title mb-0">Prediksi 24h</h3>
                  <div className="flex flex-wrap gap-3 text-[10px] text-tv-text-secondary">
                    <span>Model: v0.1 (eksperimen)</span>
                    <span>Akurasi Target: ≥70%</span>
                  </div>
                </div>
                {main ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 prediction-metrics">
                    <div className="pm-box">
                      <span className="l">Harga Saat Ini</span>
                      <span className="v">${main.price.toLocaleString(undefined,{maximumFractionDigits: main.price>100?0:4})}</span>
                      <span className={`c ${main.change24h>=0?'up':'down'}`}>{main.change24h.toFixed(2)}%</span>
                    </div>
                    <div className="pm-box">
                      <span className="l">Proyeksi Range</span>
                      <span className="v">{(main.price*0.97).toLocaleString(undefined,{maximumFractionDigits:0})} - { (main.price*1.03).toLocaleString(undefined,{maximumFractionDigits:0})}</span>
                      <span className="c neutral">±3% band</span>
                    </div>
                    <div className="pm-box">
                      <span className="l">Bias</span>
                      <span className={`v ${main.change24h>=0?'text-tv-green':'text-tv-red'}`}>{main.change24h>=0?'Bullish':'Bearish'}</span>
                      <span className="c">Short‑term</span>
                    </div>
                    <div className="pm-box">
                      <span className="l">Confidence</span>
                      <span className="v">68%</span>
                      <span className="c neutral">Low data</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-[11px] text-tv-text-secondary">Memuat data harga…</div>
                )}
                <div className="flex flex-col md:flex-row gap-4 md:items-end">
                  <div className="flex-1 text-[11px] text-tv-text-secondary leading-snug">
                    Prediksi masih dummy (heuristik sederhana ±band). Versi model nyata akan gunakan fitur teknikal + sentiment gabungan.
                  </div>
                  <div className="flex gap-2">
                    <button onClick={reload} className="refresh-tiny px-3 py-1 bg-[#1d2534] rounded-md border border-[#273041] hover:border-tv-blue transition">Reload</button>
                    {plan === 'free' && <Link to="/pricing" className="text-[10px] px-3 py-1 rounded-md bg-tv-blue text-white font-medium hover:brightness-110 transition">Upgrade</Link>}
                  </div>
                </div>
              </div>
              {/* Sentiment Panel */}
              <div className="tv-card flex flex-col sentiment-panel relative overflow-hidden">
                <div className="sentiment-glow" aria-hidden="true" />
                <div className="flex items-center justify-between mb-3">
                  <h3 className="subsection-title mb-0">Sentiment Sosial</h3>
                  <span className="text-[10px] text-tv-text-secondary">Freq: {features.sentimentFrequency}m</span>
                </div>
                <SentimentChart score={0.18} frequency={features.sentimentFrequency} />
                <p className="text-[10px] text-tv-text-secondary mt-2">Eksperimen: skor gabungan kata kunci lokal + global (placeholder).</p>
                {plan === 'free' && <Link to="/pricing" className="text-[10px] text-tv-blue underline mt-1">History & multi-source →</Link>}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 xl:col-span-3 space-y-6 xl:relative xl:pt-1">
            <CryptoWatchlist />
            <div className="tv-card sidebar-accordion">
              <div className={`acc-item ${openAcc==='package'?'open':''}`}>
                <button className="acc-head" onClick={()=>toggleAcc('package')}>
                  <span>Info Paket</span>
                  <span className="chev" />
                </button>
                <div className="acc-body">
                  <p className="acc-text">Paket aktif: <span className="font-semibold capitalize text-white">{plan}</span></p>
                  {plan === 'free' && <p className="acc-text">Upgrade untuk prediksi 7d, alert granular & sentiment lebih cepat.</p>}
                  {plan !== 'free' && <p className="acc-text">Semua fitur MVP aktif. Terima kasih dukungan awal.</p>}
                  <a href="/pricing" className="acc-btn">Kelola Paket</a>
                </div>
              </div>
              <div className={`acc-item ${openAcc==='disclaimer'?'open':''}`}>
                <button className="acc-head" onClick={()=>toggleAcc('disclaimer')}>
                  <span>Disclaimer</span><span className="chev" />
                </button>
                <div className="acc-body">
                  <p className="acc-text text-[10px] leading-snug">Informasi & prediksi edukasi, bukan saran investasi. Lakukan riset sendiri.</p>
                </div>
              </div>
              <div className={`acc-item ${openAcc==='roadmap'?'open':''}`}>
                <button className="acc-head" onClick={()=>toggleAcc('roadmap')}>
                  <span>Roadmap Singkat</span><span className="chev" />
                </button>
                <div className="acc-body">
                  <ul className="roadmap-mini">
                    <li>v0.2: Alert builder</li>
                    <li>v0.3: Sentiment multi-sumber</li>
                    <li>v0.4: Prediksi 7d</li>
                  </ul>
                  <Link to="/community" className="acc-link">Komunitas & feedback →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
