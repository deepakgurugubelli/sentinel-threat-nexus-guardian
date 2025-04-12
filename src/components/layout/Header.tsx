
import React, { useState } from 'react';
import { Bell, Info, Filter, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [showSystemLogs, setShowSystemLogs] = useState(false);
  
  // Sample system logs
  const systemLogs = [
    { time: '10:15:22', message: 'Critical threat detected: Brute force attack on authentication server', type: 'critical' },
    { time: '10:08:45', message: 'New IOC added to blocklist: 185.22.67.123', type: 'info' },
    { time: '09:56:12', message: 'Automated response executed: Isolated endpoint DEV-452', type: 'warning' },
    { time: '09:32:56', message: 'Threat intelligence feed updated with 127 new indicators', type: 'info' },
    { time: '09:17:03', message: 'User G Deepak logged in from recognized location', type: 'info' },
    { time: '08:45:19', message: 'Database backup completed successfully', type: 'info' },
    { time: '08:30:00', message: 'System services started - Platform operational', type: 'info' },
  ];

  const handleViewSystemLogs = () => {
    setShowSystemLogs(!showSystemLogs);
    
    toast({
      title: "System Logs",
      description: "Viewing system logs and platform activity",
      variant: "default",
    });
  };
  
  // Get the current page title based on the path
  const getPageTitle = () => {
    const path = location.pathname;
    
    switch (path) {
      case '/':
        return 'Dashboard';
      case '/threats':
        return 'Threat Management';
      case '/intelligence':
        return 'Threat Intelligence';
      case '/assets':
        return 'Asset Inventory';
      case '/vulnerabilities':
        return 'Vulnerabilities';
      case '/adversaries':
        return 'Threat Actors';
      case '/automation':
        return 'Security Automation';
      case '/settings':
        return 'Platform Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="h-16 ml-64 flex items-center justify-between px-6 border-b border-cyber-light/10 bg-cyber-medium/30">
      <div>
        <h1 className="text-xl font-bold">{getPageTitle()}</h1>
        <p className="text-xs text-muted-foreground">Real-time threat intelligence overview</p>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" className="text-xs gap-1.5">
          <Filter className="h-3.5 w-3.5" />
          Filter
        </Button>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-cyber-alert flex items-center justify-center text-[10px]">3</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 mr-4" align="end">
            <div className="space-y-1">
              <h4 className="font-medium text-sm">Notifications</h4>
              <p className="text-xs text-muted-foreground">You have 3 unread notifications</p>
            </div>
            <div className="mt-2 space-y-2">
              {[
                { id: 1, title: "Critical vulnerability detected", time: "5 min ago", type: "critical" },
                { id: 2, title: "Unusual network activity observed", time: "15 min ago", type: "warning" },
                { id: 3, title: "New threat intelligence report", time: "1 hour ago", type: "info" }
              ].map((item) => (
                <div 
                  key={item.id} 
                  className="p-2 text-xs rounded-md border flex gap-2 items-start cursor-pointer hover:bg-cyber-medium/40"
                  style={{ 
                    borderColor: 
                      item.type === 'critical' ? 'rgba(239, 68, 68, 0.3)' : 
                      item.type === 'warning' ? 'rgba(245, 158, 11, 0.3)' : 
                      'rgba(6, 182, 212, 0.3)'
                  }}
                >
                  <div className={`h-2 w-2 mt-1 rounded-full flex-shrink-0 ${
                    item.type === 'critical' ? 'bg-cyber-alert' :
                    item.type === 'warning' ? 'bg-cyber-warning' :
                    'bg-cyber-accent'
                  }`} />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-muted-foreground mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 pt-2 border-t">
              <Button variant="link" className="text-xs w-full text-cyber-accent">View all notifications</Button>
            </div>
          </PopoverContent>
        </Popover>
        
        <Popover open={showSystemLogs} onOpenChange={setShowSystemLogs}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleViewSystemLogs}
            >
              <Info className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 mr-4" align="end">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">System Information</h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 text-xs"
                  onClick={handleViewSystemLogs}
                >
                  <Terminal className="h-3 w-3 mr-1" />
                  System Logs
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mb-2">Platform status and updates</p>
            </div>
            
            {showSystemLogs ? (
              <div className="space-y-2 text-xs max-h-60 overflow-y-auto border border-cyber-light/10 rounded-md bg-cyber-dark/30 p-2 font-mono">
                {systemLogs.map((log, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="text-muted-foreground">[{log.time}]</span>
                    <span className={
                      log.type === 'critical' ? 'text-cyber-alert' :
                      log.type === 'warning' ? 'text-cyber-warning' :
                      'text-cyber-accent'
                    }>
                      {log.message}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">System Version:</span>
                  <span>Sentinel v1.0.3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span>Today, 08:45 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Threat Database:</span>
                  <span className="flex items-center text-cyber-success">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyber-success mr-1.5"></span>
                    Updated (184,230 IOCs)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Integration Status:</span>
                  <span className="flex items-center text-cyber-success">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyber-success mr-1.5"></span>
                    Connected
                  </span>
                </div>
              </div>
            )}
            
            <div className="mt-2 pt-2 border-t">
              <Button 
                variant="link" 
                className="text-xs w-full text-cyber-accent"
                onClick={handleViewSystemLogs}
              >
                {showSystemLogs ? 'Hide system logs' : 'View system logs'}
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
