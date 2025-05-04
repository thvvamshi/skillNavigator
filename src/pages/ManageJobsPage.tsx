
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import JobsPageHeader from "@/components/jobs/JobsPageHeader";
import JobListingsTable from "@/components/jobs/JobListingsTable";
import EmptyJobsState from "@/components/jobs/EmptyJobsState";
import DeleteJobDialog from "@/components/jobs/DeleteJobDialog";
import { useJobManagement } from "@/hooks/useJobManagement";

const ManageJobsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { 
    jobToDelete, 
    handleDeleteJob, 
    confirmDelete, 
    cancelDelete 
  } = useJobManagement();

  // Fetch jobs posted by the current recruiter
  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["recruiter-jobs", user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from("jobs")
        .select(`
          *,
          companies (
            id,
            name,
            logo
          )
        `)
        .order("posted_date", { ascending: false });
      
      if (error) {
        console.error("Error fetching jobs:", error);
        toast({
          title: "Error",
          description: "Failed to load your job listings",
          variant: "destructive",
        });
        return [];
      }
      
      return data || [];
    },
    enabled: !!user,
  });

  const handleViewJob = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleEditJob = (jobId: string) => {
    navigate(`/edit-job/${jobId}`);
  };

  return (
    <div className="container-custom py-12">
      <JobsPageHeader />

      {isLoading ? (
        <div className="flex justify-center py-12">
          <p>Loading your job listings...</p>
        </div>
      ) : jobs.length === 0 ? (
        <EmptyJobsState />
      ) : (
        <JobListingsTable
          jobs={jobs}
          onViewJob={handleViewJob}
          onEditJob={handleEditJob}
          onDeleteJob={handleDeleteJob}
        />
      )}

      <DeleteJobDialog 
        isOpen={!!jobToDelete}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ManageJobsPage;
