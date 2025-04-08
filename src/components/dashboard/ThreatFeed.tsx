
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, User, Globe, Terminal, Database, AlertTriangle, RefreshCw } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ThreatFeedItem {
  id: string;
  type: 'attack' | 'intel' | 'system' | 'user' | 'vulnerability';
  message: string;
  timestamp: string;
  source?: string;
}

const ThreatFeed: React.FC = () => {
  const { toast } = useToast();
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [feedItems, setFeedItems] = useState<ThreatFeedItem[]>([
    {
      id: 'feed-1',
      type: 'attack',
      message: 'Brute force attack detected on authentication system',
      timestamp: '2025-04-08T08:47:12Z',
      source: 'IDS Alert #2489'
    },
    {
      id: 'feed-2',
      type: 'intel',
      message: 'New ransomware variant "BlackShadow" identified in wild',
      timestamp: '2025-04-08T08:35:27Z',
      source: 'Threat Intelligence Feed'
    },
    {
      id: 'feed-3',
      type: 'system',
      message: 'Malware quarantined on workstation DEV-452',
      timestamp: '2025-04-08T08:22:44Z',
      source: 'Endpoint Protection'
    },
    {
      id: 'feed-4',
      type: 'vulnerability',
      message: 'Critical vulnerability CVE-2025-9876 affecting Apache servers',
      timestamp: '2025-04-08T08:15:09Z',
      source: 'Vulnerability Scanner'
    },
    {
      id: 'feed-5',
      type: 'user',
      message: 'Suspicious login attempt for user admin from unrecognized IP',
      timestamp: '2025-04-08T08:02:51Z',
      source: 'SIEM Alert'
    },
    {
      id: 'feed-6',
      type: 'attack',
      message: 'SQL injection attempt blocked on customer portal',
      timestamp: '2025-04-08T07:49:35Z',
      source: 'WAF Alert #1372'
    },
    {
      id: 'feed-7',
      type: 'intel',
      message: 'APT group "Midnight Dragon" targeting finance sector',
      timestamp: '2025-04-08T07:38:22Z',
      source: 'Threat Intelligence Feed'
    },
    {
      id: 'feed-8',
      type: 'system',
      message: 'Firewall rule updated to block emerging threat',
      timestamp: '2025-04-08T07:25:18Z',
      source: 'Automated Response'
    },
  ]);

  // Function to refresh the threat feed with simulated new data
  const refreshFeed = () => {
    setIsRefreshing(true);
    
    // Simulate an API call delay
    setTimeout(() => {
      // Generate a new threat entry
      const newThreatTypes: ThreatFeedItem['type'][] = ['attack', 'intel', 'system', 'user', 'vulnerability'];
      const randomType = newThreatTypes[Math.floor(Math.random() * newThreatTypes.length)];
      
      const newThreatMessages = [
        'Suspicious outbound connection to known C2 server',
        'New vulnerability identified in cloud infrastructure',
        'Unusual data exfiltration pattern detected',
        'Authentication bypass attempt on admin portal',
        'Data encryption activity detected on file server'
      ];
      const randomMessage = newThreatMessages[Math.floor(Math.random() * newThreatMessages.length)];
      
      const sources = ['SIEM Alert', 'Firewall Logs', 'EDR System', 'Threat Intelligence', 'User Report'];
      const randomSource = sources[Math.floor(Math.random() * sources.length)];
      
      const newThreat: ThreatFeedItem = {
        id: `feed-${Date.now()}`,
        type: randomType,
        message: randomMessage,
        timestamp: new Date().toISOString(),
        source: randomSource
      };
      
      // Add the new threat to the feed
      setFeedItems(prevItems => [newThreat, ...prevItems.slice(0, 7)]);
      setLastRefreshed(new Date());
      setIsRefreshing(false);
      
      toast({
        title: "Threat Feed Updated",
        description: "New security event detected and added to the feed.",
        variant: "default",
      });
    }, 1000);
  };

  // Auto-refresh the feed every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshFeed();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'attack':
        return <AlertTriangle className="h-4 w-4 text-cyber-alert" />;
      case 'intel':
        return <Globe className="h-4 w-4 text-cyber-accent" />;
      case 'system':
        return <Terminal className="h-4 w-4 text-cyber-success" />;
      case 'user':
        return <User className="h-4 w-4 text-cyber-warning" />;
      case 'vulnerability':
        return <Database className="h-4 w-4 text-amber-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleItemClick = (item: ThreatFeedItem) => {
    toast({
      title: `${item.type.charAt(0).toUpperCase() + item.type.slice(1)} Alert`,
      description: item.message,
      variant: item.type === 'attack' || item.type === 'vulnerability' ? 'destructive' : 'default',
    });
    console.log(`Viewing details for threat: ${item.id}`);
  };

  return (
    <Card className="cyber-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-sm font-medium">Live Threat Feed</CardTitle>
          <CardDescription className="text-xs">
            Real-time security events
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            Updated: {lastRefreshed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7" 
            onClick={refreshFeed}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="py-1">
            {feedItems.map((item) => (
              <div 
                key={item.id} 
                className="flex gap-3 px-4 py-3 border-b border-cyber-light/5 hover:bg-cyber-light/5 data-line cursor-pointer"
                onClick={() => handleItemClick(item)}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{item.message}</p>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <span>{formatDate(item.timestamp)}</span>
                    {item.source && (
                      <>
                        <span className="mx-1">•</span>
                        <span>{item.source}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ThreatFeed;
