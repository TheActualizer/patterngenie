import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Download, Trash, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  title: string;
  description: string | null;
  pattern_data: any;
  is_draft: boolean;
  created_at: string;
  updated_at: string;
}

interface ProjectCardProps {
  project: Project;
  onProjectDeleted: (projectId: string) => void;
  onProjectDuplicated: (project: Project) => void;
}

export const ProjectCard = ({ project, onProjectDeleted, onProjectDuplicated }: ProjectCardProps) => {
  const navigate = useNavigate();
  const [deletingProject, setDeletingProject] = useState(false);

  const handleDeleteProject = async () => {
    try {
      setDeletingProject(true);
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', project.id);

      if (error) throw error;

      onProjectDeleted(project.id);
      toast.success("Project deleted successfully");
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error("Failed to delete project");
    } finally {
      setDeletingProject(false);
    }
  };

  const handleExportProject = () => {
    try {
      const projectData = {
        title: project.title,
        description: project.description,
        pattern_data: project.pattern_data,
        exported_at: new Date().toISOString(),
      };

      const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${project.title.toLowerCase().replace(/\s+/g, '-')}-export.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Project exported successfully");
    } catch (error) {
      console.error('Error exporting project:', error);
      toast.error("Failed to export project");
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold truncate">
            {project.title || 'Untitled Project'}
          </CardTitle>
          <div className="flex items-center gap-2">
            {project.is_draft && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                Draft
              </span>
            )}
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleExportProject}
                className="h-8 w-8 p-0"
              >
                <Download className="h-4 w-4" />
                <span className="sr-only">Export project</span>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Delete project</span>
                  </Button>
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
                      onClick={handleDeleteProject}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      {deletingProject ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Delete"
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
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
  );
};