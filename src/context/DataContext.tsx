
import React, { createContext, useContext, useState } from "react";
import { Company, Job, Skill } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getAllCompanies, getAllJobs, getAllSkills } from "@/services/supabaseQueries";

interface DataContextType {
  skills: Skill[];
  companies: Company[];
  jobs: Job[];
  filteredCompanies: Company[];
  filteredJobs: Job[];
  selectedSkills: string[];
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  clearSkills: () => void;
  searchJobsBySkills: () => void;
  isLoading: boolean;
  error: Error | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  const { 
    data: skills = [], 
    isLoading: isLoadingSkills,
    error: skillsError
  } = useQuery({
    queryKey: ['skills'],
    queryFn: getAllSkills
  });

  const { 
    data: companies = [], 
    isLoading: isLoadingCompanies,
    error: companiesError
  } = useQuery({
    queryKey: ['companies'],
    queryFn: getAllCompanies
  });

  const { 
    data: jobs = [], 
    isLoading: isLoadingJobs,
    error: jobsError
  } = useQuery({
    queryKey: ['jobs'],
    queryFn: getAllJobs
  });

  const isLoading = isLoadingSkills || isLoadingCompanies || isLoadingJobs;
  const error = skillsError || companiesError || jobsError;

  const addSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill));
  };

  const clearSkills = () => {
    setSelectedSkills([]);
    setFilteredCompanies(companies);
    setFilteredJobs(jobs);
  };

  const searchJobsBySkills = () => {
    if (selectedSkills.length === 0) {
      setFilteredCompanies(companies);
      setFilteredJobs(jobs);
    } else {
      const matchingJobs = jobs.filter(job =>
        selectedSkills.some(skill =>
          job.skills.some(jobSkill => jobSkill.name.toLowerCase() === skill.toLowerCase())
        )
      );

      const matchingCompanyIds = new Set(matchingJobs.map(job => job.companyId));
      const matchingCompanies = companies.filter(company =>
        matchingCompanyIds.has(company.id)
      );

      setFilteredCompanies(matchingCompanies);
      setFilteredJobs(matchingJobs);
    }
  };

  const value = {
    skills,
    companies,
    jobs,
    filteredCompanies,
    filteredJobs,
    selectedSkills,
    addSkill,
    removeSkill,
    clearSkills,
    searchJobsBySkills,
    isLoading,
    error
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
