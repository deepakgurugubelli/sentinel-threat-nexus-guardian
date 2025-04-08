
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, AlertCircle, Info, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

type ThreatLevel = 'critical' | 'high' | 'medium' | 'low';

interface ThreatStatusCardProps {
  level: ThreatLevel;
  count: number;
  change?: number;
}

const ThreatStatusCard: React.FC<ThreatStatusCardProps> = ({ level, count, change }) => {
  const { toast } = useToast();

  const getIcon = () => {
    switch (level) {
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-cyber-alert" />;
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

  const handleViewDetails = () => {
    toast({
      title: `${getTitle()} Details`,
      description: `Viewing details for ${count} ${level} threat${count !== 1 ? 's' : ''}`,
      variant: level === 'critical' || level === 'high' ? 'destructive' : 'default',
    });
    console.log(`Viewing details for ${count} ${level} threats`);
  };

  return (
    <Card className="cyber-card hover:shadow-md transition-all duration-200 cursor-pointer" onClick={handleViewDetails}>
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
        <Button 
          variant="ghost" 
          size="sm" 
          className="mt-2 w-full flex items-center justify-center gap-1 text-xs" 
          onClick={(e) => {
            e.stopPropagation();
            handleViewDetails();
          }}
        >
          <span>View Details</span>
          <ExternalLink className="h-3 w-3" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ThreatStatusCard;
