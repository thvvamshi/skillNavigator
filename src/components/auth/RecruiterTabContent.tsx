
import React from "react";

interface TabContentProps {
  isLogin: boolean;
}

const RecruiterTabContent: React.FC<TabContentProps> = ({ isLogin }) => {
  return (
    <div className="p-4 bg-muted/40 rounded-lg mb-4">
      {isLogin ? (
        <p className="text-sm">Sign in as a recruiter to post and manage job listings</p>
      ) : (
        <div>
          <h3 className="font-medium mb-1">Recruiter Account</h3>
          <p className="text-sm">Create an account to post and manage job listings</p>
          <ul className="text-sm mt-2 list-disc list-inside">
            <li>Post unlimited job listings</li>
            <li>Manage company profiles</li>
            <li>Review and process applications</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecruiterTabContent;
