
import React from "react";

interface TabContentProps {
  isLogin: boolean;
}

const UserTabContent: React.FC<TabContentProps> = ({ isLogin }) => {
  return (
    <div className="p-4 bg-muted/40 rounded-lg mb-4">
      {isLogin ? (
        <p className="text-sm">Sign in as a job seeker to find and apply for positions</p>
      ) : (
        <div>
          <h3 className="font-medium mb-1">Job Seeker Account</h3>
          <p className="text-sm">Create an account to browse and apply for job listings</p>
          <ul className="text-sm mt-2 list-disc list-inside">
            <li>Search for jobs that match your skills</li>
            <li>Track your application status</li>
            <li>Receive notifications for new relevant positions</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserTabContent;
