
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, User, Globe, Terminal, Database, AlertTriangle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ThreatFeedItem {
  id: string;
  type: 'attack' | 'intel' | 'system' | 'user' | 'vulnerability';
  message: string;
  timestamp: string;
  source?: string;
}

const ThreatFeed: React.FC = () => {
  // This data would typically come from your API or real-time feed
  const feedItems: ThreatFeedItem[] = [
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
  ];

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

  return (
    <Card className="cyber-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-sm font-medium">Live Threat Feed</CardTitle>
          <CardDescription className="text-xs">
            Real-time security events
          </CardDescription>
        </div>
        <MessageSquare className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="py-1">
            {feedItems.map((item) => (
              <div 
                key={item.id} 
                className="flex gap-3 px-4 py-3 border-b border-cyber-light/5 hover:bg-cyber-light/5 data-line"
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
