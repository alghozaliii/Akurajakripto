import { useEffect, useState, useCallback, useRef } from 'react';

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
  prices: { id: string; symbol: string; price: number; change24h: number; prevPrice?: number; delta?: number; history?: number[] }[];
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

/**
 * useMarketData
 * - Pulls simple price & global metrics from CoinGecko at an interval
 * - Maintains short in-memory history per coin (for sparklines)
 * - Exposes delta (current - previous fetch) for UI animations
 */
export function useMarketData(refreshMs = 60000, historyPoints = 30): MarketSnapshot & { reload: () => void } {
  const [state, setState] = useState<MarketSnapshot>({
    prices: [],
    global: null,
    loading: true,
    error: null
  });
  const historiesRef = useRef<Record<string, number[]>>({});
  const prevPricesRef = useRef<Record<string, number>>({});
  const fetchingRef = useRef(false);

  const fetchData = useCallback(async () => {
    if (fetchingRef.current) return; // avoid overlapping
    try {
      setState(s => ({ ...s, loading: true, error: null }));
      fetchingRef.current = true;
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
      const prices = COINS.map(c => {
        const price = priceJson[c.id]?.usd ?? 0;
        const prev = prevPricesRef.current[c.id];
        // history mgmt
        const h = historiesRef.current[c.id] || [];
        const nextHist = [...h, price];
        if (nextHist.length > historyPoints) nextHist.splice(0, nextHist.length - historyPoints);
        historiesRef.current[c.id] = nextHist;
        prevPricesRef.current[c.id] = price;
        return {
          id: c.id,
            symbol: c.symbol,
            price,
            change24h: priceJson[c.id]?.usd_24h_change ?? 0,
            prevPrice: prev,
            delta: prev !== undefined ? price - prev : 0,
            history: nextHist
        };
      });
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
    } finally {
      fetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, refreshMs);
    return () => clearInterval(id);
  }, [fetchData, refreshMs]);

  return { ...state, reload: fetchData };
}
