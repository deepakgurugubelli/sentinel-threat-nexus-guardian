
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Database, Server, Laptop, Cloud, Monitor } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AssetItem {
  id: string;
  name: string;
  type: string;
  status: 'secure' | 'warning' | 'vulnerable';
  lastScanned: string;
  icon: React.ReactNode;
}

const Assets = () => {
  const assets: AssetItem[] = [
    { 
      id: 'AS001', 
      name: 'Production Database Server', 
      type: 'Database Server', 
      status: 'secure', 
      lastScanned: '2025-04-11T14:32:00Z',
      icon: <Database className="h-4 w-4" />
    },
    { 
      id: 'AS002', 
      name: 'Web Application Server', 
      type: 'Application Server', 
      status: 'secure', 
      lastScanned: '2025-04-11T13:45:00Z',
      icon: <Server className="h-4 w-4" />
    },
    { 
      id: 'AS003', 
      name: 'Development Workstation', 
      type: 'Endpoint', 
      status: 'warning', 
      lastScanned: '2025-04-11T11:20:00Z',
      icon: <Laptop className="h-4 w-4" />
    },
    { 
      id: 'AS004', 
      name: 'Cloud Storage Bucket', 
      type: 'Cloud Resource', 
      status: 'secure', 
      lastScanned: '2025-04-11T10:15:00Z',
      icon: <Cloud className="h-4 w-4" />
    },
    { 
      id: 'AS005', 
      name: 'Internal Network Router', 
      type: 'Network Device', 
      status: 'warning', 
      lastScanned: '2025-04-11T09:10:00Z',
      icon: <Monitor className="h-4 w-4" />
    },
    { 
      id: 'AS006', 
      name: 'Backup Server', 
      type: 'Server', 
      status: 'vulnerable', 
      lastScanned: '2025-04-10T22:45:00Z',
      icon: <Server className="h-4 w-4" />
    }
  ];

  const getStatusColor = (status: AssetItem['status']) => {
    switch (status) {
      case 'secure':
        return 'bg-cyber-success/10 border-cyber-success/20 text-cyber-success';
      case 'warning':
        return 'bg-cyber-warning/10 border-cyber-warning/20 text-cyber-warning';
      case 'vulnerable':
        return 'bg-cyber-alert/10 border-cyber-alert/20 text-cyber-alert';
      default:
        return 'bg-cyber-accent/10 border-cyber-accent/20 text-cyber-accent';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Database className="h-6 w-6 text-cyber-accent" />
          <h1 className="text-2xl font-bold">Asset Inventory</h1>
        </div>
        <p className="text-muted-foreground">
          Manage and monitor your security assets
        </p>
      </div>
      
      <Card className="cyber-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-sm font-medium">Critical Assets</CardTitle>
            <CardDescription className="text-xs">
              Status and security posture of key assets
            </CardDescription>
          </div>
          <Badge>{assets.length} Assets</Badge>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-cyber-light/10 text-muted-foreground text-xs">
                  <th className="px-4 py-2 text-left font-medium">ID</th>
                  <th className="px-4 py-2 text-left font-medium">Asset</th>
                  <th className="px-4 py-2 text-left font-medium">Type</th>
                  <th className="px-4 py-2 text-left font-medium">Status</th>
                  <th className="px-4 py-2 text-left font-medium">Last Scanned</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset) => (
                  <tr key={asset.id} className="border-b border-cyber-light/5 hover:bg-cyber-light/5">
                    <td className="px-4 py-3 text-xs font-mono">{asset.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-cyber-light/10 p-1 rounded">
                          {asset.icon}
                        </div>
                        <span>{asset.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs">{asset.type}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={`text-xs ${getStatusColor(asset.status)}`}>
                        {asset.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs">{formatDate(asset.lastScanned)}</td>
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

export default Assets;
