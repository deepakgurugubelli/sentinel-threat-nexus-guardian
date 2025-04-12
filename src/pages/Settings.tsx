
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Settings as SettingsIcon, Save, Bell, Shield, Lock, Database, Globe, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState({
    criticalThreats: true,
    highThreats: true,
    mediumThreats: false,
    lowThreats: false,
    systemUpdates: true,
    newVulnerabilities: true
  });
  
  const [automations, setAutomations] = useState({
    autoBlock: true,
    autoQuarantine: true,
    autoUpdate: false,
    autoRemediate: false
  });
  
  const [integrations, setIntegrations] = useState({
    externalThreatFeeds: true,
    siem: true,
    ticketingSystem: true,
    emailGateway: false,
    endpointProtection: true
  });

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your security platform settings have been updated",
      variant: "default",
    });
  };

  const handleToggle = (category: string, setting: string, value: boolean) => {
    if (category === 'notifications') {
      setNotifications(prev => ({ ...prev, [setting]: value }));
    } else if (category === 'automations') {
      setAutomations(prev => ({ ...prev, [setting]: value }));
    } else if (category === 'integrations') {
      setIntegrations(prev => ({ ...prev, [setting]: value }));
    }
  };

  const handleViewSystemLogs = () => {
    toast({
      title: "System Logs",
      description: "Viewing system logs for security platform activity",
      variant: "default",
    });
    
    // Normally would open a modal with logs, but for this prototype we'll just show a toast
    setTimeout(() => {
      toast({
        title: "System Logs",
        description: "Last 5 system events: User login, Threat detection, Database backup, Rule update, API integration sync",
        variant: "default",
      });
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <SettingsIcon className="h-6 w-6 text-cyber-accent" />
          <h1 className="text-2xl font-bold">Platform Settings</h1>
        </div>
        <p className="text-muted-foreground">
          Configure your security platform preferences
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="cyber-card">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-cyber-accent" />
              <CardTitle className="text-sm font-medium">Notification Settings</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Configure alert thresholds and notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <label htmlFor={`notify-${key}`} className="text-sm cursor-pointer">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </label>
                  <Switch 
                    id={`notify-${key}`} 
                    checked={value} 
                    onCheckedChange={(checked) => handleToggle('notifications', key, checked)} 
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="cyber-card">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-cyber-accent" />
              <CardTitle className="text-sm font-medium">Automation Settings</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Configure automated response actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(automations).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <label htmlFor={`auto-${key}`} className="text-sm cursor-pointer">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </label>
                  <Switch 
                    id={`auto-${key}`} 
                    checked={value} 
                    onCheckedChange={(checked) => handleToggle('automations', key, checked)} 
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="cyber-card">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-cyber-accent" />
              <CardTitle className="text-sm font-medium">Integrations</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Manage external system integrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(integrations).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <label htmlFor={`integration-${key}`} className="text-sm cursor-pointer">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </label>
                  <Switch 
                    id={`integration-${key}`} 
                    checked={value} 
                    onCheckedChange={(checked) => handleToggle('integrations', key, checked)} 
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="cyber-card">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-cyber-accent" />
              <CardTitle className="text-sm font-medium">System</CardTitle>
            </div>
            <CardDescription className="text-xs">
              System configuration and maintenance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">System Status</span>
                <Badge className="bg-cyber-success/10 text-cyber-success border-cyber-success/20 text-xs py-1 px-2 rounded-md">
                  Active
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Database Status</span>
                <Badge className="bg-cyber-success/10 text-cyber-success border-cyber-success/20 text-xs py-1 px-2 rounded-md">
                  Connected
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Last Backup</span>
                <span className="text-xs text-muted-foreground">2025-04-12 02:30 AM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Threat Database</span>
                <span className="text-xs text-muted-foreground">Updated 30 min ago</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-xs mt-2"
                onClick={handleViewSystemLogs}
              >
                View System Logs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6 flex justify-end">
        <Button className="bg-cyber-accent hover:bg-cyber-accent/90" onClick={handleSaveSettings}>
          <Save className="h-4 w-4 mr-2" />
          Save All Settings
        </Button>
      </div>
    </MainLayout>
  );
};

// Add the Badge component since we're using it in this file
const Badge = ({ className, children }: { className?: string, children: React.ReactNode }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default Settings;
