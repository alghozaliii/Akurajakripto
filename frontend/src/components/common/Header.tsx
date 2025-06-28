// Header.tsx

import * as React from 'react';

const Header: React.FC = () => {
    return (
      <header style={{
        padding: "24px 0 8px 0",
        textAlign: "center",
        color: "#fff",
        fontWeight: 700,
        fontSize: 28,
        letterSpacing: 1,
        background: "#181A20"
      }}>
        AkuRajaCrypto TradingView
      </header>
    );
}

export default Header;