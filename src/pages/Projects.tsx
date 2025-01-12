import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash, Copy, MoreVertical } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Project {
  id: string;
  title: string;
  description: string | null;
  pattern_data: any;
  is_draft: boolean;
  created_at: string;
  updated_at: string;
}

export default function Projects() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [deletingProject, setDeletingProject] = useState<string | null>(null);

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

      if (error) {
        console.error('Error fetching projects:', error);
        throw error;
      }
      
      console.log('Fetched projects:', data);
      if (data) {
        setProjects(data);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      toast({
        variant: "destructive",
        title: "Error loading projects",
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  }

  const handleCreateProject = () => {
    navigate('/design-studio');
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      setDeletingProject(projectId);
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;

      setProjects(projects.filter(p => p.id !== projectId));
      toast({
        title: "Project deleted",
        description: "Your project has been deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        variant: "destructive",
        title: "Error deleting project",
        description: "Please try again later.",
      });
    } finally {
      setDeletingProject(null);
    }
  };

  const handleDuplicateProject = async (project: Project) => {
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
        toast({
          title: "Project duplicated",
          description: "Your project has been duplicated successfully.",
        });
      }
    } catch (error) {
      console.error('Error duplicating project:', error);
      toast({
        variant: "destructive",
        title: "Error duplicating project",
        description: "Please try again later.",
      });
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Projects</h1>
            <p className="text-muted-foreground">Manage your sewing projects</p>
          </div>
          <Button onClick={handleCreateProject}>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        {projects.length === 0 ? (
          <Card className="text-center p-8">
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">You haven't created any projects yet.</p>
              <Button onClick={handleCreateProject}>Create Your First Project</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="truncate">{project.title || 'Untitled Project'}</span>
                    <div className="flex items-center gap-2">
                      {project.is_draft && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          Draft
                        </span>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleDuplicateProject(project)}
                            className="cursor-pointer"
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                                className="cursor-pointer text-destructive"
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete project?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete your
                                  project and remove all of its data.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteProject(project.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  {deletingProject === project.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    "Delete"
                                  )}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description || "No description"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Last updated: {new Date(project.updated_at).toLocaleDateString()}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate(`/design-studio?project=${project.id}`)}
                  >
                    Open Project
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}