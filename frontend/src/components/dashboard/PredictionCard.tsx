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
		<div className="tv-card">
			<div className="flex items-center justify-between mb-3">
				<h4 className="text-sm font-semibold text-tv-text">Prediksi {symbol}</h4>
				<span className="text-[10px] text-tv-text-secondary">Demo</span>
			</div>
			<div className="grid grid-cols-2 gap-3">
				{features.predictionWindows.map(window => {
					const p = mockPredict(basePrice, window);
					const dirColor = p.changePct > 0 ? 'text-tv-green' : 'text-tv-red';
					return (
						<div key={window} className="bg-tv-bg rounded p-3 border border-tv-border">
							<div className="text-xs font-medium text-tv-text-secondary mb-1">{window} Ahead</div>
							<div className="flex items-end justify-between">
								<div>
									<div className="text-lg font-semibold text-white">${p.predicted}</div>
									<div className={`text-xs font-medium ${dirColor}`}>{p.changePct > 0 ? '+' : ''}{p.changePct}%</div>
								</div>
								<div className="text-right">
									<div className="text-[10px] text-tv-text-secondary">Conf.</div>
									<div className="text-xs font-semibold text-tv-yellow">{p.confidence.toFixed(0)}%</div>
								</div>
							</div>
							{features.showAccuracy && (
								<div className="mt-2 text-[10px] text-tv-text-secondary">Akurasi Hist: 72% (demo)</div>
							)}
						</div>
					);
				})}
			</div>
			<p className="mt-3 text-[10px] leading-snug text-gray-400">Bukan nasihat finansial. Prediksi berbasis model statistik sederhana (demo).</p>
		</div>
	);
};

export default PredictionCard;