import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const ScoreInfo = ({ score }) => {
  if (score === null) {
    return <div>Chargement...</div>;
  }

  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 1 - score }
  ];

  const COLORS = ['#FF0000', '#EEEEEE']; // Rouge pour le score, gris pour le reste

  return (
    <div className="score-info" style={{ borderRadius: '7px', width: '258px', height: '263px', position: 'relative', backgroundColor: '#FBFBFB',padding:'15',boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.0212)'
  }}>
      <p style={{ position: 'absolute', top: '5%', left: '8%', transform: 'translate(-50%, -50%)', fontWeight: '600' }}>Score</p>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            startAngle={90}
            endAngle={450}
            innerRadius="70%"
            outerRadius="80%"
            dataKey="value"
            cornerRadius="50%" // Ajout de la propriété cornerRadius pour des bouts d'arc arrondis
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="score-text"
            fontSize="24"
            fill="#FF0000"
          >
            <tspan
              style={{
                fontFamily: 'Roboto',
                fontSize: '26px',
                fontWeight: 700,
                lineHeight: '26px',
                textAlign: 'center',
                fill: 'black',
              }}
            >
              {(score * 100).toFixed(0)}%
            </tspan>
            <tspan
              x="50%"
              dy="1.2em"
              style={{
                fontFamily: 'Roboto',
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: '26px',
                textAlign: 'center',
                fill: '#000'
              }}
            >
              de votre 
            </tspan>
            <tspan
              x="50%"
              dy="1.2em"
              style={{
                fontFamily: 'Roboto',
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: '26px',
                textAlign: 'center',
                fill: '#000'
              }}
            >objectif
            </tspan>
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScoreInfo;
