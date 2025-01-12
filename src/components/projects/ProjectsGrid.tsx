import { ProjectCard } from "./ProjectCard";

interface Project {
  id: string;
  title: string;
  description: string | null;
  pattern_data: any;
  is_draft: boolean;
  created_at: string;
  updated_at: string;
}

interface ProjectsGridProps {
  projects: Project[];
  onProjectDeleted: (projectId: string) => void;
  onProjectDuplicated: (project: Project) => void;
}

export const ProjectsGrid = ({ projects, onProjectDeleted, onProjectDuplicated }: ProjectsGridProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onProjectDeleted={onProjectDeleted}
          onProjectDuplicated={onProjectDuplicated}
        />
      ))}
    </div>
  );
};