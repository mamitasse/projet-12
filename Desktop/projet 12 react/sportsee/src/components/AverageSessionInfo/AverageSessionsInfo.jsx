import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from "recharts";

const dayLabels = ["L", "M", "M", "J", "V", "S", "D"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        style={{
          width: "38",
          height: "23",
          backgroundColor: "#ffffff",
          padding: "3px",
          border: "1px solid #ccc",
          textAlign: "center",
          lineHeight: "24px",

          zIndex: 2,
          position: "relative",
        }}
      >
        <p
          style={{
            fontSize: "8px",
            fontWeight: "500",
            width: "25",
            height: "24",
            fontFamily: "Roboto",
            color: "black",
          }}
        >{`${data.sessionLength} min`}</p>
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
      fill="rgba(0, 0, 0, 0.1)"
      x={x}
      y={0}
      width={width - x}
      height={height}
    />
  );
};
const AverageSessionsInfo = ({ averageSessions }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleMouseMove = (state) => {
    if (state.isTooltipActive) {
      setActiveIndex(state.activeTooltipIndex);
    } else {
      setActiveIndex(null);
    }
  };

  if (!averageSessions || !averageSessions.length) {
    return <p>Les sessions moyennes ne sont pas disponibles.</p>;
  }

  const formattedSessions = averageSessions.map((item, index) => ({
    ...item,
    day: dayLabels[index],
  }));

  return (
    <div
      className="averageDiv"
      style={{
        width: "245px",
        height: "253px",
        backgroundColor: "#FF0000",
        padding: "5px",
        borderRadius: "7px",

        position: "relative",
      }}
    >
      <h2
        style={{
          fontFamily: "Roboto",
          fontSize: "15px",
          fontWeight: "bold",
          color: "rgba(255, 255, 255, 0.8)",
        }}
      >
        Durée moyenne des <br /> sessions
      </h2>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          data={formattedSessions}
          margin={{ top: 0, right: 3, left: 3, bottom: 20 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <CartesianGrid
            className="custom-cartesian-grid"
            strokeDasharray="3 3"
            stroke="rgba(255, 255, 255, 0.2)"
          />
          <XAxis
            dataKey="day"
            tick={{
              fill: "rgba(255, 255, 255, 0.8)",
              fontFamily: "Roboto",
              fontSize: 12,
              fontWeight: 500,
              lineHeight: "24px",
              textAlign: "left",
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
            cursor={<CustomCursor width="100%" />}
          />
          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="rgba(200, 200, 200, 0.8)"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 8, stroke: "#ffffff", fill: "#ffffff" }}
          />
        </LineChart>
      </ResponsiveContainer>
      {activeIndex !== null && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: `${(activeIndex / (formattedSessions.length - 1)) * 100}%`,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      )}
    </div>
  );
};

export default AverageSessionsInfo;
