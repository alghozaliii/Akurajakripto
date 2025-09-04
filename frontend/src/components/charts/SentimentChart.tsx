// SentimentChart.tsx (clean replacement)
import React, { useState, useEffect } from 'react';

interface MLConfidenceMetric {
  score: number;   // 0-100 confidence score
  source: string;  // Model source (e.g., "LSTM", "BERT", etc)
  signals: {       // Key contributing signals
    keyword: number;      // Keyword analysis contribution (0-100)
    technical: number;    // Technical patterns contribution (0-100)
    social: number;       // Social media sentiment contribution (0-100)
    volume: number;       // Trading volume analysis contribution (0-100)
  }
}

interface SentimentChartProps {
    score: number;                // -1..1 current composite score
    frequency: 'daily' | 'realtime' | 'weekly';
    size?: 'sm' | 'md' | 'lg';
    history?: number[];           // optional last N normalized scores -1..1
    mlMetrics?: MLConfidenceMetric;  // Optional ML confidence metrics
    timeframe?: string;           // Optional timeframe label
}

const SentimentChart: React.FC<SentimentChartProps> = ({ 
    score, 
    frequency, 
    size='md', 
    history,
    mlMetrics,
    timeframe = '24h'
}) => {
    // Convert -1..1 to 0..100 for display
    const scorePercentage = Math.round((score + 1) * 50);
    
    // States for animation
    const [animatedScore, setAnimatedScore] = useState(0);
    const [showDetails, setShowDetails] = useState(false);
    
    // Calculate sentiment thresholds on a 0-100 scale
    const getSentimentLabel = (score: number) => {
        if (score >= 70) return { label: 'Sangat Bullish', color: '#15803d' };
        if (score >= 60) return { label: 'Bullish', color: '#22c55e' };
        if (score >= 45) return { label: 'Cenderung Positif', color: '#86efac' };
        if (score > 55) return { label: 'Netral+', color: '#a3e635' };
        if (score >= 45) return { label: 'Netral', color: '#eab308' };
        if (score >= 35) return { label: 'Netral-', color: '#fbbf24' };
        if (score >= 25) return { label: 'Cenderung Negatif', color: '#fb923c' };
        if (score >= 15) return { label: 'Bearish', color: '#ef4444' };
        return { label: 'Sangat Bearish', color: '#b91c1c' };
    };
    
    const sentiment = getSentimentLabel(scorePercentage);
    const pct = scorePercentage / 100; // 0..1 for gauge
    const angle = -180 + 180 * pct; // pointer angle
    
    // SVG parameters for gauge
    const radius = size === 'sm' ? 55 : size === 'lg' ? 90 : 72;
    const stroke = size === 'sm' ? 10 : size === 'lg' ? 18 : 14;
    const pointerLen = radius - (size==='sm'?12:16);
    const fontMain = size === 'sm' ? 14 : size === 'lg' ? 22 : 18;
    const fontSub = size === 'sm' ? 8 : 10;
    const viewWidth = radius*2 + 20;
    const viewHeight = radius + 25;
    const centerX = viewWidth/2;
    const centerY = radius + 10;
    
    // Process history data if available
    const hist = history && history.length ? history.slice(-14) : undefined;

    // Animation effect for gauge
    useEffect(() => {
        setAnimatedScore(0); // Reset to animate from start
        
        // Animate the gauge
        const timer = setTimeout(() => {
            const animationDuration = 1000; // 1 second
            const frameDuration = 16; // ~60fps
            const totalFrames = animationDuration / frameDuration;
            let frame = 0;
            
            const animate = () => {
                frame++;
                const progress = frame / totalFrames;
                const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease out
                setAnimatedScore(scorePercentage * easedProgress);
                
                if (frame < totalFrames) {
                    requestAnimationFrame(animate);
                }
            };
            
            requestAnimationFrame(animate);
        }, 200);
        
        return () => clearTimeout(timer);
    }, [scorePercentage]);

    // Calculate points for ML confidence visualization
    const getMLConfidencePoints = () => {
        if (!mlMetrics) return [];
        
        const signals = mlMetrics.signals;
        const points = [
            { name: 'Keyword', value: signals.keyword },
            { name: 'Technical', value: signals.technical },
            { name: 'Social', value: signals.social },
            { name: 'Volume', value: signals.volume }
        ];
        
        // Calculate polygon points for radar chart
        const angleBetween = (2 * Math.PI) / points.length;
        const center = 50;
        const maxRadius = 40;
        
        return points.map((point, i) => {
            const angle = i * angleBetween - Math.PI / 2;
            const radius = (point.value / 100) * maxRadius;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            return { ...point, x, y };
        });
    };
    
    // Convert animated score for gauge rendering
    const animatedPct = (animatedScore / 100);
    const mlPoints = getMLConfidencePoints();

    return (
        <div className={`sentiment-widget sentiment-${size}`}>      
            <div className="sentiment-head">
                <span className="sentiment-title">
                    Market Sentiment <span className="timeframe">({timeframe})</span>
                </span>
                <span className="sentiment-badge" 
                      style={{background:sentiment.color+'26', color:sentiment.color}}>
                    {sentiment.label}
                </span>
            </div>
            <div className="gauge-wrapper">
                <svg viewBox={`0 0 ${viewWidth} ${viewHeight}`} className="gauge-svg" 
                     role="img" aria-label={`Sentiment ${sentiment.label} skor ${scorePercentage}`}>          
                    <defs>
                        <linearGradient id="sentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#b91c1c"/>
                            <stop offset="25%" stopColor="#ef4444"/>
                            <stop offset="50%" stopColor="#fbbf24"/>
                            <stop offset="75%" stopColor="#22c55e"/>
                            <stop offset="100%" stopColor="#15803d"/>
                        </linearGradient>
                    </defs>
                    
                    {/* Gauge background */}
                    <path d={`M${centerX-radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX+radius} ${centerY}`} 
                          fill="none" stroke="url(#sentGradient)" strokeWidth={stroke} 
                          strokeLinecap="round" opacity="0.35" />
                    
                    {/* Active gauge segment */}
                    <path d={`M${centerX-radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + (radius*Math.cos(Math.PI * (1-animatedPct)))} ${centerY + (radius*Math.sin(Math.PI * (1-animatedPct)))}`} 
                          fill="none" stroke="url(#sentGradient)" strokeWidth={stroke} 
                          strokeLinecap="round" />
                    
                    {/* Gauge pointer */}
                    <line x1={centerX} y1={centerY} 
                          x2={centerX + pointerLen * Math.cos(angle * Math.PI/180)} 
                          y2={centerY + pointerLen * Math.sin(angle * Math.PI/180)} 
                          stroke="#fff" strokeWidth={size==='sm'?3:4} strokeLinecap="round" />
                    
                    {/* Center dot */}
                    <circle cx={centerX} cy={centerY} r={size==='sm'?5:6} 
                            fill="#1d2534" stroke="#475569" strokeWidth={3} />
                    
                    {/* Score text */}
                    <text x={centerX} y={centerY - (size==='lg'? radius*0.55 : radius*0.50)} 
                          textAnchor="middle" fill="#fff" fontSize={fontMain} fontWeight={600}>
                        {Math.round(animatedScore)}
                    </text>
                    <text x={centerX} y={centerY - (size==='lg'? radius*0.55 : radius*0.50) + (fontMain+10)} 
                          textAnchor="middle" fill="#94a3b8" fontSize={fontSub}>
                        Skor/100
                    </text>
                </svg>
                
                {/* Historical data mini-chart */}
                {hist && (
                    <div className="sentiment-history" aria-label="Riwayat singkat">
                        {hist.map((v,i) => {
                            const h = ( (v+1)/2 )*100; // 0-100
                            const scaledScore = Math.round((v + 1) * 50); // Convert to 0-100
                            const { color } = getSentimentLabel(scaledScore);
                            return (
                                <span 
                                    key={i} 
                                    style={{height:`${h}%`, background:color}} 
                                    title={`${scaledScore}/100 (${i+1} hari yang lalu)`}
                                />
                            );
                        })}
                    </div>
                )}
                
                {/* ML Confidence radar chart */}
                {mlMetrics && (
                    <div className={`ml-confidence ${showDetails ? 'show-detail' : ''}`} 
                         onClick={() => setShowDetails(!showDetails)}>
                        <div className="confidence-header">
                            <span>AI Confidence: {mlMetrics.score}%</span>
                            <span className="model-name">{mlMetrics.source}</span>
                        </div>
                        
                        <div className="radar-chart">
                            <svg viewBox="0 0 100 100" className="radar-svg">
                                {/* Background grid */}
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#2a3444" strokeWidth="0.5" />
                                <circle cx="50" cy="50" r="30" fill="none" stroke="#2a3444" strokeWidth="0.5" />
                                <circle cx="50" cy="50" r="20" fill="none" stroke="#2a3444" strokeWidth="0.5" />
                                <circle cx="50" cy="50" r="10" fill="none" stroke="#2a3444" strokeWidth="0.5" />
                                
                                <line x1="10" y1="50" x2="90" y2="50" stroke="#2a3444" strokeWidth="0.5" />
                                <line x1="50" y1="10" x2="50" y2="90" stroke="#2a3444" strokeWidth="0.5" />
                                
                                {/* Data points */}
                                <polygon 
                                    points={mlPoints.map(p => `${p.x},${p.y}`).join(' ')} 
                                    fill="rgba(59, 130, 246, 0.25)" 
                                    stroke="#3b82f6" 
                                    strokeWidth="1.5" 
                                />
                                
                                {/* Points */}
                                {mlPoints.map((point, i) => (
                                    <circle key={i} cx={point.x} cy={point.y} r="2" fill="#3b82f6" />
                                ))}
                            </svg>
                            
                            {/* Radar labels */}
                            <div className="radar-labels">
                                <span style={{top: '5%', left: '50%'}}>Technical</span>
                                <span style={{top: '50%', left: '95%'}}>Social</span>
                                <span style={{top: '95%', left: '50%'}}>Volume</span>
                                <span style={{top: '50%', left: '5%'}}>Keyword</span>
                            </div>
                        </div>
                        
                        {/* Detail section */}
                        <div className="confidence-detail">
                            <div className="confidence-bars">
                                {mlPoints.map((point, i) => (
                                    <div key={i} className="confidence-bar">
                                        <span className="bar-label">{point.name}</span>
                                        <div className="bar-track">
                                            <div className="bar-fill" style={{width: `${point.value}%`}} />
                                        </div>
                                        <span className="bar-value">{point.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            <div className="sentiment-scale">
                <span>0 (Bear)</span><span>50 (Netral)</span><span>100 (Bull)</span>
            </div>
            
            <div className="sentiment-meta">
                <span className="freq">
                    {frequency === 'realtime' ? 'Real-time' : frequency === 'weekly' ? 'Weekly' : 'Daily'}
                </span>
                <span className="value">{scorePercentage}/100</span>
            </div>
            
            <style>{`
                .sentiment-widget {width:100%;font-family:inherit;background:#161b26;border-radius:12px;padding:14px;border:1px solid #232836;}
                .sentiment-head {display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;}
                .sentiment-title {font-size:13px;font-weight:600;letter-spacing:.02em;color:#e2e8f0;}
                .sentiment-title .timeframe {font-weight:normal;color:#94a3b8;font-size:11px;}
                .sentiment-badge {font-size:12px;font-weight:600;padding:3px 8px;border-radius:999px;line-height:1;letter-spacing:.2px;}
                .gauge-wrapper {position:relative;display:flex;align-items:flex-end;justify-content:center;margin-top:10px;}
                .gauge-svg {width:100%;height:${size==='sm'?'90px':size==='lg'?'150px':'120px'};filter:drop-shadow(0 4px 6px rgba(0,0,0,0.25));}
                
                /* History chart */
                .sentiment-history {position:absolute;right:8px;bottom:8px;top:auto;display:flex;align-items:flex-end;gap:2px;height:45%;width:60px;background:rgba(15,23,42,0.4);border-radius:6px;padding:4px;border:1px solid rgba(51,65,85,0.5);}
                .sentiment-history span {flex:1;min-width:2px;border-radius:2px 2px 0 0;opacity:.9;transition:.2s;}
                .sentiment-history span:hover {opacity:1;filter:brightness(1.2);transform:scaleY(1.05);}
                
                /* ML Confidence visualization */
                .ml-confidence {position:absolute;left:8px;bottom:8px;width:60px;height:60px;background:#0f172a;border-radius:8px;overflow:hidden;cursor:pointer;transition:all 0.3s ease;border:1px solid #1e293b;}
                .ml-confidence.show-detail {width:200px;height:auto;}
                .confidence-header {font-size:10px;color:#94a3b8;padding:4px 6px;text-align:center;background:#1e293b;border-bottom:1px solid #334155;font-weight:500;}
                .model-name {display:block;font-size:8px;color:#64748b;margin-top:1px;}
                .radar-chart {position:relative;padding:5px;}
                .radar-svg {width:100%;height:auto;}
                .radar-labels {position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none;font-size:7px;color:#94a3b8;}
                .radar-labels span {position:absolute;transform:translate(-50%, -50%);text-shadow:0 0 3px #000;}
                
                /* ML Confidence detail */
                .confidence-detail {height:0;overflow:hidden;transition:height 0.3s ease;background:#131b2c;}
                .show-detail .confidence-detail {height:auto;padding:8px;}
                .confidence-bars {display:flex;flex-direction:column;gap:6px;}
                .confidence-bar {display:flex;align-items:center;gap:6px;font-size:9px;}
                .bar-label {color:#94a3b8;width:42px;text-align:right;}
                .bar-track {flex:1;height:5px;background:#1e293b;border-radius:3px;overflow:hidden;}
                .bar-fill {height:100%;background:linear-gradient(90deg,#3b82f6,#6366f1);border-radius:3px;}
                .bar-value {color:#e2e8f0;width:24px;}
                
                /* Scales and metadata */
                .sentiment-scale {display:flex;justify-content:space-between;font-size:10px;color:#64748b;margin-top:8px;letter-spacing:.02em;}
                .sentiment-meta {display:flex;justify-content:space-between;margin-top:6px;font-size:11px;color:#64748b;border-top:1px solid #232836;padding-top:6px;}
                .sentiment-meta .value {color:#e2e8f0;font-weight:600;}
                
                /* Responsive size adjustments */
                .sentiment-widget.sentiment-sm .sentiment-badge {font-size:10px;padding:2px 6px;}
                .sentiment-widget.sentiment-lg .sentiment-badge {font-size:13px;padding:3px 10px;}
                .sentiment-widget.sentiment-lg .sentiment-title {font-size:14px;}
                
                @media (max-width: 480px) {
                    .ml-confidence {left:4px;bottom:4px;width:50px;height:50px;}
                    .ml-confidence.show-detail {width:180px;}
                    .sentiment-history {right:4px;bottom:4px;}
                }
            `}</style>
        </div>
    );
};

export default SentimentChart;
