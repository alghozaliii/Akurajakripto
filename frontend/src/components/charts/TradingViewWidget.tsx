import React, { useEffect, useRef } from 'react';

interface TradingViewWidgetProps {
  symbol?: string;
  width?: string | number;
  height?: string | number;
  theme?: 'light' | 'dark';
  interval?: string;
  containerId?: string;
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({
  symbol = 'BINANCE:BTCUSDT',
  width = '100%',
  height = 600,
  theme = 'dark',
  interval = 'D',
  containerId = 'tradingview_chart'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Remove existing script if any
      if (scriptRef.current) {
        scriptRef.current.remove();
      }

      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      script.onload = () => {
        if (window.TradingView) {
          new window.TradingView.widget({
            width,
            height,
            symbol,
            interval,
            timezone: 'Etc/UTC',
            theme,
            style: '1',
            locale: 'en',
            toolbar_bg: theme === 'dark' ? '#1E222D' : '#f1f3f6',
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: containerId,
            studies: [
              'MASimple@tv-basicstudies',
              'RSI@tv-basicstudies'
            ],
            show_popup_button: true,
            popup_width: '1000',
            popup_height: '650'
          });
        }
      };
      
      scriptRef.current = script;
      containerRef.current.appendChild(script);
    }

    return () => {
      if (scriptRef.current) {
        scriptRef.current.remove();
      }
    };
  }, [symbol, width, height, theme, interval, containerId]);

  return (
    <div ref={containerRef} className="w-full">
      <div id={containerId} className="rounded-lg overflow-hidden" />
    </div>
  );
};

export default TradingViewWidget;
