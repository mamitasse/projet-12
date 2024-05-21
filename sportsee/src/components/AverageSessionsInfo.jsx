import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dayLabels = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{
        backgroundColor: '#ffffff',
        padding: '5px',
        border: '1px solid #ccc',
        textAlign: 'center',
        fontSize: '8px',
        fontWeight: '800',
        lineHeight: '24px',
        color: 'black',
        fontFamily: 'Roboto',
      }}>
        <p>{`${data.sessionLength} min`}</p>
      </div>
    );
  }
  return null;
};

const AverageSessionsInfo = ({ averageSessions }) => {
  console.log("Average Sessions Info:", averageSessions);

  if (!averageSessions || !averageSessions.length) {
    return <p>Les sessions moyennes ne sont pas disponibles.</p>;
  }

  // Créer une nouvelle liste avec les jours formatés
  const formattedSessions = averageSessions.map((item, index) => ({
    ...item,
    day: dayLabels[index],
  }));

  return (
    <div style={{ width: '279px', height: '283px', backgroundColor: '#FF0000', padding: '10px' }}>
      <h2 style={{ color: 'black', fontFamily: 'Roboto', fontSize: '15px', fontWeight: 'bold' ,color:'rgba(255, 255, 255, 0.8)'}}>Durée moyenne des <br /> sessions</h2>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={formattedSessions} margin={{ top: 0, right: 3, left: 3, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
          <XAxis 
            dataKey="day" 
            tick={{
              fill: 'rgba(255, 255, 255, 0.8)',
              fontFamily: 'Roboto',
              fontSize: 12,
              fontWeight: 500,
              lineHeight: '24px',
              textAlign: 'left'
            }} 
            axisLine={false} 
            tickLine={false} 
            tickMargin={1} // Add margin to ensure full visibility
            padding={{ left: 1, right: 1 }} // Add padding to ensure visibility of first and last ticks
          />
          <YAxis hide={true} />
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{ stroke: 'rgba(255, 0, 0, 0)', strokeWidth: 0 }} // This removes the vertical line
          />
          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="rgba(200, 200, 200, 0.8)"
            strokeWidth={3}  // Increase the thickness of the line
            dot={false}
            activeDot={{ r: 8, stroke: '#ffffff', fill: '#ffffff' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AverageSessionsInfo;
