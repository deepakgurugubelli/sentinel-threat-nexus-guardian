
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-cyber-dark flex flex-col items-center justify-center p-4">
      <div className="cyber-card p-8 max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center mb-6">
          <Shield className="h-10 w-10 text-cyber-accent" />
          <AlertTriangle className="h-6 w-6 text-cyber-alert absolute" />
        </div>
        
        <h1 className="text-4xl font-bold mb-2 text-cyber-alert">404</h1>
        <p className="text-xl mb-6">Access Denied</p>
        
        <div className="cyber-terminal mb-6 text-left max-h-32 overflow-y-auto">
          <p>{'> Scanning route...'}</p>
          <p>{`> ERROR: Resource "${location.pathname}" not found.`}</p>
          <p>{'> Security protocol activated.'}</p>
          <p>{'> Redirecting to secure zone...'}</p>
        </div>
        
        <Link to="/">
          <Button variant="default" className="w-full bg-cyber-accent hover:bg-cyber-accent/80">
            Return to Secure Zone
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
