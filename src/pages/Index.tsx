
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ThreatStatusCard from '@/components/dashboard/ThreatStatusCard';
import ThreatMap from '@/components/dashboard/ThreatMap';
import RecentThreatsTable from '@/components/dashboard/RecentThreatsTable';
import ThreatActivityChart from '@/components/dashboard/ThreatActivityChart';
import SecurityScore from '@/components/dashboard/SecurityScore';
import ThreatFeed from '@/components/dashboard/ThreatFeed';

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <ThreatStatusCard level="critical" count={7} change={12} />
        <ThreatStatusCard level="high" count={18} change={-5} />
        <ThreatStatusCard level="medium" count={26} change={3} />
        <ThreatStatusCard level="low" count={41} change={-7} />
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="col-span-2">
          <ThreatActivityChart />
        </div>
        <SecurityScore score={76} previousScore={72} />
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="col-span-2">
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
