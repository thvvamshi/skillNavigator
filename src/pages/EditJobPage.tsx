
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { JobPostForm } from "@/components/forms/JobPostForm";

const EditJobPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [initialData, setInitialData] = useState(null);
  
  const { data: job, isLoading, error } = useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) {
        throw error;
      }
      
      return data;
    },
    meta: {
      onSuccess: (data) => {
        if (data) {
          setInitialData(data);
        }
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.message || "Failed to load job data",
          variant: "destructive",
        });
        navigate("/manage-jobs");
      }
    }
  });

  // Use useEffect instead of relying on onSuccess callback
  useEffect(() => {
    if (job) {
      setInitialData(job);
    }
  }, [job]);

  if (isLoading) {
    return (
      <div className="container-custom py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <p>Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-custom py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-destructive">Failed to load job details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-bold mb-2">Edit Job Listing</h1>
      <p className="text-muted-foreground mb-8">
        Update the details of your job posting
      </p>
      
      {initialData ? (
        <JobPostForm initialData={initialData} isEditing={true} />
      ) : (
        <div className="flex justify-center items-center min-h-[400px]">
          <p>No job data available.</p>
        </div>
      )}
    </div>
  );
};

export default EditJobPage;
