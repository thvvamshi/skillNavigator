
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const EmptyJobsState: React.FC = () => {
  return (
    <div className="text-center py-12 bg-muted/50 rounded-lg border border-border">
      <h3 className="text-xl font-semibold mb-2">No Job Listings Yet</h3>
      <p className="text-muted-foreground mb-6">
        You haven't posted any jobs yet. Create your first job listing to get started.
      </p>
      <Button asChild className="bg-hero-gradient hover:opacity-90">
        <Link to="/post-job" className="flex items-center">
          <PlusCircle className="mr-2 h-4 w-4" /> Post Your First Job
        </Link>
      </Button>
    </div>
  );
};

export default EmptyJobsState;
