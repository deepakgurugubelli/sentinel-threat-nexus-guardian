
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Shield, AlertTriangle, Activity, Database, 
  Globe, Users, Settings, Terminal, Search
} from 'lucide-react';

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive?: boolean;
};

const NavItem = ({ icon, label, to, isActive = false }: NavItemProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
      isActive 
        ? "bg-sidebar-accent text-sidebar-accent-foreground" 
        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
    )}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

const Sidebar = () => {
  // Use the current path to determine which nav item is active
  const currentPath = window.location.pathname;

  return (
    <div className="h-screen w-64 flex flex-col bg-sidebar fixed left-0 top-0 border-r border-cyber-light/10">
      <div className="p-4 border-b border-cyber-light/10">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-cyber-accent" />
          <h1 className="text-xl font-bold">Sentinel</h1>
        </div>
        <p className="text-xs text-sidebar-foreground/60 mt-1">Threat Intelligence Platform</p>
      </div>
      
      <div className="flex-1 py-4 px-2 space-y-1 overflow-auto">
        <NavItem 
          icon={<Activity className="h-4 w-4" />} 
          label="Dashboard" 
          to="/"
          isActive={currentPath === '/'}
        />
        <NavItem 
          icon={<AlertTriangle className="h-4 w-4" />} 
          label="Threats" 
          to="/threats"
          isActive={currentPath === '/threats'}
        />
        <NavItem 
          icon={<Search className="h-4 w-4" />} 
          label="Intelligence" 
          to="/intelligence" 
          isActive={currentPath === '/intelligence'}
        />
        <NavItem 
          icon={<Database className="h-4 w-4" />} 
          label="Assets" 
          to="/assets"
          isActive={currentPath === '/assets'}
        />
        <NavItem 
          icon={<Globe className="h-4 w-4" />} 
          label="Vulnerabilities" 
          to="/vulnerabilities"
          isActive={currentPath === '/vulnerabilities'}
        />
        <NavItem 
          icon={<Users className="h-4 w-4" />} 
          label="Adversaries" 
          to="/adversaries"
          isActive={currentPath === '/adversaries'}
        />
        <NavItem 
          icon={<Terminal className="h-4 w-4" />} 
          label="Automation" 
          to="/automation"
          isActive={currentPath === '/automation'}
        />

        <div className="pt-4 mt-4 border-t border-cyber-light/10">
          <NavItem 
            icon={<Settings className="h-4 w-4" />} 
            label="Settings" 
            to="/settings"
            isActive={currentPath === '/settings'}
          />
        </div>
      </div>
      
      <div className="p-4 border-t border-cyber-light/10">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-cyber-accent/20 flex items-center justify-center">
            <span className="text-xs font-medium">JS</span>
          </div>
          <div>
            <p className="text-sm font-medium">John Smith</p>
            <p className="text-xs text-sidebar-foreground/60">Security Analyst</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
