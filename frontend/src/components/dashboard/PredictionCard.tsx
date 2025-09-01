import React from 'react';
import { usePlan } from '../../context/PlanContext';

interface PredictionCardProps {
	symbol: string; // e.g. BTC
	basePrice: number;
}

// Placeholder predictive outputs (replace with API integration later)
const mockPredict = (price: number, window: '24h' | '7d') => {
	const drift = window === '24h' ? 0.01 : 0.04; // simplistic drift
	const volatility = window === '24h' ? 0.02 : 0.06;
	const direction = Math.random() > 0.5 ? 1 : -1;
	const changePct = (drift + Math.random()*volatility) * direction;
	const predicted = price * (1 + changePct);
	return {
		predicted: Number(predicted.toFixed(2)),
		changePct: Number((changePct*100).toFixed(2)),
		confidence: 60 + Math.random()*20 // 60-80%
	};
};

const PredictionCard: React.FC<PredictionCardProps> = ({ symbol, basePrice }) => {
	const { features } = usePlan();
	return (
		<div className="bg-[#181c23] rounded-2xl shadow-lg p-6 border border-tv-border max-w-md mx-auto">
			<div className="flex items-center justify-between mb-4">
				<h4 className="text-base font-bold text-tv-text tracking-tight">Prediksi {symbol}</h4>
				<span className="text-xs px-2 py-0.5 rounded bg-tv-yellow/20 text-tv-yellow font-semibold uppercase">Demo</span>
			</div>
			<div className="grid grid-cols-2 gap-4">
				{features.predictionWindows.map(window => {
					const p = mockPredict(basePrice, window);
					const dirColor = p.changePct > 0 ? 'text-tv-green' : 'text-tv-red';
					return (
						<div key={window} className="bg-[#20242c] rounded-xl p-4 border border-tv-border flex flex-col gap-2 shadow-sm">
							<div className="text-xs font-semibold text-tv-text-secondary mb-1 uppercase tracking-wide">{window} Ahead</div>
							<div className="flex items-end justify-between gap-2">
								<div>
									<div className="text-xl font-bold text-white">${p.predicted}</div>
									<div className={`text-xs font-semibold ${dirColor}`}>{p.changePct > 0 ? '+' : ''}{p.changePct}%</div>
								</div>
								<div className="text-right">
									<div className="text-[10px] text-tv-text-secondary">Conf.</div>
									<div className="text-xs font-bold text-tv-yellow">{p.confidence.toFixed(0)}%</div>
								</div>
							</div>
							{features.showAccuracy && (
								<div className="mt-1 text-[10px] text-tv-text-secondary">Akurasi Hist: 72% (demo)</div>
							)}
						</div>
					);
				})}
			</div>
			<div className="mt-4 p-2 rounded bg-yellow-900/20 text-[11px] text-yellow-400 text-center font-medium">
				<strong>Disclaimer:</strong> Bukan nasihat finansial. Prediksi berbasis model statistik sederhana (demo).
			</div>
		</div>
	);
};

export default PredictionCard;