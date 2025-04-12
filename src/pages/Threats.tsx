
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import RecentThreatsTable from '@/components/dashboard/RecentThreatsTable';
import { AlertTriangle } from 'lucide-react';

const Threats = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="h-6 w-6 text-cyber-accent" />
          <h1 className="text-2xl font-bold">Threat Management</h1>
        </div>
        <p className="text-muted-foreground">
          Comprehensive view of detected threats across your infrastructure
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <RecentThreatsTable />
      </div>
    </MainLayout>
  );
};

export default Threats;
