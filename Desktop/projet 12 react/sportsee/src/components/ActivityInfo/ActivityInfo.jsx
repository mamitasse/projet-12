import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import './ActivityInfo.css'

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                width: '45px',
                height: '80px',
                backgroundColor: 'red',
                color: 'white',
                padding: '5px',
                borderRadius: '3px',
                textAlign: 'center',
                opacity: 0.9,
                fontFamily: 'Roboto',
                fontSize: '5px',
                fontWeight: 500,
                marginTop:"3px"
            }}>
                <p>{` ${payload.find(item => item.dataKey === 'kilogram')?.value}kg`}</p>
                <p>{` ${payload.find(item => item.dataKey === 'calories')?.value}kcal`}</p>
            </div>
        );
    }

    return null;
};

const ActivityInfo = ({ activity }) => {
    console.log("Activity Info:", activity);

    if (!activity || !activity.length) {
        return <p>Les activités ne sont pas disponibles.</p>;
    }

    // Créer une nouvelle liste avec les jours commençant à partir du jour 1
    const formattedActivity = activity.map((item, index) => ({
        ...item,
        day: index + 1,
    }));

    return (
        <div className="activityInfo" style={{ backgroundColor: 'rgba 251 251 251 1'}}>
            <div className='titreactivityinfo' style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                <span style={{ color: '#20253A', fontFamily: 'Roboto', fontSize: '15px', fontWeight: 'bold' }}>Activité quotidienne</span>
                <CustomLegend  />
            </div>
            <BarChart
                width={690}
                height={270}
                data={formattedActivity}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" 
                  horizontal={true} // Activer les lignes horizontales
                  vertical={false}/>
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis
                    yAxisId="left"
                    hide={true}
                />
                <YAxis
                    yAxisId="right"
                    orientation="right"
                    domain={[69, 'dataMax + 1']}
                    interval={0}
                    ticks={[...Array(Math.ceil(formattedActivity.reduce((max, p) => p.kilogram > max ? p.kilogram : max, 0)) - 68 + 1).keys()].map(i => i + 68)}
                    tickLine={false}
                    axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                    dataKey="kilogram"
                    fill="#000000"
                    name="Poids (kg)"
                    radius={[10, 10, 0, 0]}
                    barSize={10}
                    yAxisId="right"
                />
                <Bar
                    dataKey="calories"
                    fill="#FF0000"
                    name="Calories brûlées (kcal)"
                    radius={[10, 10, 0, 0]}
                    barSize={10}
                    yAxisId="left"
                />
            </BarChart>
        </div>
    );
};

const CustomLegend = () => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
             <span style={{ color: '#74798C',
 fontFamily: 'Roboto', fontSize: '14px', fontWeight: '500',display:'flex',flexDirection:'row', justifyContent:'space-between',alignItems:'center',marginRight:'10' }}>
            
            <svg height="10" width="10" style={{ marginRight: '5px' }}>
                <circle cx="4" cy="4" r="4" fill="#000000"  />
            </svg>
             Poids (kg)
        </span>
        <span style={{ color: '#74798C',
 fontFamily: 'Roboto', fontSize: '14px', fontWeight: '500',display:'flex',flexDirection:'row', justifyContent:'space-between',alignItems:'center' }}>
            
            <svg height="10" width="10" style={{ marginLeft: '10px' ,marginRight: '5px' }}>
                <circle cx="4" cy="4" r="4" fill="#FF0000" />
            </svg>
             Calories brûlées (kcal)
        </span>
    </div>
);

export default ActivityInfo;
