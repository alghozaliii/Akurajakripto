import React from 'react';

interface MetricCardProps {
	title: string;
	value: string | number;
	subtitle?: string;
	signal?: 'BUY' | 'SELL' | 'NEUTRAL';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, subtitle, signal }) => {
	const color = signal === 'BUY' ? 'text-tv-green' : signal === 'SELL' ? 'text-tv-red' : 'text-tv-yellow';
	return (
		<div className="tv-card p-4">
			<div className="flex items-center justify-between mb-1">
				<h4 className="text-xs font-medium text-tv-text-secondary tracking-wide uppercase">{title}</h4>
				{signal && <span className={`text-[10px] font-semibold ${color}`}>{signal}</span>}
			</div>
			<div className="text-xl font-bold text-white">{value}</div>
			{subtitle && <div className="text-[11px] text-tv-text-secondary mt-1">{subtitle}</div>}
		</div>
	);
};

export default MetricCard;