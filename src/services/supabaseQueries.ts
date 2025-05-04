import { supabase } from "@/integrations/supabase/client";
import { Company, Job, Skill } from "@/types";

export async function getAllSkills(): Promise<Skill[]> {
  const { data, error } = await supabase
    .from('skills')
    .select('id, name');
  
  if (error) throw error;
  return data;
}

export async function getAllJobs(): Promise<Job[]> {
  const { data, error } = await supabase
    .from('jobs')
    .select(`
      id,
      title,
      location,
      type,
      experience,
      description,
      salary,
      posted_date,
      company_id,
      companies (
        name
      ),
      job_skills (
        skills (
          id,
          name
        )
      )
    `);
  
  if (error) throw error;
  
  return data.map(job => ({
    ...job,
    company: job.companies.name,
    companyId: job.company_id,
    postedDate: job.posted_date,
    skills: job.job_skills ? job.job_skills.map(js => js.skills) : []
  }));
}

export async function getJobById(id: string): Promise<Job | null> {
  const { data, error } = await supabase
    .from('jobs')
    .select(`
      id,
      title,
      location,
      type,
      experience,
      description,
      salary,
      posted_date,
      company_id,
      companies (
        name
      ),
      job_skills (
        skills (
          id,
          name
        )
      )
    `)
    .eq('id', id)
    .single();
  
  if (error) throw error;
  if (!data) return null;
  
  return {
    ...data,
    company: data.companies.name,
    companyId: data.company_id,
    postedDate: data.posted_date,
    skills: data.job_skills ? data.job_skills.map(js => js.skills) : []
  };
}

export async function getAllCompanies(): Promise<Company[]> {
  const { data: companies, error: companiesError } = await supabase
    .from('companies')
    .select(`
      id,
      name,
      logo,
      description,
      industry,
      location,
      website
    `);
  
  if (companiesError) throw companiesError;
  
  // Fetch jobs for each company
  const { data: jobs, error: jobsError } = await supabase
    .from('jobs')
    .select(`
      id,
      title,
      location,
      type,
      experience,
      description,
      salary,
      posted_date,
      company_id,
      job_skills (
        skills (
          id,
          name
        )
      )
    `);
  
  if (jobsError) throw jobsError;
  
  return companies.map(company => ({
    ...company,
    jobs: jobs
      .filter(job => job.company_id === company.id)
      .map(job => ({
        ...job,
        company: company.name,
        companyId: job.company_id,
        postedDate: job.posted_date,
        skills: job.job_skills ? job.job_skills.map(js => js.skills) : []
      }))
  }));
}

export async function getCompanyById(id: string): Promise<Company | null> {
  const { data: company, error: companyError } = await supabase
    .from('companies')
    .select(`
      id,
      name,
      logo,
      description,
      industry,
      location,
      website
    `)
    .eq('id', id)
    .single();
  
  if (companyError) throw companyError;
  if (!company) return null;
  
  const { data: jobs, error: jobsError } = await supabase
    .from('jobs')
    .select(`
      id,
      title,
      location,
      type,
      experience,
      description,
      salary,
      posted_date,
      company_id,
      job_skills (
        skills (
          id,
          name
        )
      )
    `)
    .eq('company_id', id);
  
  if (jobsError) throw jobsError;
  
  return {
    ...company,
    jobs: jobs.map(job => ({
      ...job,
      company: company.name,
      companyId: job.company_id,
      postedDate: job.posted_date,
      skills: job.job_skills ? job.job_skills.map(js => js.skills) : []
    }))
  };
}
