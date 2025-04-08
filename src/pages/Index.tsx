
import React, { useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ThreatStatusCard from '@/components/dashboard/ThreatStatusCard';
import ThreatMap from '@/components/dashboard/ThreatMap';
import RecentThreatsTable from '@/components/dashboard/RecentThreatsTable';
import ThreatActivityChart from '@/components/dashboard/ThreatActivityChart';
import SecurityScore from '@/components/dashboard/SecurityScore';
import ThreatFeed from '@/components/dashboard/ThreatFeed';
import { useToast } from '@/hooks/use-toast';
import { Shield } from 'lucide-react';

const Dashboard = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Welcome notification when dashboard loads
    toast({
      title: "Welcome to Sentinel",
      description: "Cybersecurity Threat Intelligence Platform is active and monitoring threats.",
      variant: "default",
    });
  }, []);

  return (
    <MainLayout>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Shield className="h-6 w-6 text-cyber-accent" />
          <h1 className="text-2xl font-bold">Security Dashboard</h1>
        </div>
        <p className="text-muted-foreground">
          Real-time overview of your security posture and active threats
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <ThreatStatusCard level="critical" count={7} change={12} />
        <ThreatStatusCard level="high" count={18} change={-5} />
        <ThreatStatusCard level="medium" count={26} change={3} />
        <ThreatStatusCard level="low" count={41} change={-7} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2">
          <ThreatActivityChart />
        </div>
        <SecurityScore score={76} previousScore={72} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2">
          <RecentThreatsTable />
        </div>
        <ThreatFeed />
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <ThreatMap />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
