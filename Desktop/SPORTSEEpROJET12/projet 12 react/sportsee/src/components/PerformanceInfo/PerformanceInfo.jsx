import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

// Map des types de performance pour un affichage lisible
const kindMap = {
  1: "Intensité",
  2: "Vitesse",
  3: "Force",
  4: "Endurance",
  5: "Énergie",
  6: "Cardio",
};

// Composant pour afficher le graphique radar
const CustomRadarChart = ({ data }) => {
  return (
    <div
      style={{
        width: "245px",
        height: "253px",
        backgroundColor: "#000000",
        padding:'5px',
        borderRadius: '7px'
       
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid gridType="polygon" radialLines={false} />
          <PolarAngleAxis
            dataKey="subject"
            tickLine={false}
            tick={{
              fill: "#FFFFFF",
              fontSize: 12,
              fontWeight: 500,
              fontFamily: "Roboto",
              transform: 'translate(0, 4)',
            }}
            label={{ position: "outside", offset: 20 }} // Ajout de padding pour éloigner les labels du graphique
            tickSize={15} // Ajuster cette valeur pour augmenter l'espace
          />
          <PolarRadiusAxis tick={false} axisLine={false} />
          <Radar
            name="Performance"
            dataKey="value"
            stroke="#FF0000"
            fill="#FF0000"
            fillOpacity={0.6}
          />
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
    fullMark: 150, // valeur maximale
  }));

  return (
    <div>
      <CustomRadarChart data={formattedData} />
    </div>
  );
};

export default PerformanceInfo;
