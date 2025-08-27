// SentimentChart.tsx (clean replacement)
import React from 'react';

interface SentimentChartProps {
    score: number; // -1 to 1
    frequency: 'daily' | 'realtime';
}

const SentimentChart: React.FC<SentimentChartProps> = ({ score, frequency }) => {
    const pct = (score + 1) / 2; // 0..1
    const angle = -180 + 180 * pct; // semicircle
    const label = score > 0.25 ? 'Bullish' : score < -0.25 ? 'Bearish' : 'Netral';
    const color = score > 0.25 ? 'text-tv-green' : score < -0.25 ? 'text-tv-red' : 'text-tv-yellow';

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-tv-text">Sentiment Sosial</h4>
                <span className={`text-xs font-medium ${color}`}>{label}</span>
            </div>
            <div className="relative w-full h-28">
                <svg viewBox="0 0 200 110" className="w-full h-full">
                    <defs>
                        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ef4444" />
                            <stop offset="50%" stopColor="#fbbf24" />
                            <stop offset="100%" stopColor="#22c55e" />
                        </linearGradient>
                    </defs>
                    <path d="M10 100 A90 90 0 0 1 190 100" fill="none" stroke="url(#gaugeGradient)" strokeWidth={16} strokeLinecap="round" />
                    <line x1="100" y1="100" x2={100 + 70 * Math.cos((angle * Math.PI)/180)} y2={100 + 70 * Math.sin((angle * Math.PI)/180)} stroke="white" strokeWidth={4} strokeLinecap="round" />
                    <circle cx="100" cy="100" r="6" fill="#1f2937" stroke="#64748b" strokeWidth={3} />
                    <text x="100" y="60" textAnchor="middle" className="fill-white" style={{ fontSize: 20, fontWeight: 600 }}>{(score*100).toFixed(0)}</text>
                    <text x="100" y="78" textAnchor="middle" className="fill-gray-400" style={{ fontSize: 10 }}>Skor</text>
                </svg>
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>Bearish</span><span>Netral</span><span>Bullish</span>
            </div>
            <p className="text-[10px] text-tv-text-secondary mt-2">Freq: {frequency === 'realtime' ? 'Real-time' : 'Daily'} (demo)</p>
        </div>
    );
};

export default SentimentChart;
