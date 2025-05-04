
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import AuthTabs from "@/components/auth/AuthTabs";
import AuthForm from "@/components/auth/AuthForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [activeTab, setActiveTab] = useState<"user" | "recruiter">("user");
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (user) {
    navigate("/");
    return null;
  }

  return (
    <div className="container-custom py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {isLogin ? "Sign In" : "Create Account"}
        </h1>

        <AuthTabs 
          activeTab={activeTab} 
          isLogin={isLogin}
          onTabChange={setActiveTab} 
        />
        
        <AuthForm 
          isLogin={isLogin} 
          activeTab={activeTab}
          onToggleAuthMode={() => setIsLogin(!isLogin)} 
        />
        
        <p className="mt-4 text-center text-sm text-muted-foreground">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
            }}
            className="text-primary hover:underline"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
