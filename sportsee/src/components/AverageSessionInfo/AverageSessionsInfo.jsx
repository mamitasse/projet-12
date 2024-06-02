import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Rectangle } from 'recharts';

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

const CustomCursor = ({ points, width, height }) => {
  if (!points || points.length === 0) return null;
  const { x } = points[0];
  return (
    <Rectangle
      fill="rgba(255, 0, 0, 0.8)"
      x={x}
      y={0}
      width={width - x}
      height="100%"
    />
  );
};

const AverageSessionsInfo = ({ averageSessions }) => {
  if (!averageSessions || !averageSessions.length) {
    return <p>Les sessions moyennes ne sont pas disponibles.</p>;
  }

  const formattedSessions = averageSessions.map((item, index) => ({
    ...item,
    day: dayLabels[index],
  }));

  return (
    <div style={{ width: '279px', height: '283px', backgroundColor: '#FF0000', padding: '10px', position: 'relative',fontFamily: 'Roboto' }}>
      <h2 style={{ fontFamily: 'Roboto', fontSize: '15px', fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.8)' }}>
        Durée moyenne des <br /> sessions
      </h2>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart 
          data={formattedSessions} 
          margin={{ top: 0, right: 3, left: 3, bottom: 20 }}
        >
          <CartesianGrid 
            className="custom-cartesian-grid"
            strokeDasharray="3 3" 
            stroke="rgba(255, 255, 255, 0.2)"
          />
          <XAxis 
            dataKey="day" 
            tick={{
              fill: 'rgba(255, 255, 255, 0.8)',
              fontFamily: 'Roboto',
              fontSize: 12,
              fontWeight: 500,
              lineHeight: '24px',
              textAlign: 'left',
              height: 24,
            }} 
            axisLine={false} 
            tickLine={false} 
            tickMargin={1} 
            padding={{ left: 1, right: 1 }} 
          />
          <YAxis hide={true} />
          <Tooltip 
            content={<CustomTooltip />}
            cursor={<CustomCursor width={279} height={283} />} // Set the height to the full height of the container
          />
          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="rgba(200, 200, 200, 0.8)"
            strokeWidth={3} 
            dot={false}
            activeDot={{ r: 8, stroke: '#ffffff', fill: '#ffffff' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AverageSessionsInfo;
