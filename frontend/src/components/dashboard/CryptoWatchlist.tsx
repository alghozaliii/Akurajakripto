import React from 'react';
import { CryptoSymbol } from '../../types/crypto';

interface CryptoWatchlistProps {
  symbols?: CryptoSymbol[];
}

const CryptoWatchlist: React.FC<CryptoWatchlistProps> = ({ symbols = [] }) => {
  // MVP scope: top 5 coins BTC, ETH, BNB, ADA, DOGE
  const defaultSymbols: CryptoSymbol[] = [
    { symbol: 'BTC', name: 'Bitcoin', price: 43250.00, change24h: 1250.50, change24hPercent: 2.98, volume24h: 28500000000, marketCap: 850000000000 },
    { symbol: 'ETH', name: 'Ethereum', price: 2650.75, change24h: -45.25, change24hPercent: -1.68, volume24h: 15200000000, marketCap: 320000000000 },
    { symbol: 'BNB', name: 'Binance Coin', price: 315.20, change24h: 8.45, change24hPercent: 2.76, volume24h: 1800000000, marketCap: 48000000000 },
    { symbol: 'ADA', name: 'Cardano', price: 0.52, change24h: 0.01, change24hPercent: 1.96, volume24h: 650000000, marketCap: 18000000000 },
    { symbol: 'DOGE', name: 'Dogecoin', price: 0.082, change24h: -0.001, change24hPercent: -1.20, volume24h: 480000000, marketCap: 11000000000 },
  ];

  const cryptoList = symbols.length > 0 ? symbols : defaultSymbols;

  return (
    <div className="tv-card">
      <h3 className="text-lg font-semibold text-tv-text mb-2">Watchlist (Top 5)</h3>
      <p className="text-xs text-tv-text-secondary mb-4">Fokus MVP: 5 aset utama pasar Indonesia</p>
      <div className="space-y-2">
        {cryptoList.map((crypto) => (
          <div key={crypto.symbol} className="flex items-center justify-between p-3 hover:bg-tv-border rounded transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-tv-blue rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{crypto.symbol.slice(0, 2)}</span>
              </div>
              <div>
                <div className="text-tv-text font-medium">{crypto.symbol}</div>
                <div className="text-tv-text-secondary text-sm">{crypto.name}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-tv-text font-medium">${crypto.price.toLocaleString()}</div>
              <div className={`text-sm ${crypto.change24hPercent >= 0 ? 'text-tv-green' : 'text-tv-red'}`}>
                {crypto.change24hPercent >= 0 ? '+' : ''}{crypto.change24hPercent.toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoWatchlist;
