
import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useData } from "@/context/DataContext";

const SkillSelector: React.FC = () => {
  const { skills, selectedSkills, addSkill, removeSkill, clearSkills, searchJobsBySkills } = useData();
  const [inputValue, setInputValue] = useState("");
  
  const handleAddSkill = () => {
    if (inputValue.trim()) {
      addSkill(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddSkill();
    }
  };

  const handleSearch = () => {
    searchJobsBySkills();
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Enter your skills (e.g., React, JavaScript, AWS)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full"
          />
          {inputValue && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-transparent"
              onClick={() => setInputValue("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button type="button" onClick={handleAddSkill}>
          Add Skill
        </Button>
        <Button type="button" variant="default" className="bg-hero-gradient hover:opacity-90" onClick={handleSearch}>
          Search Jobs
        </Button>
      </div>
      
      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedSkills.map((skill, index) => (
            <div key={index} className="skill-tag flex items-center space-x-1">
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="ml-1 rounded-full hover:bg-secondary/50 p-1"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          {selectedSkills.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearSkills}>
              Clear All
            </Button>
          )}
        </div>
      )}
      
      <div className="mt-2 text-sm text-muted-foreground">
        <p>Popular skills: 
          {skills.slice(0, 5).map((skill, index) => (
            <button
              key={skill.id}
              className="text-primary hover:underline ml-1"
              onClick={() => addSkill(skill.name)}
            >
              {skill.name}{index < 4 ? "," : ""}
            </button>
          ))}
        </p>
      </div>
    </div>
  );
};

export default SkillSelector;
