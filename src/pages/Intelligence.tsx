
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Search, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ThreatFeed from '@/components/dashboard/ThreatFeed';
import { Badge } from '@/components/ui/badge';

const Intelligence = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Search className="h-6 w-6 text-cyber-accent" />
          <h1 className="text-2xl font-bold">Threat Intelligence</h1>
        </div>
        <p className="text-muted-foreground">
          Analyze and leverage intelligence from multiple sources
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card className="cyber-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-sm font-medium">Intelligence Sources</CardTitle>
                <CardDescription className="text-xs">
                  Active feeds and intelligence data
                </CardDescription>
              </div>
              <Info className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["OSINT Feeds", "Dark Web Monitoring", "Security Blogs", "Vendor Advisories", "Threat Research"].map((source, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-cyber-light/10 pb-2">
                    <span className="text-sm font-medium">{source}</span>
                    <Badge variant="outline" className="bg-cyber-success/10 text-cyber-success">Active</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <ThreatFeed />
      </div>
    </MainLayout>
  );
};

export default Intelligence;
