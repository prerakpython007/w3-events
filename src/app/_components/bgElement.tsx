import React from 'react';

const Web3Background = () => {
  // Fewer crypto symbols
  const cryptoSymbols = [
    { symbol: "₿", name: "BTC", position: { top: '15%', left: '10%' }},
    { symbol: "Ξ", name: "ETH", position: { top: '75%', right: '15%' }},
    { symbol: "◈", name: "LINK", position: { top: '30%', right: '8%' }},
    { symbol: "✦", name: "SOL", position: { bottom: '20%', left: '12%' }},
  ];

  return (
    <div className="absolute top-0 left-0 w-full h-screen pointer-events-none overflow-hidden">
      {/* Randomly positioned crypto symbols */}
      {cryptoSymbols.map((crypto, i) => (
        <div
          key={crypto.name}
          className="absolute text-[#FFDCB5] opacity-30 text-3xl transform hover:scale-110 transition-transform"
          style={{
            ...crypto.position,
            animation: `float-random-${i} ${4 + i}s infinite ease-in-out`
          }}
        >
          {crypto.symbol}
        </div>
      ))}

      {/* Connected blockchain top-right */}
      <div className="absolute top-32 right-24">
        <svg width="200" height="40" viewBox="0 0 60 15">
          {[0, 1, 2].map((i) => (
            <g key={`block-${i}`}>
              {/* Connection line to next block */}
              {i < 2 && (
                <line
                  x1={i * 15 + 12}
                  y1="5"
                  x2={i * 15 + 15}
                  y2="5"
                  stroke="rgba(255, 220, 181, 0.3)"
                  strokeWidth="0.5"
                  strokeDasharray="1,1"
                >
                  <animate
                    attributeName="stroke-opacity"
                    values="0.3;0.5;0.3"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </line>
              )}
              {/* Block */}
              <path
                d={`M${i * 15},0 l10,0 l2,2 l0,6 l-2,2 l-10,0 l-2,-2 l0,-6 z`}
                fill="rgba(133, 71, 43, 0.15)"
                stroke="rgba(255, 220, 181, 0.3)"
                strokeWidth="0.5"
              >
                <animate
                  attributeName="stroke-opacity"
                  values="0.3;0.5;0.3"
                  dur={`${3 + i}s`}
                  repeatCount="indefinite"
                />
              </path>
            </g>
          ))}
        </svg>
      </div>

      {/* Connected blockchain bottom-left */}
      <div className="absolute bottom-32 left-24">
        <svg width="200" height="40" viewBox="0 0 60 15">
          {[0, 1, 2].map((i) => (
            <g key={`block-bottom-${i}`}>
              {/* Connection line to next block */}
              {i < 2 && (
                <line
                  x1={i * 15 + 12}
                  y1="5"
                  x2={i * 15 + 15}
                  y2="5"
                  stroke="rgba(255, 220, 181, 0.3)"
                  strokeWidth="0.5"
                  strokeDasharray="1,1"
                >
                  <animate
                    attributeName="stroke-opacity"
                    values="0.3;0.5;0.3"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </line>
              )}
              {/* Block */}
              <path
                d={`M${i * 15},0 l10,0 l2,2 l0,6 l-2,2 l-10,0 l-2,-2 l0,-6 z`}
                fill="rgba(133, 71, 43, 0.15)"
                stroke="rgba(255, 220, 181, 0.3)"
                strokeWidth="0.5"
              >
                <animate
                  attributeName="stroke-opacity"
                  values="0.3;0.5;0.3"
                  dur={`${3 + i}s`}
                  repeatCount="indefinite"
                />
              </path>
            </g>
          ))}
        </svg>
      </div>

      <style jsx>{`
        @keyframes float-random-0 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, 5px); }
        }
        @keyframes float-random-1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-8px, 8px); }
        }
        @keyframes float-random-2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(5px, -10px); }
        }
        @keyframes float-random-3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-10px, -5px); }
        }
      `}</style>
    </div>
  );
};

export default Web3Background;