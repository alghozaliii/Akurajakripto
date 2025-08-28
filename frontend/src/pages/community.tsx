// Placeholder to avoid Windows case-insensitive duplicate. Real component implemented in Community.tsx
export {};
    import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Community Page
// Fokus: bangun kepercayaan awal, jelaskan kanal, kontribusi, roadmap, social proof placeholder.

const communityStats = [
	{ label: 'Early Members', value: '120+', hint: 'Gabung 30 hari pertama' },
	{ label: 'Daily Signals (rencana)', value: '5-8', hint: 'Per koin fokus' },
	{ label: 'Target Akurasi 24h', value: '≥70%', hint: 'Directional' },
	{ label: 'Bahasa', value: 'ID + EN', hint: 'Fokus ID' }
];

const channels = [
	{
		key: 'telegram',
		title: 'Telegram Alert',
		desc: 'Notifikasi cepat: pergerakan ekstrem, perubahan sentiment signifikan & update model.',
		cta: 'Join Channel',
		url: '#telegram',
		gradient: 'linear-gradient(135deg,#2dd4bf,#3b82f6)'
	},
	{
		key: 'discord',
		title: 'Discord Hub',
		desc: 'Diskusi strategi, feedback fitur, eksperimen indikator & ruang kontribusi code.',
		cta: 'Masuk Server',
		url: '#discord',
		gradient: 'linear-gradient(135deg,#6366f1,#8b5cf6)'
	},
	{
		key: 'twitter',
		title: 'Twitter Updates',
		desc: 'Thread edukasi, progress build in public, highlight performa & rilis fitur.',
		cta: 'Follow',
		url: '#twitter',
		gradient: 'linear-gradient(135deg,#3b82f6,#0ea5e9)'
	}
];

const roadmap = [
	{ q: 'Q3 2025', items: ['Model 24h stable', 'Dashboard MVP', 'Sentiment dasar', 'Alert harga ekstrem'] },
	{ q: 'Q4 2025', items: ['Prediksi 7d', 'Sentiment multi-sumber real-time', 'Leaderboard akurasi', 'API publik alfa'] },
	{ q: 'Q1 2026', items: ['Model kombinasi teknikal+sentiment v2', 'Feature importance view', 'Alert custom builder', 'Integrasi broker (riset)'] }
];

const testimonials = [
	{ name: 'Andi', role: 'Swing Trader', quote: 'Ringkas & tidak overload indikator. Prediksi 24h cukup bantu filter noise.' },
	{ name: 'Sari', role: 'Quant Enthusiast', quote: 'Suka transparansi target akurasi & rencana open API. Menarik ikut awal.' },
	{ name: 'Reza', role: 'Komunitas Crypto', quote: 'Fokus 5 koin = lebih gampang diskusi & banding hasil model.' }
];

