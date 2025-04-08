
import React from 'react';
import { Bell, Info, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const Header = () => {
  return (
    <header className="h-16 ml-64 flex items-center justify-between px-6 border-b border-cyber-light/10 bg-cyber-medium/30">
      <div>
        <h1 className="text-xl font-bold">Dashboard</h1>
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
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <Info className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 mr-4" align="end">
            <div className="space-y-1">
              <h4 className="font-medium text-sm">System Information</h4>
              <p className="text-xs text-muted-foreground mb-2">Platform status and updates</p>
            </div>
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
            <div className="mt-2 pt-2 border-t">
              <Button variant="link" className="text-xs w-full text-cyber-accent">View system logs</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
