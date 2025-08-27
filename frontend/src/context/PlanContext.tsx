import React, { createContext, useContext, useEffect, useState } from 'react';

export type Plan = 'free' | 'premium' | 'developer' | 'business';

interface PlanContextValue {
  plan: Plan;
  setPlan: (p: Plan) => void;
  features: {
    maxCoins: number;
    predictionWindows: ('24h' | '7d')[];
    sentimentFrequency: 'daily' | 'realtime';
    hasAlerts: boolean;
    indicators: ('SMA' | 'RSI' | 'MACD')[];
    showAccuracy: boolean;
  };
}

const defaultValue: PlanContextValue = {
  plan: 'free',
  setPlan: () => {},
  features: {
    maxCoins: 3,
    predictionWindows: ['24h'],
    sentimentFrequency: 'daily',
    hasAlerts: false,
    indicators: ['SMA', 'RSI', 'MACD'],
    showAccuracy: false,
  }
};

const PlanContext = createContext<PlanContextValue>(defaultValue);

export const PlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [plan, setPlan] = useState<Plan>('free');

  // Simple plan detection via URL param or localStorage (stub for real auth integration)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qp = params.get('plan');
    const stored = localStorage.getItem('userPlan') as Plan | null;
    if (qp && ['free','premium','developer','business'].includes(qp)) {
      setPlan(qp as Plan);
      localStorage.setItem('userPlan', qp);
    } else if (stored) {
      setPlan(stored);
    }
  }, []);

  const features = React.useMemo<PlanContextValue['features']>(() => {
    switch (plan) {
      case 'premium':
        return {
          maxCoins: 5,
          predictionWindows: ['24h','7d'],
          sentimentFrequency: 'realtime',
          hasAlerts: true,
          indicators: ['SMA','RSI','MACD'],
          showAccuracy: true,
        };
      case 'developer':
      case 'business':
        return {
          maxCoins: 5,
          predictionWindows: ['24h','7d'],
          sentimentFrequency: 'realtime',
          hasAlerts: true,
          indicators: ['SMA','RSI','MACD'],
          showAccuracy: true,
        };
      case 'free':
      default:
        return defaultValue.features;
    }
  }, [plan]);

  return (
    <PlanContext.Provider value={{ plan, setPlan, features }}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => useContext(PlanContext);
