
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

interface RecruiterRouteProps {
  children: React.ReactNode;
}

const RecruiterRoute = ({ children }: RecruiterRouteProps) => {
  const { user, profile, loading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Show toast only when a regular user tries to access recruiter route
    if (user && profile && profile.role !== 'recruiter' && profile.role !== 'admin') {
      toast({
        title: "Access Denied",
        description: "This page is only accessible to recruiters",
        variant: "destructive",
      });
    }
  }, [user, profile, toast]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (profile && profile.role !== 'recruiter' && profile.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RecruiterRoute;
