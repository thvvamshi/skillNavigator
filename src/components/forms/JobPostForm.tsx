
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCompanies } from "@/services/supabaseQueries";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const jobSchema = z.object({
  title: z.string().min(3, "Job title must be at least 3 characters"),
  company_id: z.string().uuid("Please select a company"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  type: z.string().min(1, "Please select job type"),
  experience: z.string().min(1, "Please select experience level"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  salary: z.string().optional(),
});

type JobFormValues = z.infer<typeof jobSchema>;

interface JobPostFormProps {
  initialData?: any;
  isEditing?: boolean;
}

const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"];
const experienceLevels = ["Entry Level", "Mid Level", "Senior Level", "Executive"];

export const JobPostForm: React.FC<JobPostFormProps> = ({ initialData, isEditing = false }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: companies = [], isLoading: loadingCompanies } = useQuery({
    queryKey: ["companies"],
    queryFn: getAllCompanies,
  });

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: initialData?.title || "",
      company_id: initialData?.company_id || "",
      location: initialData?.location || "",
      type: initialData?.type || "",
      experience: initialData?.experience || "",
      description: initialData?.description || "",
      salary: initialData?.salary || "",
    },
  });

  useEffect(() => {
    // Update form values when initialData changes
    if (initialData) {
      form.reset({
        title: initialData.title || "",
        company_id: initialData.company_id || "",
        location: initialData.location || "",
        type: initialData.type || "",
        experience: initialData.experience || "",
        description: initialData.description || "",
        salary: initialData.salary || "",
      });
    }
  }, [initialData, form]);

  const onSubmit = async (values: JobFormValues) => {
    setIsSubmitting(true);
    try {
      // Make sure all required fields are present
      const jobData = {
        title: values.title,
        company_id: values.company_id,
        location: values.location,
        type: values.type,
        experience: values.experience,
        description: values.description,
        // Optional field
        salary: values.salary || null,
      };

      let result;

      if (isEditing && initialData?.id) {
        // Update existing job
        result = await supabase
          .from("jobs")
          .update(jobData)
          .eq("id", initialData.id)
          .select();
      } else {
        // Insert new job
        result = await supabase
          .from("jobs")
          .insert([jobData])
          .select();
      }

      const { data, error } = result;

      if (error) {
        throw error;
      }

      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["recruiter-jobs"] });

      toast({
        title: "Success!",
        description: isEditing ? "Job updated successfully." : "Job posted successfully.",
      });

      // Reset form if not editing
      if (!isEditing) {
        form.reset();
      }
      
      // Redirect to manage jobs page
      navigate("/manage-jobs");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 bg-white p-6 rounded-lg shadow-sm border"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Senior React Developer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={loadingCompanies}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Remote, New York, SF" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary Range (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., $80K-120K/year" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {jobTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the job responsibilities, requirements, and any other details..."
                    className="min-h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full bg-hero-gradient hover:opacity-90" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (isEditing ? "Updating..." : "Posting...") : (isEditing ? "Update Job" : "Post Job")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default JobPostForm;
