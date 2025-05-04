
import React, { useEffect } from "react";
import { useData } from "@/context/DataContext";
import SkillSelector from "@/components/ui/skill-selector";
import CompanyCard from "@/components/ui/company-card";
import JobCard from "@/components/ui/job-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SearchPage: React.FC = () => {
  const { filteredCompanies, filteredJobs, selectedSkills, searchJobsBySkills } = useData();
  
  useEffect(() => {
    // Initial search
    searchJobsBySkills();
  }, []);

  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-bold mb-8">Find Jobs by Skills</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <p className="text-lg mb-4">Enter your skills to find matching companies and jobs</p>
        <SkillSelector />
      </div>
      
      <Tabs defaultValue="jobs" className="mt-8">
        <TabsList className="mb-6">
          <TabsTrigger value="jobs">Jobs ({filteredJobs.length})</TabsTrigger>
          <TabsTrigger value="companies">Companies ({filteredCompanies.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="jobs">
          {selectedSkills.length > 0 && (
            <p className="text-muted-foreground mb-4">
              Showing {filteredJobs.length} jobs matching your skills.
            </p>
          )}
          
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg font-medium">No jobs found matching your skills.</p>
              <p className="text-muted-foreground mt-2">Try adding different skills or clearing your filters.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="companies">
          {selectedSkills.length > 0 && (
            <p className="text-muted-foreground mb-4">
              Showing {filteredCompanies.length} companies with jobs matching your skills.
            </p>
          )}
          
          {filteredCompanies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg font-medium">No companies found with jobs matching your skills.</p>
              <p className="text-muted-foreground mt-2">Try adding different skills or clearing your filters.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SearchPage;
