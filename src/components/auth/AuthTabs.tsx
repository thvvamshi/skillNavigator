
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Users } from "lucide-react";
import UserTabContent from "./UserTabContent";
import RecruiterTabContent from "./RecruiterTabContent";

interface AuthTabsProps {
  activeTab: "user" | "recruiter";
  isLogin: boolean;
  onTabChange: (value: "user" | "recruiter") => void;
}

const AuthTabs = ({ activeTab, isLogin, onTabChange }: AuthTabsProps) => {
  return (
    <Tabs 
      defaultValue="user" 
      className="mb-6"
      value={activeTab}
      onValueChange={(value) => onTabChange(value as "user" | "recruiter")}
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="user" className="flex items-center">
          <User className="mr-2 h-4 w-4" />
          Job Seeker
        </TabsTrigger>
        <TabsTrigger value="recruiter" className="flex items-center">
          <Users className="mr-2 h-4 w-4" />
          Recruiter
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="user">
        <UserTabContent isLogin={isLogin} />
      </TabsContent>
      
      <TabsContent value="recruiter">
        <RecruiterTabContent isLogin={isLogin} />
      </TabsContent>
    </Tabs>
  );
};

export default AuthTabs;
