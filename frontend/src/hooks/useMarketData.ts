import { useEffect, useState, useCallback } from 'react';

interface SimplePriceResponse {
  [id: string]: {
    usd: number;
    usd_24h_change: number;
  };
}

interface GlobalDataResponse {
  data: {
    total_market_cap: { usd: number };
    total_volume: { usd: number };
    market_cap_change_percentage_24h_usd: number;
    market_cap_percentage: { btc: number };
  };
}

export interface MarketSnapshot {
  prices: { id: string; symbol: string; price: number; change24h: number }[];
  global: {
    marketCap: number;
    volume24h: number;
    btcDominance: number;
    marketCapChangePct: number;
    lastUpdated: number;
  } | null;
  loading: boolean;
  error: string | null;
}

const COINS = [
  { id: 'bitcoin', symbol: 'BTC' },
  { id: 'ethereum', symbol: 'ETH' },
  { id: 'binancecoin', symbol: 'BNB' },
  { id: 'cardano', symbol: 'ADA' },
  { id: 'dogecoin', symbol: 'DOGE' }
];

export function useMarketData(refreshMs = 60000): MarketSnapshot {
  const [state, setState] = useState<MarketSnapshot>({
    prices: [],
    global: null,
    loading: true,
    error: null
  });

  const fetchData = useCallback(async () => {
    try {
      setState(s => ({ ...s, loading: true, error: null }));
      const priceUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${COINS.map(c=>c.id).join(',')}&vs_currencies=usd&include_24hr_change=true`;
      const globalUrl = 'https://api.coingecko.com/api/v3/global';
      const [priceRes, globalRes] = await Promise.all([
        fetch(priceUrl),
        fetch(globalUrl)
      ]);
      if (!priceRes.ok) throw new Error('Price fetch failed');
      if (!globalRes.ok) throw new Error('Global fetch failed');
      const priceJson = await priceRes.json() as SimplePriceResponse;
      const globalJson = await globalRes.json() as GlobalDataResponse;
      const prices = COINS.map(c => ({
        id: c.id,
        symbol: c.symbol,
        price: priceJson[c.id]?.usd ?? 0,
        change24h: priceJson[c.id]?.usd_24h_change ?? 0
      }));
      const g = globalJson.data;
      setState({
        prices,
        global: {
          marketCap: g.total_market_cap.usd,
            volume24h: g.total_volume.usd,
            btcDominance: g.market_cap_percentage.btc,
            marketCapChangePct: g.market_cap_change_percentage_24h_usd,
            lastUpdated: Date.now()
        },
        loading: false,
        error: null
      });
    } catch (e: any) {
      setState(s => ({ ...s, loading: false, error: e.message }));
    }
  }, []);

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, refreshMs);
    return () => clearInterval(id);
  }, [fetchData, refreshMs]);

  return state;
}
