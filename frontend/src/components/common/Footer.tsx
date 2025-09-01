import * as React from 'react';


const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-b from-[#1a1b1e] via-[#141517] to-[#0d0e10] text-white pt-16 pb-8 mt-16 font-sans relative">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
            <div className="max-w-7xl mx-auto flex flex-wrap md:flex-nowrap justify-between items-start gap-12 px-6">
                {/* Brand & Newsletter */}
                <div className="flex-1 min-w-[300px] mb-8 md:mb-0">
                    <div className="flex items-center gap-3 mb-4 group cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-all duration-300">
                            <span className="text-2xl font-bold text-white">A</span>
                        </div>
                        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">AkuRajaCrypto</h2>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed mb-6 max-w-md">Platform edukasi & informasi kripto terbaik di Indonesia. Temukan prediksi, analisis, dan berita terbaru dunia crypto.</p>
                    <div className="bg-[#1c1d21] rounded-2xl p-4 shadow-xl backdrop-blur-sm border border-gray-800/50">
                        <h3 className="text-sm font-semibold mb-3 text-gray-200">Dapatkan Update Terbaru</h3>
                        <form className="flex flex-col gap-3" onSubmit={e => e.preventDefault()}>
                            <input 
                                type="email" 
                                placeholder="Masukkan email Anda..." 
                                className="w-full px-4 py-3 rounded-xl bg-[#262830] text-white text-sm border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 placeholder-gray-500"
                            />
                            <button 
                                type="submit" 
                                className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium hover:from-purple-500 hover:to-blue-500 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                            >
                                Langganan Newsletter
                            </button>
                        </form>
                        <p className="text-xs text-gray-500 mt-3">Dapatkan info & tips kripto terbaru (bebas spam)</p>
                    </div>
                </div>
                {/* Navigation & Links */}
                <div className="grid md:grid-cols-2 gap-x-16 gap-y-8 flex-1 min-w-[280px]">
                    <nav className="space-y-6">
                        <div>
                            <h3 className="font-semibold mb-4 text-lg bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Navigasi</h3>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <a href="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 group-hover:bg-purple-400"></span>
                                        <span>Beranda</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/about" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 group-hover:bg-purple-400"></span>
                                        <span>Tentang Kami</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/blog" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 group-hover:bg-purple-400"></span>
                                        <span>Blog</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/faq" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 group-hover:bg-purple-400"></span>
                                        <span>FAQ</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold mb-4 text-lg bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Layanan</h3>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <a href="/api-access" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-400"></span>
                                        <span>API Access</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/community" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-400"></span>
                                        <span>Komunitas</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/pricing" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-400"></span>
                                        <span>Harga</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/dashboard" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-400"></span>
                                        <span>Dashboard</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Social & Contact */}
                <div className="flex-1 min-w-[180px]">
                    <p className="font-semibold mb-3 text-lg">Ikuti & Kontak</p>
                    <div className="flex gap-4 mb-3">
                        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-tv-blue transition-colors">
                            <svg width="24" height="24" fill="currentColor"><path d="M22.46 5.92c-.8.36-1.66.6-2.56.71a4.48 4.48 0 0 0 1.97-2.48 8.94 8.94 0 0 1-2.83 1.08 4.48 4.48 0 0 0-7.63 4.08A12.74 12.74 0 0 1 3.11 4.6a4.48 4.48 0 0 0 1.39 5.98c-.7-.02-1.36-.21-1.94-.53v.05a4.48 4.48 0 0 0 3.6 4.39c-.33.09-.68.14-1.04.14-.25 0-.5-.02-.74-.07a4.48 4.48 0 0 0 4.18 3.11A9 9 0 0 1 2 19.54a12.72 12.72 0 0 0 6.88 2.02c8.26 0 12.78-6.84 12.78-12.78 0-.2 0-.41-.02-.61a9.1 9.1 0 0 0 2.24-2.32z"/></svg>
                        </a>
                        <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-tv-blue transition-colors">
                            <svg width="24" height="24" fill="currentColor"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.592 1.324-1.326V1.326C24 .592 23.405 0 22.675 0"/></svg>
                        </a>
                        <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-tv-blue transition-colors">
                            <svg width="24" height="24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.13 4.602.388 3.635 1.355 2.668 2.322 2.41 3.495 2.352 4.772.013 8.332 0 8.741 0 12c0 3.259.013 3.668.072 4.948.058 1.277.316 2.45 1.283 3.417.967.967 2.14 1.225 3.417 1.283C8.332 23.987 8.741 24 12 24c3.259 0 3.668-.013 4.948-.072 1.277-.058 2.45-.316 3.417-1.283.967-.967 1.225-2.14 1.283-3.417.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.058-1.277-.316-2.45-1.283-3.417-.967-.967-2.14-1.225-3.417-1.283C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm7.2-10.406a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
                        </a>
                    </div>
                    <div className="text-sm text-gray-400">
                        <div className="flex items-center gap-2 mb-1">
                            <svg width="18" height="18" fill="currentColor" className="text-tv-blue"><path d="M2 4.5A2.5 2.5 0 0 1 4.5 2h9A2.5 2.5 0 0 1 16 4.5v9A2.5 2.5 0 0 1 13.5 16h-9A2.5 2.5 0 0 1 2 13.5v-9zm2.25.75a.75.75 0 0 0-.75.75v7a.75.75 0 0 0 .75.75h9a.75.75 0 0 0 .75-.75v-7a.75.75 0 0 0-.75-.75h-9z"/></svg>
                            <span>support@akurajakripto.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg width="18" height="18" fill="currentColor" className="text-tv-blue"><path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1.003 1.003 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1C7.61 22 2 16.39 2 9.5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1.003 1.003 0 0 1-.24 1.01l-2.2 2.2z"/></svg>
                            <span>+62 812-3456-7890</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t border-[#27272a] mt-12 pt-6 text-center text-sm text-gray-400 bg-[#18181b]/60 rounded-b-xl shadow-inner">
                <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                    <span className="font-semibold text-white">© {new Date().getFullYear()} AkuRajaCrypto</span>
                    <span className="hidden md:inline">|</span>
                    <span>All rights reserved. Bukan nasihat investasi.</span>
                </div>
                <div className="mt-2 text-xs leading-snug text-gray-500">Konten & prediksi hanya untuk edukasi. Kinerja masa lalu tidak menjamin hasil di masa depan. Crypto berisiko tinggi.</div>
            </div>
        </footer>
    );
};

export default Footer;
