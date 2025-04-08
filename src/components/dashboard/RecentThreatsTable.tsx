
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle, Eye, Calendar, Terminal, Filter, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ThreatItem {
  id: string;
  name: string;
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  timestamp: string;
  source: string;
  status: 'active' | 'mitigated' | 'investigating';
}

const RecentThreatsTable = () => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [filter, setFilter] = useState<string | null>(null);
  
  // This data would typically come from your API
  const [threats, setThreats] = useState<ThreatItem[]>([
    {
      id: 'TH-7829',
      name: 'SolarWinds Supply Chain',
      type: 'APT Campaign',
      severity: 'critical',
      timestamp: '2025-04-08T08:23:11Z',
      source: 'External Feed',
      status: 'active'
    },
    {
      id: 'TH-7830',
      name: 'Emotet Malware Variant',
      type: 'Malware',
      severity: 'high',
      timestamp: '2025-04-08T07:45:22Z',
      source: 'Network Monitor',
      status: 'investigating'
    },
    {
      id: 'TH-7831',
      name: 'Zero-day Exploit CVE-2025-1234',
      type: 'Vulnerability',
      severity: 'critical',
      timestamp: '2025-04-08T06:12:05Z',
      source: 'Threat Intel',
      status: 'investigating'
    },
    {
      id: 'TH-7832',
      name: 'Brute Force Attempt',
      type: 'Attack',
      severity: 'medium',
      timestamp: '2025-04-08T05:37:42Z',
      source: 'Firewall Logs',
      status: 'mitigated'
    },
    {
      id: 'TH-7833',
      name: 'Phishing Campaign',
      type: 'Social Engineering',
      severity: 'high',
      timestamp: '2025-04-08T04:19:18Z',
      source: 'Email Gateway',
      status: 'active'
    }
  ]);

  const filteredThreats = filter 
    ? threats.filter(threat => 
        threat.severity === filter || 
        threat.status === filter || 
        threat.type.toLowerCase().includes(filter.toLowerCase()))
    : threats;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-cyber-alert/10 border-cyber-alert/20 text-cyber-alert';
      case 'investigating':
        return 'bg-cyber-warning/10 border-cyber-warning/20 text-cyber-warning';
      case 'mitigated':
        return 'bg-cyber-success/10 border-cyber-success/20 text-cyber-success';
      default:
        return 'bg-cyber-accent/10 border-cyber-accent/20 text-cyber-accent';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const refreshThreats = () => {
    setIsRefreshing(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      // Add a new random threat
      const newThreatTypes = ['APT Campaign', 'Malware', 'Vulnerability', 'Attack', 'Social Engineering', 'Insider Threat'];
      const randomType = newThreatTypes[Math.floor(Math.random() * newThreatTypes.length)];
      
      const newThreatNames = [
        'Cobalt Strike Beacon', 
        'Log4j Exploitation', 
        'SSH Credential Stuffing', 
        'DDoS Attack', 
        'Supply Chain Compromise'
      ];
      const randomName = newThreatNames[Math.floor(Math.random() * newThreatNames.length)];
      
      const severities: ThreatItem['severity'][] = ['critical', 'high', 'medium', 'low'];
      const randomSeverity = severities[Math.floor(Math.random() * severities.length)];
      
      const sources = ['Threat Intel', 'EDR System', 'Network Monitor', 'External Feed', 'Email Gateway'];
      const randomSource = sources[Math.floor(Math.random() * sources.length)];
      
      const statuses: ThreatItem['status'][] = ['active', 'investigating', 'mitigated'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      const newId = `TH-${7834 + Math.floor(Math.random() * 100)}`;
      
      const newThreat: ThreatItem = {
        id: newId,
        name: randomName,
        type: randomType,
        severity: randomSeverity,
        timestamp: new Date().toISOString(),
        source: randomSource,
        status: randomStatus
      };
      
      setThreats(prevThreats => {
        const updatedThreats = [newThreat, ...prevThreats.slice(0, 4)];
        return updatedThreats;
      });
      
      setIsRefreshing(false);
      
      toast({
        title: "Threats Updated",
        description: `New threat detected: ${randomName}`,
        variant: randomSeverity === 'critical' || randomSeverity === 'high' ? 'destructive' : 'default',
      });
    }, 1000);
  };

  const handleViewDetails = (threat: ThreatItem) => {
    toast({
      title: `Threat Details: ${threat.id}`,
      description: `Viewing detailed information for ${threat.name}`,
      variant: threat.severity === 'critical' || threat.severity === 'high' ? 'destructive' : 'default',
    });
    console.log(`Viewing details for threat: ${threat.id}`);
  };

  const handleMitigate = (threat: ThreatItem) => {
    if (threat.status === 'mitigated') {
      toast({
        title: "Already Mitigated",
        description: `This threat has already been mitigated.`,
        variant: "default",
      });
      return;
    }

    setThreats(prevThreats => 
      prevThreats.map(t => 
        t.id === threat.id 
          ? { ...t, status: 'mitigated' } 
          : t
      )
    );
    
    toast({
      title: "Threat Mitigated",
      description: `Successfully mitigated threat: ${threat.name}`,
      variant: "default",
    });
    
    console.log(`Mitigated threat: ${threat.id}`);
  };

  const handleFilterClick = (filterValue: string) => {
    setFilter(currentFilter => currentFilter === filterValue ? null : filterValue);
  };

  return (
    <Card className="cyber-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-sm font-medium">Recent Threats</CardTitle>
          <CardDescription className="text-xs">
            Last 24 hours threat activity
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7" 
            onClick={refreshThreats}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-7 w-7 ${filter ? 'bg-cyber-accent/20' : ''}`} 
            onClick={() => setFilter(null)}
            disabled={!filter}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="px-4 py-2 border-b border-cyber-light/10 flex flex-wrap gap-2">
          <Badge 
            variant="outline" 
            className={`text-xs cursor-pointer ${filter === 'critical' ? 'bg-cyber-alert/20' : 'bg-transparent'}`}
            onClick={() => handleFilterClick('critical')}
          >
            Critical
          </Badge>
          <Badge 
            variant="outline" 
            className={`text-xs cursor-pointer ${filter === 'high' ? 'bg-cyber-warning/20' : 'bg-transparent'}`}
            onClick={() => handleFilterClick('high')}
          >
            High
          </Badge>
          <Badge 
            variant="outline" 
            className={`text-xs cursor-pointer ${filter === 'active' ? 'bg-cyber-alert/20' : 'bg-transparent'}`}
            onClick={() => handleFilterClick('active')}
          >
            Active
          </Badge>
          <Badge 
            variant="outline" 
            className={`text-xs cursor-pointer ${filter === 'investigating' ? 'bg-cyber-warning/20' : 'bg-transparent'}`}
            onClick={() => handleFilterClick('investigating')}
          >
            Investigating
          </Badge>
          <Badge 
            variant="outline" 
            className={`text-xs cursor-pointer ${filter === 'mitigated' ? 'bg-cyber-success/20' : 'bg-transparent'}`}
            onClick={() => handleFilterClick('mitigated')}
          >
            Mitigated
          </Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cyber-light/10 text-muted-foreground text-xs">
                <th className="px-4 py-2 text-left font-medium">ID</th>
                <th className="px-4 py-2 text-left font-medium">Threat</th>
                <th className="px-4 py-2 text-left font-medium">Type</th>
                <th className="px-4 py-2 text-left font-medium">Severity</th>
                <th className="px-4 py-2 text-left font-medium">Time</th>
                <th className="px-4 py-2 text-left font-medium">Source</th>
                <th className="px-4 py-2 text-left font-medium">Status</th>
                <th className="px-4 py-2 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredThreats.map((threat) => (
                <tr key={threat.id} className="border-b border-cyber-light/5 hover:bg-cyber-light/5">
                  <td className="px-4 py-3 text-xs font-mono">{threat.id}</td>
                  <td className="px-4 py-3">{threat.name}</td>
                  <td className="px-4 py-3 text-xs">{threat.type}</td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className={`text-xs ${getSeverityColor(threat.severity)}`}>
                      {threat.severity}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-xs">{formatDate(threat.timestamp)}</td>
                  <td className="px-4 py-3 text-xs">{threat.source}</td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className={`text-xs ${getStatusColor(threat.status)}`}>
                      {threat.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7"
                        onClick={() => handleViewDetails(threat)}
                        title="View Details"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={`h-7 w-7 ${threat.status === 'mitigated' ? 'opacity-50' : ''}`}
                        onClick={() => handleMitigate(threat)}
                        title="Mitigate Threat"
                      >
                        <Terminal className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-cyber-light/10 flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Showing {filteredThreats.length} of {filter ? threats.length : 42} threats</span>
          <Button variant="link" size="sm" className="text-xs text-cyber-accent">
            View all threats
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentThreatsTable;
