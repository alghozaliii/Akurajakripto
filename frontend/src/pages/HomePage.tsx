// ...existing code...import React, { useEffect, useRef } from "react";

import React = require("react");

const HomePage: React.FC = () => {
  const container = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (container.current) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = () => {
        // @ts-ignore
        if (window.TradingView) {
          // @ts-ignore
          new window.TradingView.widget({
            width: "100%",
            height: 500,
            symbol: "BINANCE:BTCUSDT",
            interval: "D",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "en",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: "tradingview_chart"
          });
        }
      };
      container.current.appendChild(script);
    }
  }, []);

  return (
    <div>
      <h1>TradingView Chart</h1>
      <div ref={container}>
        <div id="tradingview_chart" />
      </div>
    </div>
  );
};

export default HomePage;
// ...existing code...