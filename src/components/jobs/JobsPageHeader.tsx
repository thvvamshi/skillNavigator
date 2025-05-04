
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const JobsPageHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Manage Job Listings</h1>
        <p className="text-muted-foreground">
          Create, edit and manage all your job postings
        </p>
      </div>
      <Button asChild className="bg-hero-gradient hover:opacity-90">
        <Link to="/post-job" className="flex items-center">
          <PlusCircle className="mr-2 h-4 w-4" /> Post New Job
        </Link>
      </Button>
    </div>
  );
};

export default JobsPageHeader;
