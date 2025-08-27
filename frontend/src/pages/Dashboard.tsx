import React, { useMemo, useState } from 'react';
import TradingViewWidget from '../components/charts/TradingViewWidget';
import CryptoWatchlist from '../components/dashboard/CryptoWatchlist';
import SentimentChart from '../components/charts/SentimentChart';
import PredictionCard from '../components/dashboard/PredictionCard';
import MetricCard from '../components/dashboard/MetricCard';
import { usePlan } from '../context/PlanContext';

const Dashboard: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('BINANCE:BTCUSDT');
  const [selectedInterval, setSelectedInterval] = useState('D');
  const { plan, features } = usePlan();

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
  const currentBase = allowedSymbols.find(s => s.value === selectedSymbol)?.base || symbols[0].base;

  return (
    <div className="page-container">
      <div className="content-wrapper">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="section-title mb-2">Dashboard Prediksi</h1>
            <p className="text-tv-text-secondary text-sm">MVP: Prediksi harga, sentiment sosial, indikator teknikal dasar</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <select 
              value={selectedSymbol}
              onChange={(e) => setSelectedSymbol(e.target.value)}
              className="tv-input"
            >
              {allowedSymbols.map((symbol) => (
                <option key={symbol.value} value={symbol.value}>{symbol.label}</option>
              ))}
            </select>
            {plan !== 'free' && <button className="tv-button-primary">Set Alert</button>}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Main Area */}
          <div className="col-span-12 xl:col-span-9 space-y-6">
            {/* Chart Section */}
            <div className="tv-card mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <h2 className="subsection-title mb-2 md:mb-0">Price Chart</h2>
                <div className="flex flex-wrap gap-2">
                  {intervals.map((interval) => (
                    <button
                      key={interval.value}
                      onClick={() => setSelectedInterval(interval.value)}
                      className={`px-3 py-1 text-sm rounded transition-colors ${
                        selectedInterval === interval.value
                          ? 'bg-tv-blue text-white'
                          : 'bg-tv-border text-tv-text hover:bg-tv-surface'
                      }`}
                    >
                      {interval.label}
                    </button>
                  ))}
                </div>
              </div>
              <TradingViewWidget 
                symbol={selectedSymbol}
                height={600}
                interval={selectedInterval}
                theme="dark"
                containerId="dashboard_chart"
              />
            </div>
            {/* KPI / Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <MetricCard title="SMA (20)" value="$42.8k" subtitle="Above Price" signal="BUY" />
              <MetricCard title="RSI (14)" value="58" subtitle="Neutral-Bull" signal="NEUTRAL" />
              <MetricCard title="MACD" value="Bull" subtitle="+125 / +36" signal="BUY" />
              <MetricCard title="Vol 24h" value="2.8M" subtitle="+12%" />
              <MetricCard title="Support" value="$42.8k" />
              <MetricCard title="Resistance" value="$44.2k" />
            </div>

            {/* Predictions & Sentiment Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2"><PredictionCard symbol={selectedSymbol.split(':')[1].replace('USDT','')} basePrice={currentBase} /></div>
              <div className="tv-card"><SentimentChart score={0.18} frequency={features.sentimentFrequency} /></div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 xl:col-span-3 space-y-6">
            <CryptoWatchlist />
            <div className="tv-card">
              <h3 className="subsection-title">Info Paket</h3>
              <p className="text-xs text-tv-text-secondary mb-2">Paket aktif: <span className="font-semibold capitalize text-white">{plan}</span></p>
              {plan === 'free' && <p className="text-[11px] text-tv-text-secondary">Upgrade untuk akses 7d prediksi & alert real-time.</p>}
              {plan !== 'free' && <p className="text-[11px] text-tv-text-secondary">Semua fitur MVP aktif.</p>}
              <a href="/pricing" className="mt-3 inline-block tv-button-secondary w-full text-center">Kelola Paket</a>
            </div>
            <div className="tv-card">
              <h3 className="subsection-title">Disclaimer</h3>
              <p className="text-[10px] leading-snug text-tv-text-secondary">Informasi & prediksi bersifat edukasi, bukan saran investasi. Lakukan riset sendiri sebelum mengambil keputusan finansial.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
