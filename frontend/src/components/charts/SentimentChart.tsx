// SentimentChart.tsx (clean replacement)
import React from 'react';

interface SentimentChartProps {
    score: number; // -1..1 current composite score
    frequency: 'daily' | 'realtime';
    size?: 'sm' | 'md' | 'lg';
    history?: number[]; // optional last N normalized scores -1..1
}

const SentimentChart: React.FC<SentimentChartProps> = ({ score, frequency, size='md', history }) => {
    const pct = (score + 1) / 2; // 0..1
    const angle = -180 + 180 * pct; // pointer
    const label = score > 0.3 ? 'Bullish' : score < -0.3 ? 'Bearish' : 'Netral';
    const labelColor = score > 0.3 ? '#22c55e' : score < -0.3 ? '#ef4444' : '#eab308';
    const radius = size === 'sm' ? 55 : size === 'lg' ? 90 : 72;
    const stroke = size === 'sm' ? 10 : size === 'lg' ? 18 : 14;
    const pointerLen = radius - (size==='sm'?12:16);
    const fontMain = size === 'sm' ? 14 : size === 'lg' ? 22 : 18;
    const fontSub = size === 'sm' ? 8 : 10;
    const viewWidth = radius*2 + 20;
    const viewHeight = radius + 25;
    const centerX = viewWidth/2;
    const centerY = radius + 10;
    const hist = history && history.length ? history.slice(-14) : undefined;

    return (
        <div className={`sentiment-widget sentiment-${size}`}>      
            <div className="sentiment-head">
                <span className="sentiment-title">Sentiment</span>
                <span className="sentiment-badge" style={{background:labelColor+'26',color:labelColor}}>{label}</span>
            </div>
            <div className="gauge-wrapper">
                <svg viewBox={`0 0 ${viewWidth} ${viewHeight}`} className="gauge-svg" role="img" aria-label={`Sentiment ${label} skor ${(score*100).toFixed(0)}`}>          
                    <defs>
                        <linearGradient id="sentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ef4444"/>
                            <stop offset="50%" stopColor="#fbbf24"/>
                            <stop offset="100%" stopColor="#22c55e"/>
                        </linearGradient>
                    </defs>
                    <path d={`M${centerX-radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX+radius} ${centerY}`} fill="none" stroke="url(#sentGradient)" strokeWidth={stroke} strokeLinecap="round" opacity="0.35" />
                    <path d={`M${centerX-radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + (radius*Math.cos(Math.PI * (1-pct)))} ${centerY + (radius*Math.sin(Math.PI * (1-pct)))}`} fill="none" stroke="url(#sentGradient)" strokeWidth={stroke} strokeLinecap="round" />
                    <line x1={centerX} y1={centerY} x2={centerX + pointerLen * Math.cos(angle * Math.PI/180)} y2={centerY + pointerLen * Math.sin(angle * Math.PI/180)} stroke="#fff" strokeWidth={size==='sm'?3:4} strokeLinecap="round" />
                    <circle cx={centerX} cy={centerY} r={size==='sm'?5:6} fill="#1d2534" stroke="#475569" strokeWidth={3} />
                    <text x={centerX} y={centerY - (size==='lg'? radius*0.55 : radius*0.50)} textAnchor="middle" fill="#fff" fontSize={fontMain} fontWeight={600}>{(score*100).toFixed(0)}</text>
                    <text x={centerX} y={centerY - (size==='lg'? radius*0.55 : radius*0.50) + (fontMain+10)} textAnchor="middle" fill="#94a3b8" fontSize={fontSub}>Skor</text>
                </svg>
                {hist && (
                    <div className="sentiment-history" aria-label="Riwayat singkat">
                        {hist.map((v,i) => {
                            const h = ( (v+1)/2 )*100; // 0-100
                            const bg = v>0.25? '#16a34a' : v<-0.25? '#dc2626' : '#eab308';
                            return <span key={i} style={{height:`${h}%`, background:bg}} title={`${(v*100).toFixed(0)}%`}/>;
                        })}
                    </div>
                )}
            </div>
            <div className="sentiment-scale">
                <span>Bear</span><span>Netral</span><span>Bull</span>
            </div>
            <div className="sentiment-meta">
                <span className="freq">{frequency === 'realtime' ? 'Real-time' : 'Daily'}</span>
                <span className="value">{(score*100).toFixed(1)}%</span>
            </div>
            <style>{`
                .sentiment-widget {width:100%;font-family:inherit;}
                .sentiment-head {display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;}
                .sentiment-title {font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#94a3b8;}
                .sentiment-badge {font-size:11px;font-weight:600;padding:2px 8px;border-radius:999px;line-height:1;letter-spacing:.5px;}
                .gauge-wrapper {position:relative;display:flex;align-items:flex-end;justify-content:center;}
                .gauge-svg {width:100%;height:${size==='sm'?'90px':size==='lg'?'150px':'120px'};}
                .sentiment-history {position:absolute;right:4px;bottom:4px;top:auto;display:flex;align-items:flex-end;gap:2px;height:40%;width:56px;}
                .sentiment-history span {flex:1;min-width:3px;border-radius:2px;opacity:.85;transition:.3s;}
                .sentiment-history span:hover {opacity:1;filter:brightness(1.15);}        
                .sentiment-scale {display:flex;justify-content:space-between;font-size:9px;color:#64748b;margin-top:2px;letter-spacing:.05em;}
                .sentiment-meta {display:flex;justify-content:space-between;margin-top:4px;font-size:10px;color:#64748b;}
                .sentiment-meta .value {color:#e2e8f0;font-weight:600;}
                .sentiment-widget.sentiment-sm .sentiment-badge {font-size:10px;padding:2px 6px;}
            `}</style>
        </div>
    );
};

export default SentimentChart;
