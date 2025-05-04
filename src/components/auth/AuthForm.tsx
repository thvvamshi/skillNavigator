
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { Building } from "lucide-react";

interface AuthFormProps {
  isLogin: boolean;
  activeTab: "user" | "recruiter";
  onToggleAuthMode: () => void;
}

const AuthForm = ({ isLogin, activeTab, onToggleAuthMode }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Update isRecruiter based on tab selection and login state
  useEffect(() => {
    if (!isLogin) {
      setIsRecruiter(activeTab === "recruiter");
    }
  }, [activeTab, isLogin]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Email validation
    const emailSchema = z.string().email("Please enter a valid email address");
    try {
      emailSchema.parse(email);
    } catch (error) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    // Username validation for signup
    if (!isLogin && username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        await signIn(email, password);
        navigate("/");
      } else {
        await signUp(email, password, username, isRecruiter);
        toast({
          title: "Success!",
          description: "Please check your email to confirm your account.",
        });
        onToggleAuthMode(); // Switch back to login mode
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!isLogin && (
        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Username
          </label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required={!isLogin}
            className={errors.username ? "border-red-500" : ""}
          />
          {errors.username && (
            <p className="text-sm text-red-500 mt-1">{errors.username}</p>
          )}
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={errors.password ? "border-red-500" : ""}
        />
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password}</p>
        )}
      </div>

      {!isLogin && activeTab === "recruiter" && (
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center mb-4">
            <Building className="h-5 w-5 mr-2 text-blue-500" />
            <h3 className="font-medium">Recruiter Information</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            As a recruiter, you'll be able to post job listings and manage applications.
          </p>
          <div className="flex items-center space-x-2 pl-1">
            <Checkbox 
              id="recruiter" 
              checked={isRecruiter}
              onCheckedChange={(checked) => setIsRecruiter(checked === true)}
            />
            <label 
              htmlFor="recruiter" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I confirm that I am a recruiter
            </label>
          </div>
        </div>
      )}
      
      <Button 
        type="submit" 
        className={activeTab === "recruiter" ? "w-full bg-blue-600 hover:bg-blue-700" : "w-full"}
        disabled={loading}
      >
        {loading ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
      </Button>
    </form>
  );
};

export default AuthForm;
