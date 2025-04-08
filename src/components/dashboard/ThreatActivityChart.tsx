
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const ThreatActivityChart = () => {
  // This data would typically come from your API
  const data = [
    { time: '00:00', threats: 12, anomalies: 5 },
    { time: '03:00', threats: 19, anomalies: 8 },
    { time: '06:00', threats: 15, anomalies: 7 },
    { time: '09:00', threats: 27, anomalies: 12 },
    { time: '12:00', threats: 35, anomalies: 19 },
    { time: '15:00', threats: 30, anomalies: 14 },
    { time: '18:00', threats: 24, anomalies: 10 },
    { time: '21:00', threats: 20, anomalies: 8 },
    { time: 'Now', threats: 25, anomalies: 11 },
  ];

  return (
    <Card className="cyber-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-sm font-medium">Threat Activity</CardTitle>
          <CardDescription className="text-xs">
            24-hour activity trend
          </CardDescription>
        </div>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[300px] w-full p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 10,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(51, 65, 85, 0.2)" />
              <XAxis 
                dataKey="time" 
                stroke="rgba(215, 220, 240, 0.3)" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="rgba(215, 220, 240, 0.3)" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => value.toString()}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(51, 65, 85, 0.5)',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: 'white',
                }} 
              />
              <Line
                type="monotone"
                dataKey="threats"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 1, fill: '#0f172a' }}
                activeDot={{ r: 5, strokeWidth: 0, fill: '#ef4444' }}
              />
              <Line
                type="monotone"
                dataKey="anomalies"
                stroke="#06b6d4"
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 1, fill: '#0f172a' }}
                activeDot={{ r: 5, strokeWidth: 0, fill: '#06b6d4' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="px-4 py-2 border-t border-cyber-light/10 flex items-center justify-center">
          <div className="flex items-center mr-4">
            <div className="h-2 w-2 rounded-full bg-cyber-alert mr-1.5"></div>
            <span className="text-xs">Threats</span>
          </div>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-cyber-accent mr-1.5"></div>
            <span className="text-xs">Anomalies</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThreatActivityChart;
