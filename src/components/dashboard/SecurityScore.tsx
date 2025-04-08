
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Shield } from 'lucide-react';

interface SecurityScoreProps {
  score: number;
  previousScore?: number;
  maxScore?: number;
}

const SecurityScore: React.FC<SecurityScoreProps> = ({ 
  score, 
  previousScore, 
  maxScore = 100 
}) => {
  const getScoreColor = () => {
    if (score >= 80) return 'text-cyber-success';
    if (score >= 60) return 'text-cyber-warning';
    return 'text-cyber-alert';
  };

  const getScoreProgressColor = () => {
    if (score >= 80) return 'bg-cyber-success';
    if (score >= 60) return 'bg-cyber-warning';
    return 'bg-cyber-alert';
  };

  const scoreChange = previousScore !== undefined ? score - previousScore : undefined;

  return (
    <Card className="cyber-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-sm font-medium">Security Score</CardTitle>
          <CardDescription className="text-xs">
            Overall security posture
          </CardDescription>
        </div>
        <Shield className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center py-4">
          <div className="relative h-28 w-28 flex items-center justify-center">
            <svg className="h-full w-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(51, 65, 85, 0.2)"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray={`${(score / maxScore) * 283} 283`}
                strokeDashoffset="0"
                strokeLinecap="round"
                className={getScoreProgressColor()}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-bold ${getScoreColor()}`}>{score}</span>
              <span className="text-xs text-muted-foreground">/100</span>
            </div>
          </div>
        </div>
        
        {scoreChange !== undefined && (
          <div className="mt-2 text-center text-xs">
            {scoreChange > 0 ? (
              <span className="text-cyber-success">▲ {scoreChange} points increase since last week</span>
            ) : scoreChange < 0 ? (
              <span className="text-cyber-alert">▼ {Math.abs(scoreChange)} points decrease since last week</span>
            ) : (
              <span className="text-muted-foreground">No change since last week</span>
            )}
          </div>
        )}
        
        <div className="mt-4 space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Network Security</span>
              <span className="font-medium">82%</span>
            </div>
            <Progress value={82} className="h-1" />
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Endpoint Protection</span>
              <span className="font-medium">76%</span>
            </div>
            <Progress value={76} className="h-1" />
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Cloud Security</span>
              <span className="font-medium">64%</span>
            </div>
            <Progress value={64} className="h-1" />
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Identity Management</span>
              <span className="font-medium">91%</span>
            </div>
            <Progress value={91} className="h-1" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityScore;
