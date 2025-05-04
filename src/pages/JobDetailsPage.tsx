
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getJobById, getCompanyById } from "@/services/supabaseQueries";
import { Job, Company } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Globe, 
  ChevronLeft 
} from "lucide-react";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
};

const JobDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchJobAndCompany = async () => {
      if (id) {
        try {
          const jobData = await getJobById(id);
          if (jobData) {
            setJob(jobData);
            const companyData = await getCompanyById(jobData.companyId);
            if (companyData) {
              setCompany(companyData);
            }
          }
        } catch (err) {
          setError(err instanceof Error ? err : new Error('Failed to fetch job or company'));
        } finally {
          setLoading(false);
        }
      }
    };

    fetchJobAndCompany();
  }, [id]);
  
  const handleApply = () => {
    if (company && job) {
      // Properly construct the career page URL
      const websiteUrl = company.website || '';
      // Remove trailing slash if present
      const baseUrl = websiteUrl.endsWith('/') ? websiteUrl.slice(0, -1) : websiteUrl;
      const careerUrl = `${baseUrl}/careers`;
      
      // Open in a new tab
      window.open(careerUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <div className="container-custom py-16 text-center">
        <p>Loading job details...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container-custom py-16 text-center">
        <p>Error: {error.message}</p>
        <Button asChild>
          <Link to="/jobs">Back to Jobs</Link>
        </Button>
      </div>
    );
  }
  
  if (!job || !company) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Job Not Found</h1>
        <p className="mb-8">The job you are looking for does not exist.</p>
        <Button asChild>
          <Link to="/jobs">Back to Jobs</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <Link to="/jobs" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Jobs
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-8">
            <div className="p-8">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold">{job.title}</h1>
                <Badge variant={job.type === "Full-time" ? "default" : "outline"}>
                  {job.type}
                </Badge>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center text-muted-foreground">
                  <Briefcase className="h-4 w-4 mr-1" />
                  <Link to={`/companies/${company.id}`} className="hover:text-primary hover:underline">
                    {company.name}
                  </Link>
                </div>
                
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{job.location}</span>
                </div>
                
                {job.salary && (
                  <div className="flex items-center text-muted-foreground">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>{job.salary}</span>
                  </div>
                )}
                
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Posted on {formatDate(job.postedDate)}</span>
                </div>
              </div>
              
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                <p className="text-gray-600 whitespace-pre-line">{job.description}</p>
                
                <h2 className="text-xl font-semibold mt-8 mb-4">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills && job.skills.length > 0 ? (
                    job.skills.map((skill) => (
                      <Badge key={skill.id} variant="secondary" className="bg-accent text-accent-foreground">
                        {skill.name}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">No skills specified</span>
                  )}
                </div>
                
                <div className="mt-8 pt-8 border-t">
                  <Button 
                    size="lg" 
                    className="w-full bg-hero-gradient hover:opacity-90"
                    onClick={handleApply}
                  >
                    Apply on {company?.name}'s Website
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden sticky top-8">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">About the Company</h2>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-16 w-16 p-2 bg-accent rounded-md flex items-center justify-center">
                  <img src={company.logo} alt={company.name} className="h-12 w-12 object-contain" />
                </div>
                <div>
                  <h3 className="font-bold">{company.name}</h3>
                  <Badge variant="outline" className="mt-1">{company.industry}</Badge>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{company.description}</p>
              
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{company.location}</span>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <Globe className="h-4 w-4 mr-1" />
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">
                  {company.website.replace(/^https?:\/\/(www\.)?/, "")}
                </a>
              </div>
              
              <Button asChild variant="outline" className="w-full">
                <Link to={`/companies/${company.id}`}>
                  View All Jobs at {company.name}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
