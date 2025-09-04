import * as React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <>
            <footer className="site-footer">
                <div className="site-footer__accent-border"></div>
                
                <div className="site-footer__content">
                    <div className="site-footer__main">
                        {/* Company info */}
                        <div className="company-info">
                            <Link to="/" className="company-logo">
                                <div className="logo-box"><span>A</span></div>
                                <div className="logo-text"><strong>Crypto</strong></div>
                            </Link>
                            <p className="company-description">
                                Platform edukasi & informasi kripto terkemuka di Indonesia. Temukan berita terbaru,
                                analisis pasar, dan panduan investasi crypto yang akurat.
                            </p>
                            
                            {/* Newsletter */}
                            <div className="newsletter-box">
                                <h3>Berlangganan Newsletter</h3>
                                <form onSubmit={e => e.preventDefault()}>
                                    <input 
                                        type="email" 
                                        placeholder="Email Anda" 
                                        aria-label="Email address"
                                    />
                                    <button 
                                        type="submit"
                                        aria-label="Subscribe"
                                    >
                                        Langganan
                                    </button>
                                </form>
                            </div>
                        </div>
                        
                        {/* Navigation & Links */}
                        <div className="footer-nav">
                            {/* Links column 1 */}
                            <div className="footer-nav__column">
                                <h3>Navigasi</h3>
                                <ul>
                                    <li><Link to="/">Beranda</Link></li>
                                    <li><Link to="/blog">Blog</Link></li>
                                    <li><Link to="/market">Market</Link></li>
                                    <li><Link to="/about">Tentang Kami</Link></li>
                                </ul>
                            </div>
                            
                            {/* Links column 2 */}
                            <div className="footer-nav__column">
                                <h3>Layanan</h3>
                                <ul>
                                    <li><Link to="/signals">Sinyal Trading</Link></li>
                                    <li><Link to="/education">Edukasi</Link></li>
                                    <li><Link to="/premium">Premium</Link></li>
                                    <li><Link to="/faq">FAQ</Link></li>
                                </ul>
                            </div>
                            
                            {/* Contact info */}
                            <div className="footer-nav__column">
                                <h3>Kontak</h3>
                                <ul className="contact-list">
                                    <li>
                                        <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                        </svg>
                                        <a href="mailto:info@akurajakripto.com">info@akurajakripto.com</a>
                                    </li>
                                    <li>
                                        <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                        </svg>
                                        <span>+62 812-3456-7890</span>
                                    </li>
                                </ul>
                                
                                {/* Social links */}
                                <div className="social-links">
                                    <a href="#" aria-label="Twitter">
                                        <svg fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.531A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                                        </svg>
                                    </a>
                                    <a href="#" aria-label="Facebook">
                                        <svg fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/>
                                        </svg>
                                    </a>
                                    <a href="#" aria-label="Instagram">
                                        <svg fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Bottom copyright */}
                    <div className="site-footer__bottom">
                        <div className="site-footer__copyright">
                            <p>© {new Date().getFullYear()} JaliinCrypto. All rights reserved.</p>
                        </div>
                        <div className="site-footer__links">
                            <Link to="/privacy">Kebijakan Privasi</Link>
                            <Link to="/terms">Syarat & Ketentuan</Link>
                            <Link to="/disclaimer">Disclaimer</Link>
                        </div>
                    </div>
                </div>
                
                {/* Bottom warning banner */}
                <div className="site-footer__warning">
                    <p>
                        Investasi kripto mengandung risiko tinggi. Kinerja masa lalu tidak menjamin hasil di masa depan.
                        Konten pada situs ini bersifat edukatif dan bukan merupakan nasihat finansial.
                    </p>
                </div>
            </footer>
            <style>{`
                .site-footer {background-color:#0f1522;color:#fff;}
                .site-footer__accent-border {height:1px;background:linear-gradient(90deg,#2563eb,#7c3aed,#2563eb);}
                .site-footer__content {max-width:1400px;margin:0 auto;padding:0 32px;}
                .site-footer__main {display:flex;flex-wrap:wrap;gap:60px;padding:60px 0 40px;border-bottom:1px solid #1f2733;}
                
                /* Company section */
                .company-info {width:100%;max-width:420px;}
                .company-logo {display:flex;align-items:center;gap:12px;text-decoration:none;color:#fff;margin-bottom:20px;}
                .logo-box {width:42px;height:42px;border-radius:12px;background:linear-gradient(135deg,#2563eb,#7c3aed);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:20px;box-shadow:0 4px 14px -2px rgba(59,130,246,.5);}
                .logo-text strong {display:block;font-size:18px;line-height:1.2;letter-spacing:.5px;font-weight:700;background:linear-gradient(90deg,#fff,#d6e3ff);-webkit-background-clip:text;color:transparent;}
                .company-description {color:#94a3b8;margin-bottom:28px;line-height:1.6;font-size:14px;}
                
                /* Newsletter */
                .newsletter-box {background:rgba(30,41,59,.6);border:1px solid #1f2937;border-radius:12px;padding:24px;backdrop-filter:blur(10px);}
                .newsletter-box h3 {font-size:16px;font-weight:600;margin-bottom:16px;color:#e2e8f0;}
                .newsletter-box form {display:flex;flex-direction:column;gap:12px;}
                @media (min-width:520px) {
                    .newsletter-box form {flex-direction:row;}
                }
                .newsletter-box input {flex:1;background:#1b2331;border:1px solid #2a3444;color:#e2e8f0;border-radius:12px;padding:12px 16px;font-size:14px;outline:none;transition:.25s;}
                .newsletter-box input:focus {background:#202b3c;border-color:#3674ff;box-shadow:0 0 0 2px rgba(54,116,255,.25);}
                .newsletter-box button {background:linear-gradient(90deg,#2563eb,#7c3aed);color:#fff;font-size:14px;font-weight:600;padding:12px 20px;border:none;border-radius:12px;cursor:pointer;transition:.3s;box-shadow:0 6px 18px -6px rgba(59,130,246,.55);}
                .newsletter-box button:hover {filter:brightness(1.15);transform:translateY(-2px);}
                
                /* Footer nav */
                .footer-nav {display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:40px;width:100%;max-width:700px;}
                .footer-nav__column h3 {font-size:15px;font-weight:600;color:#e2e8f0;margin-bottom:20px;}
                .footer-nav__column ul {list-style:none;padding:0;margin:0;}
                .footer-nav__column ul li {margin-bottom:12px;}
                .footer-nav__column ul a, .footer-nav__column ul span {color:#94a3b8;text-decoration:none;font-size:14px;transition:color 0.2s;}
                .footer-nav__column ul a:hover {color:#3b82f6;}
                
                /* Contact list */
                .contact-list li {display:flex;align-items:center;gap:8px;margin-bottom:14px;}
                .contact-list .icon {width:18px;height:18px;color:#3b82f6;}
                
                /* Social links */
                .social-links {display:flex;gap:12px;margin-top:20px;}
                .social-links a {width:36px;height:36px;border-radius:50%;background:#1e293b;display:flex;align-items:center;justify-content:center;color:#94a3b8;transition:all 0.2s;}
                .social-links a:hover {background:#3b82f6;color:#fff;transform:translateY(-2px);}
                .social-links svg {width:18px;height:18px;}
                
                /* Footer bottom */
                .site-footer__bottom {display:flex;flex-direction:column;align-items:center;padding:32px 0;gap:20px;}
                @media (min-width:640px) {
                    .site-footer__bottom {flex-direction:row;justify-content:space-between;}
                }
                .site-footer__copyright p {color:#64748b;font-size:13px;}
                .site-footer__links {display:flex;flex-wrap:wrap;gap:24px;}
                .site-footer__links a {color:#64748b;text-decoration:none;font-size:13px;transition:color 0.2s;}
                .site-footer__links a:hover {color:#3b82f6;}
                
                /* Warning banner */
                .site-footer__warning {background:#0c111b;padding:14px 0;text-align:center;}
                .site-footer__warning p {max-width:1000px;margin:0 auto;padding:0 32px;color:#475569;font-size:12px;line-height:1.6;}
                
                /* Responsive */
                @media (max-width:860px) {
                    .site-footer__main {gap:40px;padding:40px 0 30px;}
                    .company-info {max-width:100%;}
                }
            `}</style>
        </>
    );
};

export default Footer;
