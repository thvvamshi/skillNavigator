
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCompanyById } from "@/services/supabaseQueries";
import { Company } from "@/types";
import JobCard from "@/components/ui/job-card";
import { Button } from "@/components/ui/button";
import { Globe, MapPin, ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CompanyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchCompany = async () => {
      if (id) {
        try {
          const companyData = await getCompanyById(id);
          setCompany(companyData);
        } catch (err) {
          setError(err instanceof Error ? err : new Error('Failed to fetch company'));
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCompany();
  }, [id]);
  
  if (loading) {
    return (
      <div className="container-custom py-16 text-center">
        <p>Loading company details...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container-custom py-16 text-center">
        <p>Error: {error.message}</p>
        <Button asChild>
          <Link to="/companies">Back to Companies</Link>
        </Button>
      </div>
    );
  }
  
  if (!company) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Company Not Found</h1>
        <p className="mb-8">The company you are looking for does not exist.</p>
        <Button asChild>
          <Link to="/companies">Back to Companies</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <Link to="/companies" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Companies
      </Link>
      
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-12">
        <div className="p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="h-24 w-24 p-4 bg-accent rounded-md flex items-center justify-center">
              <img src={company.logo} alt={company.name} className="h-16 w-16 object-contain" />
            </div>
            
            <div className="flex-grow">
              <h1 className="text-3xl font-bold">{company.name}</h1>
              
              <div className="flex flex-wrap gap-4 mt-2">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{company.location}</span>
                </div>
                
                <div className="flex items-center text-muted-foreground">
                  <Globe className="h-4 w-4 mr-1" />
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">
                    {company.website.replace(/^https?:\/\/(www\.)?/, "")}
                  </a>
                </div>
              </div>
            </div>
            
            <Badge variant="outline" className="text-sm">{company.industry}</Badge>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">About {company.name}</h2>
            <p className="text-gray-600">{company.description}</p>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-6">
          Open Positions {company.jobs.length > 0 && `(${company.jobs.length})`}
        </h2>
        
        {company.jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {company.jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-accent rounded-lg">
            <p className="text-lg font-medium">No open positions at the moment.</p>
            <p className="text-muted-foreground mt-2">Check back later for new opportunities.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDetailsPage;
