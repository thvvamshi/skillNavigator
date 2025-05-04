
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const useJobManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);

  // Delete job mutation
  const deleteJobMutation = useMutation({
    mutationFn: async (jobId: string) => {
      // First delete related records in job_skills table
      const { error: skillsError } = await supabase
        .from("job_skills")
        .delete()
        .eq("job_id", jobId);
      
      if (skillsError) {
        console.error("Error deleting job skills:", skillsError);
        throw skillsError;
      }
      
      // Then delete the job record
      const { error } = await supabase
        .from("jobs")
        .delete()
        .eq("id", jobId);
      
      if (error) {
        throw error;
      }
      
      return jobId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recruiter-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast({
        title: "Success",
        description: "Job listing deleted successfully",
      });
      setJobToDelete(null);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete job listing",
        variant: "destructive",
      });
    },
  });

  const handleDeleteJob = (jobId: string) => {
    setJobToDelete(jobId);
  };

  const confirmDelete = () => {
    if (jobToDelete) {
      deleteJobMutation.mutate(jobToDelete);
    }
  };

  const cancelDelete = () => {
    setJobToDelete(null);
  };

  return {
    jobToDelete,
    isDeleting: deleteJobMutation.isPending,
    handleDeleteJob,
    confirmDelete,
    cancelDelete
  };
};
