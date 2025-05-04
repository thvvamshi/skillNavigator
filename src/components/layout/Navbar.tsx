
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, Building, LogIn, LogOut, PlusCircle, User, Users } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const Navbar: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const { toast } = useToast();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Success",
        description: "You have been signed out successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const isRecruiter = profile?.role === 'recruiter' || profile?.role === 'admin';

  return (
    <nav className="bg-white border-b border-gray-200 py-4">
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-hero-gradient p-2 rounded-md">
            <Briefcase className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">SkillNavigator</span>
        </Link>
        
        <div className="flex space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/companies">Companies</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/jobs">Jobs</Link>
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {!isRecruiter && (
                <Button variant="ghost" asChild>
                  <Link to="/search">Search Jobs</Link>
                </Button>
              )}
              
              {isRecruiter && (
                <>
                  <Button variant="outline" asChild className="flex items-center">
                    <Link to="/post-job">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Post Job
                    </Link>
                  </Button>
                  
                  <Button variant="ghost" asChild className="flex items-center">
                    <Link to="/manage-jobs">
                      <Building className="mr-2 h-4 w-4" />
                      My Listings
                    </Link>
                  </Button>
                </>
              )}
              
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${isRecruiter ? "bg-blue-100" : "bg-gray-100"}`}>
                {isRecruiter ? (
                  <Users className="h-4 w-4 text-blue-600" />
                ) : (
                  <User className="h-4 w-4 text-primary" />
                )}
                <span className="font-medium">{isRecruiter ? "Recruiter" : "Job Seeker"}</span>
              </div>
              
              <Button 
                variant="ghost" 
                onClick={handleSignOut}
                className="flex items-center"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild className="flex items-center">
                <Link to="/auth">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
              <Button asChild className="bg-hero-gradient hover:opacity-90">
                <Link to="/auth">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
