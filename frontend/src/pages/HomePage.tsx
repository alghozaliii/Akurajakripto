import React from 'react';
import TradingViewWidget from '../components/charts/TradingViewWidget';
import CryptoWatchlist from '../components/dashboard/CryptoWatchlist';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-tv-bg">
      <div className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Platform Trading Crypto Terdepan di Indonesia
          </h1>
          <p className="text-tv-text-secondary text-lg max-w-2xl mx-auto">
            Akses data real-time, analisis teknikal mendalam, dan insights pasar crypto terbaru
          </p>
        </div>

        {/* Main Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3">
            <div className="tv-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-tv-text">Chart Analysis</h2>
                <div className="flex space-x-2">
                  <button className="tv-button-secondary text-sm">1H</button>
                  <button className="tv-button-primary text-sm">1D</button>
                  <button className="tv-button-secondary text-sm">1W</button>
                  <button className="tv-button-secondary text-sm">1M</button>
                </div>
              </div>
              <TradingViewWidget 
                symbol="BINANCE:BTCUSDT"
                height={500}
                theme="dark"
              />
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <CryptoWatchlist />
          </div>
        </div>

        {/* Market Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="tv-card text-center">
            <h3 className="text-tv-text-secondary text-sm mb-2">Total Market Cap</h3>
            <p className="text-2xl font-bold text-tv-green">$1.75T</p>
            <p className="text-tv-green text-sm">+2.45%</p>
          </div>
          <div className="tv-card text-center">
            <h3 className="text-tv-text-secondary text-sm mb-2">24h Volume</h3>
            <p className="text-2xl font-bold text-tv-blue">$89.2B</p>
            <p className="text-tv-green text-sm">+5.12%</p>
          </div>
          <div className="tv-card text-center">
            <h3 className="text-tv-text-secondary text-sm mb-2">Bitcoin Dominance</h3>
            <p className="text-2xl font-bold text-tv-yellow">52.3%</p>
            <p className="text-tv-red text-sm">-0.8%</p>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="tv-card">
            <h3 className="text-xl font-semibold text-tv-text mb-3">Real-time Data</h3>
            <p className="text-tv-text-secondary">Akses data harga real-time dari berbagai exchange terpercaya</p>
          </div>
          <div className="tv-card">
            <h3 className="text-xl font-semibold text-tv-text mb-3">Technical Analysis</h3>
            <p className="text-tv-text-secondary">Tools analisis teknikal lengkap untuk trading yang lebih optimal</p>
          </div>
          <div className="tv-card">
            <h3 className="text-xl font-semibold text-tv-text mb-3">Market Insights</h3>
            <p className="text-tv-text-secondary">Analisis pasar mendalam dan rekomendasi dari para ahli</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
