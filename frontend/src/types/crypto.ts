// Crypto data types

export interface CryptoSymbol {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  change24hPercent: number;
  volume24h: number;
  marketCap: number;
}

export interface TradingViewSymbol {
  symbol: string;
  name: string;
  exchange: string;
  type: string;
}

export interface ChartData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface TechnicalIndicator {
  name: string;
  value: number;
  signal: 'BUY' | 'SELL' | 'NEUTRAL';
}

declare global {
  interface Window {
    TradingView: any;
  }
}