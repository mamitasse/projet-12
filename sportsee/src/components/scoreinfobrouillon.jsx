import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { getUserById } from '../api';

const ScoreInfo = ({ userId }) => {
  const [score, setScore] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching score data...");
        const response = await getUserById(userId);
        console.log("Score data:", response.data);
        setScore(response.data.score);
      } catch (error) {
        console.error("Erreur lors de la récupération du score:", error);
        setError("Les informations de score ne sont pas disponibles.");
      }
    };

    fetchData();
  }, [userId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (score === null) {
    return <div>Chargement...</div>;
  }

  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 1 - score }
  ];

  const COLORS = ['#FF0000', '#EEEEEE']; // Rouge pour le score, gris pour le reste

  return (
    <div className="score-info">
      <h2>Score</h2>
      <ResponsiveContainer width="100%" height={400}>
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
            fill="#000"
          >
            <tspan
              style={{
                fontFamily: 'Roboto',
                fontSize: '26px',
                fontWeight: 700,
                lineHeight: '26px',
                textAlign: 'center',
                fill: '#FF0000',
               fill: '#000'
                
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
              de votre objectif
            </tspan>
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScoreInfo;
