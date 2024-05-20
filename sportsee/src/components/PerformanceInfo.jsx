import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

// Map des types de performance pour un affichage lisible
const kindMap = {
  1: 'Intensité',
  2: 'Vitesse',
  3: 'Force',
  4: 'Endurence',
  5: 'Energie',
  6:'Cardio'
};

// Composant pour afficher le graphique radar
const CustomRadarChart = ({ data }) => {
  return (
    <div style={{ width: '258px', height: '263px', backgroundColor: '#000000', padding: '20px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid radialLines={false} />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#FFFFFF', fontSize: 12, fontWeight: 500, fontFamily: 'Roboto' }} />
          <PolarRadiusAxis tick={false} axisLine={false} />
          <Radar name="Performance" dataKey="value" stroke="#FF0000" fill="#FF0000" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
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
    fullMark: 150, // Définissez une valeur maximale appropriée pour votre contexte
  }));

  return (
    <div>
      <CustomRadarChart data={formattedData} />
    </div>
  );
};

export default PerformanceInfo;
