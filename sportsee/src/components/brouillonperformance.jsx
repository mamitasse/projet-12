import React from 'react';
import { Radar, RadarChart, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const kindMap = {
  1: 'Intensité',
  2: 'Vitesse',
  3: 'Force',
  4: 'Endurance',
  5: 'Énergie',
  6: 'Cardio'
};

// Composant pour afficher le graphique radar avec une grille personnalisée
const CustomRadarChart = ({ data }) => {
  // Fonction pour dessiner une grille personnalisée avec cinq hexagones
  const renderCustomGrid = () => {
    const layers = [];
    const centerX = 128;
    const centerY = 131.5;
    const radiusIncrement = 25;
    const numberOfLayers = 5;

    for (let i = 1; i <= numberOfLayers; i++) {
      const radius = i === 1 ? radiusIncrement / 2 : radiusIncrement * i;
      const points = [];
      for (let j = 0; j < 6; j++) {
        const angle = (Math.PI / 3) * j - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        points.push(`${x},${y}`);
      }
      layers.push(
        <polygon
          key={i}
          points={points.join(' ')}
          fill="none"
          stroke="#fff"
          strokeOpacity={0.2}
        />
      );
    }

    return layers;
  };

  return (
    <div style={{ width: '258px', height: '263px', backgroundColor: '#000000', padding: '20px', position: 'relative' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#FFFFFF', fontSize: 12, fontWeight: 500, fontFamily: 'Roboto',padding:'50' }} />
          <PolarRadiusAxis tick={false} axisLine={false} />
          <Radar name="Performance" dataKey="value" stroke="#FF0000" fill="#FF0000" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        {renderCustomGrid()}
      </svg>
    </div>
  );
};

// Composant principal pour afficher les informations de performance
const PerformanceInfo = ({ performance }) => {
  console.log("Performance Info:", performance);
  if (!performance || !performance.length) {
    return <p>Les performances ne sont pas disponibles.</p>;
  }

  const formattedData = performance.map((item) => ({
    subject: kindMap[item.kind],
    value: item.value,
    fullMark: 150,
  }));

  return (
    <div>
      <CustomRadarChart data={formattedData} />
    </div>
  );
};

export default PerformanceInfo;
