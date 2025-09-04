import React, { useState } from 'react';
import { CryptoSymbol } from '../../types/crypto';

interface CryptoWatchlistProps {
  symbols?: CryptoSymbol[];
}

const CryptoWatchlist: React.FC<CryptoWatchlistProps> = ({ symbols = [] }) => {
  const [activeTab, setActiveTab] = useState<'watchlist' | 'trending'>('watchlist');
  const [sortBy, setSortBy] = useState<'default' | 'name' | 'price' | 'change'>('default');
  
  // MVP scope: top 5 coins BTC, ETH, BNB, ADA, DOGE
  const defaultSymbols: CryptoSymbol[] = [
    { symbol: 'BTC', name: 'Bitcoin', price: 43250.00, change24h: 1250.50, change24hPercent: 2.98, volume24h: 28500000000, marketCap: 850000000000 },
    { symbol: 'ETH', name: 'Ethereum', price: 2650.75, change24h: -45.25, change24hPercent: -1.68, volume24h: 15200000000, marketCap: 320000000000 },
    { symbol: 'BNB', name: 'Binance Coin', price: 315.20, change24h: 8.45, change24hPercent: 2.76, volume24h: 1800000000, marketCap: 48000000000 },
    { symbol: 'ADA', name: 'Cardano', price: 0.52, change24h: 0.01, change24hPercent: 1.96, volume24h: 650000000, marketCap: 18000000000 },
    { symbol: 'DOGE', name: 'Dogecoin', price: 0.082, change24h: -0.001, change24hPercent: -1.20, volume24h: 480000000, marketCap: 11000000000 },
  ];

  // Trending coins could have different ordering or selection criteria
  const trendingSymbols: CryptoSymbol[] = [
    { symbol: 'SOL', name: 'Solana', price: 95.80, change24h: 5.25, change24hPercent: 5.8, volume24h: 2500000000, marketCap: 40500000000 },
    { symbol: 'AVAX', name: 'Avalanche', price: 36.50, change24h: 2.15, change24hPercent: 6.26, volume24h: 980000000, marketCap: 13200000000 },
    ...defaultSymbols.slice(0, 3),
  ];

  let cryptoList = symbols.length > 0 ? symbols : 
                   (activeTab === 'watchlist' ? defaultSymbols : trendingSymbols);
                   
  // Apply sorting if needed
  if (sortBy !== 'default') {
    cryptoList = [...cryptoList].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price') return b.price - a.price;
      if (sortBy === 'change') return b.change24hPercent - a.change24hPercent;
      return 0;
    });
  }

  const formatPrice = (price: number) => {
    if (price < 1) return price.toFixed(4);
    if (price < 10) return price.toFixed(2);
    return price.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
    return `$${marketCap.toLocaleString()}`;
  };
  
  const formatVolume = (volume: number) => {
    if (volume >= 1e9) return `$${(volume / 1e9).toFixed(2)}B`;
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(2)}M`;
    return `$${volume.toLocaleString()}`;
  };

  return (
    <div className="crypto-watchlist">
      <div className="watchlist-header">
        <div className="watchlist-tabs">
          <button 
            className={`tab ${activeTab === 'watchlist' ? 'active' : ''}`}
            onClick={() => setActiveTab('watchlist')}
          >
            Watchlist
          </button>
          <button 
            className={`tab ${activeTab === 'trending' ? 'active' : ''}`}
            onClick={() => setActiveTab('trending')}
          >
            Trending
          </button>
        </div>
        <div className="watchlist-actions">
          <select 
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            aria-label="Sort cryptocurrencies"
          >
            <option value="default">Default</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="change">Performance</option>
          </select>
          <button className="action-btn" aria-label="More options">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
        </div>
      </div>

      <div className="list-header">
        <div className="asset-col">Asset</div>
        <div className="price-col">Last Price</div>
        <div className="change-col">24h Change</div>
      </div>
      
      <div className="crypto-list">
        {cryptoList.map((crypto) => (
          <div key={crypto.symbol} className="crypto-item">
            <div className="asset-info">
              <div className="crypto-icon" style={{background: `linear-gradient(135deg, #${crypto.symbol.charCodeAt(0).toString(16)}${crypto.symbol.charCodeAt(1).toString(16)}8ff, #${crypto.symbol.charCodeAt(0).toString(16)}${crypto.symbol.charCodeAt(1).toString(16)}4dd)`}}>
                <span>{crypto.symbol.slice(0, 2)}</span>
              </div>
              <div className="crypto-name">
                <div className="symbol">{crypto.symbol}</div>
                <div className="name">{crypto.name}</div>
              </div>
            </div>
            
            <div className="price-data">
              <div className="price">${formatPrice(crypto.price)}</div>
              <div className="market-cap">{formatMarketCap(crypto.marketCap)}</div>
            </div>
            
            <div className={`change-data ${crypto.change24hPercent >= 0 ? 'positive' : 'negative'}`}>
              <div className="percent">
                {crypto.change24hPercent >= 0 ? '+' : ''}{crypto.change24hPercent.toFixed(2)}%
                <span className="change-arrow">{crypto.change24hPercent >= 0 ? '▲' : '▼'}</span>
              </div>
              <div className="volume">{formatVolume(crypto.volume24h)}</div>
            </div>
            
            <button className="chart-btn" aria-label={`View ${crypto.symbol} chart`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18"></path>
                <path d="M18 9l-6 6-3-3-5 5"></path>
              </svg>
            </button>
          </div>
        ))}
      </div>
      
      <div className="watchlist-footer">
        <button className="view-all">
          View all markets
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"></path>
          </svg>
        </button>
      </div>

      <style>{`
        .crypto-watchlist {
          background: #151924;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
          border: 1px solid #232836;
          overflow: hidden;
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
        }
        
        /* Header Styles */
        .watchlist-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #232836;
        }
        
        .watchlist-tabs {
          display: flex;
          gap: 16px;
        }
        
        .tab {
          background: transparent;
          border: none;
          color: #8f96a3;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          padding: 4px 0;
          position: relative;
        }
        
        .tab.active {
          color: #e2e8f0;
        }
        
        .tab.active:after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #2563eb, #7c3aed);
          border-radius: 2px;
        }
        
        .watchlist-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .sort-select {
          background: #1b2133;
          border: 1px solid #2d3548;
          border-radius: 6px;
          color: #8f96a3;
          font-size: 12px;
          padding: 6px 10px;
          cursor: pointer;
          outline: none;
        }
        
        .action-btn {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #1b2133;
          border: 1px solid #2d3548;
          border-radius: 6px;
          color: #8f96a3;
          cursor: pointer;
        }
        
        .action-btn:hover {
          background: #232d45;
          color: #e2e8f0;
        }
        
        /* List Header Styles */
        .list-header {
          display: grid;
          grid-template-columns: 1fr 0.8fr 0.8fr 40px;
          padding: 12px 20px;
          background: #1a1f2d;
          border-bottom: 1px solid #232836;
          font-size: 12px;
          color: #6b7280;
          font-weight: 500;
        }
        
        .price-col, .change-col {
          text-align: right;
        }
        
        /* Crypto List Styles */
        .crypto-list {
          max-height: 400px;
          overflow-y: auto;
        }
        
        .crypto-item {
          display: grid;
          grid-template-columns: 1fr 0.8fr 0.8fr 40px;
          padding: 16px 20px;
          border-bottom: 1px solid #1e2334;
          cursor: pointer;
          transition: all 0.2s;
          align-items: center;
        }
        
        .crypto-item:hover {
          background: rgba(43, 55, 80, 0.4);
        }
        
        .asset-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .crypto-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: white;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
        
        .crypto-name {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        
        .symbol {
          font-weight: 600;
          color: #e2e8f0;
          font-size: 14px;
        }
        
        .name {
          color: #6b7280;
          font-size: 12px;
        }
        
        .price-data {
          text-align: right;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        
        .price {
          color: #e2e8f0;
          font-weight: 600;
          font-size: 14px;
        }
        
        .market-cap {
          color: #6b7280;
          font-size: 12px;
        }
        
        .change-data {
          text-align: right;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        
        .percent {
          font-weight: 600;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 4px;
        }
        
        .change-arrow {
          font-size: 10px;
        }
        
        .volume {
          color: #6b7280;
          font-size: 12px;
        }
        
        .positive {
          color: #10b981;
        }
        
        .negative {
          color: #ef4444;
        }
        
        .chart-btn {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: transparent;
          color: #6b7280;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s;
        }
        
        .chart-btn:hover {
          background: rgba(59, 130, 246, 0.15);
          color: #3b82f6;
        }
        
        /* Footer Styles */
        .watchlist-footer {
          padding: 16px 20px;
          border-top: 1px solid #232836;
          display: flex;
          justify-content: center;
        }
        
        .view-all {
          background: #1b2133;
          border: 1px solid #2d3548;
          border-radius: 8px;
          color: #8f96a3;
          font-size: 13px;
          padding: 8px 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }
        
        .view-all:hover {
          background: #232d45;
          color: #e2e8f0;
          border-color: #3b82f6;
        }
        
        /* Scrollbar Styles */
        .crypto-list::-webkit-scrollbar {
          width: 6px;
        }
        
        .crypto-list::-webkit-scrollbar-track {
          background: #151924;
        }
        
        .crypto-list::-webkit-scrollbar-thumb {
          background: #2d3548;
          border-radius: 3px;
        }
        
        .crypto-list::-webkit-scrollbar-thumb:hover {
          background: #3b4563;
        }
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
          .list-header {
            grid-template-columns: 1fr 0.8fr 0.8fr;
          }
          
          .crypto-item {
            grid-template-columns: 1fr 0.8fr 0.8fr;
          }
          
          .chart-btn {
            display: none;
          }
        }
        
        @media (max-width: 480px) {
          .market-cap, .volume {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default CryptoWatchlist;
