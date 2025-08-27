import * as React from 'react';

const Footer: React.FC = () => {
    return (
        <footer style={{
            background: '#18181b',
            color: '#fff',
            padding: '2rem 0',
            marginTop: '3rem',
            fontFamily: 'inherit'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '2rem'
            }}>
                {/* Logo & Brand */}
                <div style={{ flex: '1 1 200px' }}>
                    <h2 style={{ margin: 0, fontWeight: 700, letterSpacing: 1 }}>AkuRajaCrypto</h2>
                    <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.95rem', color: '#a1a1aa' }}>
                        Platform edukasi dan informasi kripto terbaik di Indonesia.
                    </p>
                </div>
                {/* Navigation */}
                <nav style={{ flex: '1 1 150px', minWidth: 120 }}>
                    <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                    }}>
                        <li><a href="/" style={{ color: '#fff', textDecoration: 'none' }}>Beranda</a></li>
                        <li><a href="/about" style={{ color: '#fff', textDecoration: 'none' }}>Tentang Kami</a></li>
                        <li><a href="/blog" style={{ color: '#fff', textDecoration: 'none' }}>Blog</a></li>
                        <li><a href="/contact" style={{ color: '#fff', textDecoration: 'none' }}>Kontak</a></li>
                    </ul>
                </nav>
                {/* Social Media */}
                <div style={{ flex: '1 1 150px', minWidth: 120 }}>
                    <p style={{ margin: 0, fontWeight: 600 }}>Ikuti Kami</p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" style={{ color: '#fff' }}>
                            <svg width="24" height="24" fill="currentColor"><path d="M22.46 5.92c-.8.36-1.66.6-2.56.71a4.48 4.48 0 0 0 1.97-2.48 8.94 8.94 0 0 1-2.83 1.08 4.48 4.48 0 0 0-7.63 4.08A12.74 12.74 0 0 1 3.11 4.6a4.48 4.48 0 0 0 1.39 5.98c-.7-.02-1.36-.21-1.94-.53v.05a4.48 4.48 0 0 0 3.6 4.39c-.33.09-.68.14-1.04.14-.25 0-.5-.02-.74-.07a4.48 4.48 0 0 0 4.18 3.11A9 9 0 0 1 2 19.54a12.72 12.72 0 0 0 6.88 2.02c8.26 0 12.78-6.84 12.78-12.78 0-.2 0-.41-.02-.61a9.1 9.1 0 0 0 2.24-2.32z"/></svg>
                        </a>
                        <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: '#fff' }}>
                            <svg width="24" height="24" fill="currentColor"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.592 1.324-1.326V1.326C24 .592 23.405 0 22.675 0"/></svg>
                        </a>
                        <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: '#fff' }}>
                            <svg width="24" height="24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.13 4.602.388 3.635 1.355 2.668 2.322 2.41 3.495 2.352 4.772.013 8.332 0 8.741 0 12c0 3.259.013 3.668.072 4.948.058 1.277.316 2.45 1.283 3.417.967.967 2.14 1.225 3.417 1.283C8.332 23.987 8.741 24 12 24c3.259 0 3.668-.013 4.948-.072 1.277-.058 2.45-.316 3.417-1.283.967-.967 1.225-2.14 1.283-3.417.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.058-1.277-.316-2.45-1.283-3.417-.967-.967-2.14-1.225-3.417-1.283C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm7.2-10.406a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
                        </a>
                    </div>
                </div>
            </div>
            <div style={{
                borderTop: '1px solid #27272a',
                marginTop: '2rem',
                paddingTop: '1rem',
                textAlign: 'center',
                fontSize: '0.95rem',
                color: '#a1a1aa'
            }}>
                © {new Date().getFullYear()} CryptoPredict ID. All rights reserved. | Bukan nasihat investasi.
                <div style={{marginTop:'0.5rem', fontSize:'0.75rem', lineHeight:1.3}}>Konten & prediksi hanya untuk edukasi. Kinerja masa lalu tidak menjamin hasil di masa depan. Crypto berisiko tinggi.</div>
            </div>
        </footer>
    );
};

export default Footer;
