
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle, Eye, Calendar, Terminal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
  // This data would typically come from your API
  const threats: ThreatItem[] = [
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
  ];

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

  return (
    <Card className="cyber-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-sm font-medium">Recent Threats</CardTitle>
          <CardDescription className="text-xs">
            Last 24 hours threat activity
          </CardDescription>
        </div>
        <Shield className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-0">
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
              {threats.map((threat) => (
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
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
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
          <span className="text-xs text-muted-foreground">Showing 5 of 42 threats</span>
          <Button variant="link" size="sm" className="text-xs text-cyber-accent">
            View all threats
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentThreatsTable;
