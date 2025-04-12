
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Terminal, Play, Pause, RotateCw, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Automation {
  id: string;
  name: string;
  type: 'detection' | 'response' | 'remediation';
  status: 'active' | 'paused' | 'failed';
  triggers: number;
  lastRun: string;
  description: string;
}

const Automation = () => {
  const { toast } = useToast();
  
  const [automations, setAutomations] = useState<Automation[]>([
    {
      id: 'AUTO-001',
      name: 'Malicious IP Blocker',
      type: 'response',
      status: 'active',
      triggers: 127,
      lastRun: '2025-04-12T02:12:33Z',
      description: 'Automatically blocks connections from known malicious IPs identified in threat feeds.'
    },
    {
      id: 'AUTO-002',
      name: 'Email Phishing Scanner',
      type: 'detection',
      status: 'active',
      triggers: 432,
      lastRun: '2025-04-12T01:45:12Z',
      description: 'Scans incoming emails for phishing indicators and quarantines suspicious messages.'
    },
    {
      id: 'AUTO-003',
      name: 'Ransomware File Protection',
      type: 'response',
      status: 'paused',
      triggers: 56,
      lastRun: '2025-04-11T22:34:56Z',
      description: 'Blocks file encryption activities matching ransomware behavior patterns.'
    },
    {
      id: 'AUTO-004',
      name: 'Vulnerability Patch Deployment',
      type: 'remediation',
      status: 'failed',
      triggers: 18,
      lastRun: '2025-04-11T19:22:10Z',
      description: 'Automatically deploys critical security patches to vulnerable systems.'
    },
    {
      id: 'AUTO-005',
      name: 'Anomalous Login Detection',
      type: 'detection',
      status: 'active',
      triggers: 215,
      lastRun: '2025-04-12T00:08:45Z',
      description: 'Identifies login attempts from unusual locations or devices and enforces MFA.'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-cyber-success/10 border-cyber-success/20 text-cyber-success';
      case 'paused':
        return 'bg-amber-500/10 border-amber-500/20 text-amber-500';
      case 'failed':
        return 'bg-cyber-alert/10 border-cyber-alert/20 text-cyber-alert';
      default:
        return 'bg-cyber-accent/10 border-cyber-accent/20 text-cyber-accent';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'detection':
        return 'bg-cyber-accent/10 border-cyber-accent/20 text-cyber-accent';
      case 'response':
        return 'bg-cyber-warning/10 border-cyber-warning/20 text-cyber-warning';
      case 'remediation':
        return 'bg-cyber-success/10 border-cyber-success/20 text-cyber-success';
      default:
        return 'bg-cyber-accent/10 border-cyber-accent/20 text-cyber-accent';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const toggleAutomation = (id: string) => {
    setAutomations(prev => 
      prev.map(auto => {
        if (auto.id === id) {
          const newStatus = auto.status === 'active' ? 'paused' : 'active';
          
          toast({
            title: `Automation ${newStatus === 'active' ? 'Activated' : 'Paused'}`,
            description: `${auto.name} is now ${newStatus}`,
            variant: "default",
          });
          
          return { ...auto, status: newStatus as Automation['status'] };
        }
        return auto;
      })
    );
  };

  const retryAutomation = (id: string) => {
    setAutomations(prev => 
      prev.map(auto => {
        if (auto.id === id && auto.status === 'failed') {
          toast({
            title: `Retrying Automation`,
            description: `Attempting to restart ${auto.name}`,
            variant: "default",
          });
          
          return { ...auto, status: 'active' as Automation['status'] };
        }
        return auto;
      })
    );
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Terminal className="h-6 w-6 text-cyber-accent" />
          <h1 className="text-2xl font-bold">Security Automation</h1>
        </div>
        <p className="text-muted-foreground">
          Automated workflows for threat detection and response
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {automations.map((automation) => (
          <Card key={automation.id} className="cyber-card">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className={`text-xs ${getTypeColor(automation.type)}`}>
                  {automation.type}
                </Badge>
                <Badge variant="outline" className={`text-xs ${getStatusColor(automation.status)}`}>
                  {automation.status}
                </Badge>
              </div>
              <CardTitle className="text-sm font-medium">{automation.name}</CardTitle>
              <CardDescription className="text-xs">
                ID: {automation.id} • Triggers: {automation.triggers}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">{automation.description}</p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground">Last Run: {formatDate(automation.lastRun)}</span>
              </div>
              <div className="flex items-center gap-2">
                {automation.status !== 'failed' ? (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs flex-grow"
                    onClick={() => toggleAutomation(automation.id)}
                  >
                    {automation.status === 'active' ? (
                      <>
                        <Pause className="h-3.5 w-3.5 mr-1.5" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-3.5 w-3.5 mr-1.5" />
                        Activate
                      </>
                    )}
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs flex-grow text-cyber-alert border-cyber-alert/20"
                    onClick={() => retryAutomation(automation.id)}
                  >
                    <RotateCw className="h-3.5 w-3.5 mr-1.5" />
                    Retry
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default Automation;
