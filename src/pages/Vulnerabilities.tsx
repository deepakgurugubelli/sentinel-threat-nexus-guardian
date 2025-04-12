
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Globe, AlertCircle, ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Vulnerability {
  id: string;
  cve: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'in progress' | 'patched';
  affectedAssets: number;
  discoveredDate: string;
}

const Vulnerabilities = () => {
  const { toast } = useToast();
  
  const vulnerabilities: Vulnerability[] = [
    {
      id: 'VUL-001',
      cve: 'CVE-2025-1234',
      title: 'Remote Code Execution in Web Server',
      severity: 'critical',
      status: 'open',
      affectedAssets: 3,
      discoveredDate: '2025-04-10T08:23:11Z'
    },
    {
      id: 'VUL-002',
      cve: 'CVE-2025-5678',
      title: 'SQL Injection in Authentication Module',
      severity: 'high',
      status: 'in progress',
      affectedAssets: 2,
      discoveredDate: '2025-04-09T14:12:05Z'
    },
    {
      id: 'VUL-003',
      cve: 'CVE-2025-9101',
      title: 'Cross-Site Scripting in Admin Panel',
      severity: 'medium',
      status: 'in progress',
      affectedAssets: 1,
      discoveredDate: '2025-04-08T11:45:22Z'
    },
    {
      id: 'VUL-004',
      cve: 'CVE-2025-1122',
      title: 'Default Credentials in Network Device',
      severity: 'high',
      status: 'open',
      affectedAssets: 5,
      discoveredDate: '2025-04-07T16:33:40Z'
    },
    {
      id: 'VUL-005',
      cve: 'CVE-2025-3344',
      title: 'Unpatched Software Version',
      severity: 'medium',
      status: 'patched',
      affectedAssets: 8,
      discoveredDate: '2025-04-06T09:17:33Z'
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
      case 'open':
        return 'bg-cyber-alert/10 border-cyber-alert/20 text-cyber-alert';
      case 'in progress':
        return 'bg-cyber-warning/10 border-cyber-warning/20 text-cyber-warning';
      case 'patched':
        return 'bg-cyber-success/10 border-cyber-success/20 text-cyber-success';
      default:
        return 'bg-cyber-accent/10 border-cyber-accent/20 text-cyber-accent';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleRemediateClick = (vuln: Vulnerability) => {
    toast({
      title: `Remediation Started for ${vuln.cve}`,
      description: `Initiating remediation process for ${vuln.title}`,
      variant: "default",
    });
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <ShieldAlert className="h-6 w-6 text-cyber-accent" />
          <h1 className="text-2xl font-bold">Vulnerabilities</h1>
        </div>
        <p className="text-muted-foreground">
          Track and remediate security vulnerabilities across assets
        </p>
      </div>
      
      <Card className="cyber-card mb-4">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-sm font-medium">Active Vulnerabilities</CardTitle>
            <CardDescription className="text-xs">
              Prioritized list of vulnerabilities requiring attention
            </CardDescription>
          </div>
          <Badge className="bg-cyber-alert">{vulnerabilities.filter(v => v.status !== 'patched').length} Active</Badge>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-cyber-light/10 text-muted-foreground text-xs">
                  <th className="px-4 py-2 text-left font-medium">ID</th>
                  <th className="px-4 py-2 text-left font-medium">CVE</th>
                  <th className="px-4 py-2 text-left font-medium">Title</th>
                  <th className="px-4 py-2 text-left font-medium">Severity</th>
                  <th className="px-4 py-2 text-left font-medium">Status</th>
                  <th className="px-4 py-2 text-left font-medium">Assets</th>
                  <th className="px-4 py-2 text-left font-medium">Discovered</th>
                  <th className="px-4 py-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vulnerabilities.map((vuln) => (
                  <tr key={vuln.id} className="border-b border-cyber-light/5 hover:bg-cyber-light/5">
                    <td className="px-4 py-3 text-xs font-mono">{vuln.id}</td>
                    <td className="px-4 py-3 text-xs font-mono">{vuln.cve}</td>
                    <td className="px-4 py-3">{vuln.title}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={`text-xs ${getSeverityColor(vuln.severity)}`}>
                        {vuln.severity}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={`text-xs ${getStatusColor(vuln.status)}`}>
                        {vuln.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-center">{vuln.affectedAssets}</td>
                    <td className="px-4 py-3 text-xs">{formatDate(vuln.discoveredDate)}</td>
                    <td className="px-4 py-3">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs" 
                        onClick={() => handleRemediateClick(vuln)}
                        disabled={vuln.status === 'patched'}
                      >
                        Remediate
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Vulnerabilities;
