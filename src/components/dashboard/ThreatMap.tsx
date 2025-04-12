
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ThreatLocation {
  country: string;
  count: number;
  latitude: number;
  longitude: number;
}

const ThreatMap = () => {
  const { toast } = useToast();

  // Add more countries including India to the threat locations
  const threatLocations: ThreatLocation[] = [
    { country: 'United States', count: 142, latitude: 37.09, longitude: -95.71 },
    { country: 'Russia', count: 89, latitude: 61.52, longitude: 105.31 },
    { country: 'China', count: 78, latitude: 35.86, longitude: 104.19 },
    { country: 'Iran', count: 45, latitude: 32.42, longitude: 53.68 },
    { country: 'North Korea', count: 38, latitude: 40.33, longitude: 127.51 },
    { country: 'India', count: 72, latitude: 20.59, longitude: 78.96 },
    { country: 'Germany', count: 27, latitude: 51.16, longitude: 10.45 },
    { country: 'Brazil', count: 21, latitude: -14.23, longitude: -51.92 },
    { country: 'Pakistan', count: 34, latitude: 30.37, longitude: 69.34 },
    { country: 'United Kingdom', count: 31, latitude: 55.37, longitude: -3.43 },
    { country: 'South Africa', count: 19, latitude: -30.55, longitude: 22.93 },
    { country: 'Australia', count: 23, latitude: -25.27, longitude: 133.77 },
  ];

  const handleCountryClick = (country: ThreatLocation) => {
    toast({
      title: `Threat Origin: ${country.country}`,
      description: `${country.count} active threats detected from this region`,
      variant: country.count > 50 ? 'destructive' : 'default',
    });
  };

  return (
    <Card className="cyber-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-sm font-medium">Global Threat Origins</CardTitle>
          <CardDescription className="text-xs">
            Live attack source locations
          </CardDescription>
        </div>
        <Globe className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative h-[300px] w-full bg-cyber-dark/30 rounded-md overflow-hidden">
          {/* This would be replaced with an actual map component in a production app */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[80%] h-[80%] border border-cyber-light/10 rounded-full relative">
              {threatLocations.map((location, index) => {
                // Convert lat/long to x/y coordinates (simplified for this example)
                const x = 50 + (location.longitude / 180) * 50; // -180 to 180 -> 0 to 100
                const y = 50 - (location.latitude / 90) * 50; // -90 to 90 -> 100 to 0
                
                const size = Math.max(6, Math.min(12, 6 + (location.count / 20)));
                
                return (
                  <div 
                    key={index}
                    className="absolute pulse-dot cursor-pointer"
                    style={{
                      top: `${y}%`,
                      left: `${x}%`,
                      height: `${size}px`,
                      width: `${size}px`,
                      backgroundColor: 'rgba(6, 182, 212, 0.7)',
                    }}
                    title={`${location.country}: ${location.count} threats`}
                    onClick={() => handleCountryClick(location)}
                  />
                );
              })}
              <div className="absolute inset-0 border border-cyber-light/5 rounded-full scale-75" />
              <div className="absolute inset-0 border border-cyber-light/5 rounded-full scale-50" />
              <div className="absolute inset-0 border border-cyber-light/5 rounded-full scale-25" />
            </div>
          </div>
          
          {/* Overlay data lines for visual effect */}
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-cyber-medium/80 to-transparent flex items-end">
            <div className="flex items-center justify-between w-full px-4 py-2 overflow-x-auto no-scrollbar">
              {threatLocations.slice(0, 7).map((location, index) => (
                <div key={index} className="flex items-center text-xs mx-1 whitespace-nowrap">
                  <div className="h-2 w-2 rounded-full mr-2" 
                    style={{ backgroundColor: 'rgba(6, 182, 212, 0.7)' }} />
                  <span>{location.country}</span>
                  <span className="ml-1 text-cyber-accent font-medium">{location.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThreatMap;
