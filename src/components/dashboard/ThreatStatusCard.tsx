
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';

type ThreatLevel = 'critical' | 'high' | 'medium' | 'low';

interface ThreatStatusCardProps {
  level: ThreatLevel;
  count: number;
  change?: number;
}

const ThreatStatusCard: React.FC<ThreatStatusCardProps> = ({ level, count, change }) => {
  const getIcon = () => {
    switch (level) {
      case 'critical':
        return <Alert className="h-5 w-5 text-cyber-alert" />;
      case 'high':
        return <AlertCircle className="h-5 w-5 text-cyber-warning" />;
      case 'medium':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'low':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-cyber-success" />;
    }
  };

  const getTitle = () => {
    return `${level.charAt(0).toUpperCase() + level.slice(1)} Threats`;
  };

  const getColor = () => {
    switch (level) {
      case 'critical':
        return 'text-cyber-alert';
      case 'high':
        return 'text-cyber-warning';
      case 'medium':
        return 'text-amber-500';
      case 'low':
        return 'text-blue-500';
      default:
        return 'text-cyber-success';
    }
  };

  return (
    <Card className="cyber-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{getTitle()}</CardTitle>
        {getIcon()}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1">
          <span className={getColor()}>{count}</span>
        </div>
        {change !== undefined && (
          <p className="text-xs text-muted-foreground flex items-center">
            {change > 0 ? (
              <>
                <span className="text-cyber-alert mr-1">↑</span>
                <span>{Math.abs(change)}% increase from last week</span>
              </>
            ) : change < 0 ? (
              <>
                <span className="text-cyber-success mr-1">↓</span>
                <span>{Math.abs(change)}% decrease from last week</span>
              </>
            ) : (
              <span>No change from last week</span>
            )}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ThreatStatusCard;
