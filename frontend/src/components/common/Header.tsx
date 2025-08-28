import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { to: '/pricing', label: 'Products' },
    { to: '/community', label: 'Community' },
    { to: '/dashboard', label: 'Markets' },
    { to: '/brokers', label: 'Brokers' },
    { to: '/more', label: 'More' }
  ];

  const isActiveRoute = (path: string) => location.pathname === path;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // close mobile on navigation
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="site-header__inner">
          <Link to="/" className="site-header__logo" aria-label="CryptoPredict ID home">
            <div className="logo-box"><span>A</span></div>
            <div className="logo-text"><strong>JaliinCrypto</strong><small>Insight & Sentiment</small></div>
          </Link>
          <div className="site-header__search">
            <input placeholder="Search (Ctrl+K)" aria-label="Search" />
            <span className="kbd">Ctrl+K</span>
          </div>
          <nav className="site-header__nav" aria-label="Main navigation">
            {navItems.map(item => (
              <Link key={item.to} to={item.to} className={isActiveRoute(item.to) ? 'active' : ''}>{item.label}</Link>
            ))}
          </nav>
          <div className="site-header__actions">
            <button className="lang" aria-label="Language">EN</button>
            <Link to="/login" className="icon-btn" aria-label="Account">👤</Link>
            <Link to="/register" className="cta-btn">Get started</Link>
            <button className="menu-btn" aria-label="Menu" onClick={()=>setIsMobileMenuOpen(o=>!o)}>
              <span className={isMobileMenuOpen? 'bar open': 'bar'} />
              <span className={isMobileMenuOpen? 'bar open': 'bar'} />
              <span className={isMobileMenuOpen? 'bar open': 'bar'} />
            </button>
          </div>
        </div>
        <div className={`mobile-panel ${isMobileMenuOpen? 'show':''}`}> 
          <div className="mobile-nav">
            {navItems.map(item => (
              <Link key={item.to} to={item.to} className={isActiveRoute(item.to) ? 'active' : ''}>{item.label}</Link>
            ))}
            <div className="mobile-auth">
              <Link to="/login">Login</Link>
              <Link to="/register" className="cta-btn">Register</Link>
            </div>
          </div>
        </div>
      </header>
      <div style={{height:'64px'}} />
      <style>{`
        .site-header {position:fixed;top:0;left:0;right:0;z-index:60;background:rgba(15,21,34,.78);backdrop-filter:blur(18px);border-bottom:1px solid #1f2733;transition:background .3s,border-color .3s;}
        .site-header.scrolled {background:rgba(15,21,34,.92);border-color:#253040;}
        .site-header__inner {max-width:1400px;margin:0 auto;display:flex;align-items:center;gap:28px;padding:0 32px;height:64px;}
        .site-header__logo {display:flex;align-items:center;gap:12px;text-decoration:none;color:#fff;}
        .logo-box {width:42px;height:42px;border-radius:12px;background:linear-gradient(135deg,#2563eb,#7c3aed);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:20px;box-shadow:0 4px 14px -2px rgba(59,130,246,.5);} 
        .logo-text strong {display:block;font-size:15px;line-height:1.1;letter-spacing:.5px;font-weight:700;background:linear-gradient(90deg,#fff,#d6e3ff);-webkit-background-clip:text;color:transparent;}
        .logo-text small {display:block;font-size:10px;color:#7d8da5;letter-spacing:.08em;text-transform:uppercase;margin-top:2px;}
        .site-header__search {flex:1;max-width:520px;position:relative;display:flex;align-items:center;}
        .site-header__search input {width:100%;background:#1b2331;border:1px solid #2a3444;color:#e2e8f0;border-radius:999px;padding:10px 14px 10px 16px;font-size:13px;outline:none;transition:.25s;}
        .site-header__search input:focus {background:#202b3c;border-color:#3674ff;box-shadow:0 0 0 2px rgba(54,116,255,.25);} 
        .site-header__search .kbd {position:absolute;right:12px;top:50%;transform:translateY(-50%);background:#283244;border:1px solid #354255;padding:2px 6px;border-radius:6px;font-size:10px;color:#99a8bd;letter-spacing:.05em;}
        .site-header__nav {display:flex;align-items:center;gap:26px;font-size:13px;font-weight:500;}
        .site-header__nav a {color:#b4bdc9;text-decoration:none;position:relative;letter-spacing:.4px;}
        .site-header__nav a:hover {color:#fff;}
        .site-header__nav a.active {color:#fff;}
        .site-header__nav a.active:after,.site-header__nav a:hover:after {content:"";position:absolute;left:0;right:0;bottom:-12px;height:2px;border-radius:2px;background:linear-gradient(90deg,#2563eb,#7c3aed);} 
        .site-header__actions {display:flex;align-items:center;gap:14px;}
        .site-header__actions .lang {background:transparent;border:1px solid #2c3646;border-radius:8px;color:#d0d6e0;font-size:12px;padding:6px 10px;cursor:pointer;transition:.25s;}
        .site-header__actions .lang:hover {border-color:#3b82f6;color:#fff;}
        .icon-btn {width:38px;height:38px;display:inline-flex;align-items:center;justify-content:center;border-radius:50%;border:1px solid #2c3646;color:#c6cfdb;text-decoration:none;transition:.25s;}
        .icon-btn:hover {border-color:#3b82f6;color:#fff;}
        .cta-btn {background:linear-gradient(90deg,#2563eb,#7c3aed);color:#fff;text-decoration:none;font-size:13px;font-weight:600;padding:10px 20px;border-radius:12px;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 6px 18px -6px rgba(59,130,246,.55);transition:.3s;}
        .cta-btn:hover {filter:brightness(1.15);transform:translateY(-2px);} 
        .menu-btn {display:none;flex-direction:column;gap:4px;background:transparent;border:none;padding:4px 6px;cursor:pointer;}
        .menu-btn .bar {width:22px;height:2px;background:#c7d0dc;transition:.3s;}
        .menu-btn .bar.open:nth-child(1){transform:translateY(6px) rotate(45deg);} 
        .menu-btn .bar.open:nth-child(2){opacity:0;} 
        .menu-btn .bar.open:nth-child(3){transform:translateY(-6px) rotate(-45deg);} 
        .mobile-panel {display:none;}
        @media (max-width:1100px){ .site-header__nav {display:none;} }
        @media (max-width:900px){ .site-header__search {display:none;} }
        @media (max-width:760px){ 
          .menu-btn {display:flex;} 
          .site-header__actions .lang, .site-header__actions .icon-btn, .site-header__actions .cta-btn {display:none;} 
          .mobile-panel {position:fixed;top:64px;left:0;right:0;bottom:0;background:rgba(15,21,34,.96);backdrop-filter:blur(14px);overflow-y:auto;display:block;transform:translateY(-8px);opacity:0;pointer-events:none;transition:.35s;} 
          .mobile-panel.show {transform:translateY(0);opacity:1;pointer-events:auto;} 
          .mobile-nav {display:flex;flex-direction:column;padding:28px 28px 60px;gap:8px;} 
          .mobile-nav a {padding:14px 16px;border:1px solid #253040;border-radius:10px;color:#c2ccd8;text-decoration:none;font-size:14px;font-weight:500;letter-spacing:.4px;transition:.25s;} 
          .mobile-nav a:hover {border-color:#3b82f6;color:#fff;} 
          .mobile-nav a.active {border-color:#3b82f6;background:#1f2a3b;color:#fff;} 
          .mobile-auth {display:flex;flex-direction:column;gap:12px;margin-top:22px;} 
          .mobile-auth a {text-align:center;padding:12px 16px;border:1px solid #2d394a;border-radius:10px;color:#c8d2de;text-decoration:none;font-size:14px;font-weight:500;} 
          .mobile-auth a:hover {border-color:#3b82f6;color:#fff;} 
          .mobile-auth a.cta-btn {border:none;} 
        }
      `}</style>
    </>
  );
};

export default Header;