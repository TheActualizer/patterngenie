import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { ProjectsHeader } from "@/components/projects/ProjectsHeader";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { EmptyState } from "@/components/projects/EmptyState";

interface Project {
  id: string;
  title: string;
  description: string | null;
  pattern_data: any;
  is_draft: boolean;
  created_at: string;
  updated_at: string;
  published_pattern_id: string | null;
  published_at: string | null;
}

export default function Projects() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects();
  }, []);

  async function getProjects() {
    try {
      console.log('Fetching projects...');
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      console.log('User ID:', session.user.id);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', session.user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      
      console.log('Fetched projects:', data);
      setProjects(data || []);
    } catch (error) {
      console.error('Error loading projects:', error);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  }

  const handleCreateProject = () => {
    navigate('/design-studio');
  };

  const handleProjectDeleted = (projectId: string) => {
    setProjects(projects.filter(p => p.id !== projectId));
  };

  const handleProjectDuplicated = async (project: Project) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }

      const duplicatedProject = {
        title: `${project.title} (Copy)`,
        description: project.description,
        pattern_data: project.pattern_data,
        is_draft: true,
        user_id: session.user.id,
      };

      const { data, error } = await supabase
        .from('projects')
        .insert([duplicatedProject])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setProjects([data, ...projects]);
        toast.success("Project duplicated successfully");
      }
    } catch (error) {
      console.error('Error duplicating project:', error);
      toast.error("Failed to duplicate project");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto py-8">
        <ProjectsHeader onCreateProject={handleCreateProject} />
        {projects.length === 0 ? (
          <EmptyState onCreateProject={handleCreateProject} />
        ) : (
          <ProjectsGrid
            projects={projects}
            onProjectDeleted={handleProjectDeleted}
            onProjectDuplicated={handleProjectDuplicated}
          />
        )}
      </main>
    </div>
  );
}