
// Type definitions for our application

export interface Skill {
  id: string;
  name: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyId: string;
  location: string;
  type: string; // Full-time, Part-time, Contract, etc.
  experience: string; // Entry, Mid, Senior level
  description: string;
  skills: Skill[];
  salary?: string;
  postedDate: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  industry: string;
  location: string;
  website: string;
  jobs: Job[];
}
