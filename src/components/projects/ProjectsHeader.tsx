import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ProjectsHeaderProps {
  onCreateProject: () => void;
}

export const ProjectsHeader = ({ onCreateProject }: ProjectsHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold">My Projects</h1>
        <p className="text-muted-foreground">Manage your sewing projects</p>
      </div>
      <Button onClick={onCreateProject}>
        <Plus className="mr-2 h-4 w-4" />
        New Project
      </Button>
    </div>
  );
};