const Community: React.FC = () => {
	useEffect(() => {
		// simple on-scroll reveal
		const obs = new IntersectionObserver((entries) => {
			entries.forEach(e => {
				if (e.isIntersecting) e.target.classList.add('show');
			});
		}, { threshold: 0.15 });
		document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
		return () => obs.disconnect();
	}, []);

	return (
		<div className="community-root">
			<div className="community-hero">
				<div className="hero-bg" aria-hidden="true" />
				<div className="hero-inner">
					<h1>Bangun <span className="grad">Edge</span> Bersama Komunitas</h1>
					<p>Kita membangun model prediksi & sentiment yang relevan untuk pasar Indonesia secara terbuka & iteratif. Gabung lebih awal untuk bentuk arah produk.</p>
					<div className="hero-actions">
						<a href="#discord" className="hero-btn primary">Masuk Discord</a>
						<a href="#telegram" className="hero-btn ghost">Join Telegram</a>
					</div>
					<div className="hero-stats">
						{communityStats.map(s => (
							<div key={s.label} className="hstat">
								<span className="v">{s.value}</span>
								<span className="l">{s.label}</span>
								<span className="hint">{s.hint}</span>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Channels */}
			<section className="section channels" aria-labelledby="channels-heading">
				<h2 id="channels-heading" className="section-title-sm">Kanal Utama</h2>
				<div className="channel-grid">
								{channels.map(c => (
									<div key={c.key} className="channel-card reveal" style={{ ['--grad' as any]: c.gradient }}>
							<div className="badge" aria-hidden="true" />
							<h3>{c.title}</h3>
							<p>{c.desc}</p>
							<a href={c.url} className="channel-cta">{c.cta}</a>
						</div>
					))}
				</div>
			</section>

			{/* Contribution */}
			<section className="section contribute" aria-labelledby="contrib-heading">
				<h2 id="contrib-heading" className="section-title-sm">Kontribusi & Feedback</h2>
				<div className="contrib-layout">
					<div className="contrib-block reveal">
						<h3>Kamu Bisa Bantu</h3>
						<ul>
							<li><strong>Data Labeling Ringan:</strong> Validasi arah harga historical.</li>
							<li><strong>Signal Testing:</strong> Uji kombinasi indikator sederhana.</li>
							<li><strong>Quality Feedback:</strong> Laporkan false positive alert.</li>
							<li><strong>Terjemahan:</strong> Bantuan frasa UI / docs.</li>
						</ul>
					</div>
					<div className="contrib-block reveal">
						<h3>Prinsip Komunitas</h3>
						<ul>
							<li>Transparansi evolusi model & metrik.</li>
							<li>Fokus nilai praktis sebelum kompleksitas.</li>
							<li>Ramah pemula, akurat untuk intermediate.</li>
							<li>No hype / pump & dump.</li>
						</ul>
					</div>
					<form className="contrib-form reveal" onSubmit={(e)=>{e.preventDefault();alert('Subscribed (dummy)')}}>
						<label>Daftar Early Update</label>
						<div className="form-row">
							<input type="email" required placeholder="Email kamu" />
							<button type="submit">Kirim</button>
						</div>
						<p className="note">Hanya kabar rilis fitur & milestone penting. Bisa unsubscribe kapan saja.</p>
					</form>
				</div>
			</section>

			{/* Roadmap */}
			<section className="section roadmap" aria-labelledby="roadmap-heading">
				<h2 id="roadmap-heading" className="section-title-sm">Roadmap Ringkas</h2>
				<div className="roadmap-grid">
					{roadmap.map(r => (
						<div key={r.q} className="roadmap-col reveal">
							<div className="rq">{r.q}</div>
							<ul>{r.items.map(it => <li key={it}>{it}</li>)}</ul>
						</div>
					))}
				</div>
				<p className="foot-note">Roadmap dapat berubah sesuai feedback komunitas.</p>
			</section>

			{/* Testimonials */}
			<section className="section testimonials" aria-labelledby="testi-heading">
				<h2 id="testi-heading" className="section-title-sm">Suara Awal</h2>
				<div className="testi-row">
					{testimonials.map(t => (
						<figure key={t.name} className="testi-card reveal">
							<blockquote>“{t.quote}”</blockquote>
							<figcaption><span className="n">{t.name}</span><span className="r">{t.role}</span></figcaption>
						</figure>
					))}
				</div>
			</section>

			{/* Final CTA */}
			<section className="community-final">
				<div className="final-inner">
					<h2>Ayo Bangun Bersama</h2>
					<p>Masuk sekarang, bantu bentuk fitur & nikmati akses awal prediksi + sentiment real-time saat dirilis.</p>
					<div className="final-actions">
						<Link to="/register" className="final-btn primary">Daftar</Link>
						<a href="#discord" className="final-btn outline">Discord</a>
						<a href="#telegram" className="final-btn outline">Telegram</a>
					</div>
					<p className="mini-disclaimer">Bukan nasihat investasi.</p>
				</div>
			</section>
		</div>
	);
};

export default Community;
