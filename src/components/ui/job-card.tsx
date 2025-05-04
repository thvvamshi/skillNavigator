
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Job } from "@/types";
import { Calendar, Briefcase, MapPin, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
  };

  return (
    <Card className="card-hover overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-xl">{job.title}</CardTitle>
          <Badge variant={job.type === "Full-time" ? "default" : "outline"}>
            {job.type}
          </Badge>
        </div>
        <div className="flex items-center text-muted-foreground">
          <Briefcase className="h-4 w-4 mr-1" />
          <Link to={`/companies/${job.companyId}`} className="hover:text-primary hover:underline">
            {job.company}
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{job.location}</span>
          </div>
          {job.salary && (
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              <span>{job.salary}</span>
            </div>
          )}
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Posted {formatDate(job.postedDate)}</span>
          </div>
        </div>
        <p className="text-gray-600 line-clamp-2 h-12 mb-4">{job.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
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
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <Badge variant="outline">{job.experience}</Badge>
        <Button size="sm" asChild>
          <Link to={`/jobs/${job.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
