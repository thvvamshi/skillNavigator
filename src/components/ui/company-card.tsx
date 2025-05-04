
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Company } from "@/types";
import { MapPin, Briefcase } from "lucide-react";

interface CompanyCardProps {
  company: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <Card className="card-hover overflow-hidden">
      <CardHeader className="pb-0">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 p-2 bg-accent rounded-md flex items-center justify-center">
            <img src={company.logo} alt={company.name} className="h-12 w-12 object-contain" />
          </div>
          <div>
            <h3 className="text-xl font-bold">{company.name}</h3>
            <div className="flex items-center text-muted-foreground text-sm mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{company.location}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-4">
        <p className="text-gray-600 line-clamp-2 h-12 mb-4">{company.description}</p>
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Briefcase className="h-4 w-4 mr-1" />
          <span>{company.jobs.length} open positions</span>
        </div>
        <div className="flex justify-between items-center">
          <Badge variant="outline">{company.industry}</Badge>
          <Button size="sm" asChild>
            <Link to={`/companies/${company.id}`}>View Jobs</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
