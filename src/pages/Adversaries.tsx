
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Users, User, Globe, Shield, Terminal } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Adversary {
  id: string;
  name: string;
  type: 'APT' | 'Hacktivist' | 'Cybercriminal' | 'Nation State' | 'Insider';
  threatLevel: 'critical' | 'high' | 'medium' | 'low';
  region: string;
  activeIndicators: number;
  lastActivity: string;
  description: string;
}

const Adversaries = () => {
  const { toast } = useToast();
  
  const adversaries: Adversary[] = [
    {
      id: 'ADV-001',
      name: 'Midnight Dragon',
      type: 'APT',
      threatLevel: 'critical',
      region: 'East Asia',
      activeIndicators: 32,
      lastActivity: '2025-04-11T04:23:11Z',
      description: 'Advanced persistent threat group targeting financial institutions and critical infrastructure.'
    },
    {
      id: 'ADV-002',
      name: 'Cobalt Spider',
      type: 'Cybercriminal',
      threatLevel: 'high',
      region: 'Eastern Europe',
      activeIndicators: 18,
      lastActivity: '2025-04-10T16:45:22Z',
      description: 'Financially motivated group specializing in ransomware attacks against healthcare organizations.'
    },
    {
      id: 'ADV-003',
      name: 'Silent Phantom',
      type: 'Nation State',
      threatLevel: 'critical',
      region: 'Middle East',
      activeIndicators: 27,
      lastActivity: '2025-04-09T12:12:05Z',
      description: 'State-sponsored threat actor focusing on intelligence gathering and espionage operations.'
    },
    {
      id: 'ADV-004',
      name: 'Binary Revolution',
      type: 'Hacktivist',
      threatLevel: 'medium',
      region: 'Global',
      activeIndicators: 14,
      lastActivity: '2025-04-08T21:37:42Z',
      description: 'Politically motivated hacktivist group known for website defacement and DDoS attacks.'
    },
    {
      id: 'ADV-005',
      name: 'Insider ER445',
      type: 'Insider',
      threatLevel: 'high',
      region: 'Internal',
      activeIndicators: 8,
      lastActivity: '2025-04-07T08:19:18Z',
      description: 'Disgruntled former employee with extensive system access and technical knowledge.'
    }
  ];

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-cyber-alert/10 border-cyber-alert/20 text-cyber-alert';
      case 'high':
        return 'bg-cyber-warning/10 border-cyber-warning/20 text-cyber-warning';
      case 'medium':
        return 'bg-amber-500/10 border-amber-500/20 text-amber-500';
      case 'low':
        return 'bg-blue-500/10 border-blue-500/20 text-blue-500';
      default:
        return 'bg-cyber-accent/10 border-cyber-accent/20 text-cyber-accent';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'APT':
        return <Terminal className="h-4 w-4 text-cyber-accent" />;
      case 'Hacktivist':
        return <Globe className="h-4 w-4 text-amber-500" />;
      case 'Cybercriminal':
        return <Shield className="h-4 w-4 text-cyber-warning" />;
      case 'Nation State':
        return <Globe className="h-4 w-4 text-cyber-alert" />;
      case 'Insider':
        return <User className="h-4 w-4 text-cyber-warning" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleTrackActivity = (adversary: Adversary) => {
    toast({
      title: `Tracking ${adversary.name}`,
      description: `Enhanced monitoring activated for ${adversary.type} threat actor`,
      variant: adversary.threatLevel === 'critical' ? 'destructive' : 'default',
    });
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Users className="h-6 w-6 text-cyber-accent" />
          <h1 className="text-2xl font-bold">Threat Actors</h1>
        </div>
        <p className="text-muted-foreground">
          Monitor and analyze adversaries targeting your organization
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {adversaries.map((adversary) => (
          <Card key={adversary.id} className="cyber-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-md ${
                  adversary.threatLevel === 'critical' ? 'bg-cyber-alert/10' :
                  adversary.threatLevel === 'high' ? 'bg-cyber-warning/10' :
                  'bg-cyber-accent/10'
                }`}>
                  {getTypeIcon(adversary.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-sm font-medium">{adversary.name}</CardTitle>
                    <Badge variant="outline" className={`text-xs ${getThreatLevelColor(adversary.threatLevel)}`}>
                      {adversary.threatLevel}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs">
                    {adversary.type} • {adversary.region} • ID: {adversary.id}
                  </CardDescription>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => handleTrackActivity(adversary)}
              >
                Track Activity
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">{adversary.description}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Last Activity: {formatDate(adversary.lastActivity)}</span>
                <span>{adversary.activeIndicators} Active Indicators</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default Adversaries;
