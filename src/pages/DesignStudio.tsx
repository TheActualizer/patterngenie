import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";
import { Navbar } from "@/components/Navbar";
import { useDebounce } from "@/hooks/use-debounce";
import { ProjectHeader } from "@/components/design-studio/ProjectHeader";
import { DesignControls } from "@/components/design-studio/DesignControls";
import { PatternPreview } from "@/components/design-studio/PatternPreview";
import { ChatBot } from "@/components/design-studio/ChatBot";

interface PatternData {
  prompt: string;
}

export default function DesignStudio() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("project");
  
  const [prompt, setPrompt] = useState("");
  const [title, setTitle] = useState("Untitled Project");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [projectData, setProjectData] = useState<PatternData>({
    prompt: "",
  });
  
  const debouncedProjectData = useDebounce(projectData, 2000);

  useEffect(() => {
    if (projectId) {
      loadProject();
    } else {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (!isLoading && projectId && debouncedProjectData) {
      saveProject(true);
    }
  }, [debouncedProjectData, isLoading]);

  const loadProject = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session) {
        navigate('/auth');
        return;
      }

      const { data: project, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (error) throw error;

      if (project) {
        console.log('Loading project data:', project);
        const patternData = project.pattern_data as { prompt?: string; measurements?: { bust: number; waist: number; hips: number; } };
        
        setTitle(project.title);
        setPrompt(patternData.prompt || "");
        setProjectData({
          prompt: patternData.prompt || "",
        });
        setLastSaved(new Date(project.updated_at));
      }
    } catch (error) {
      console.error('Error loading project:', error);
      toast.error("Failed to load project");
    } finally {
      setIsLoading(false);
    }
  };

  const saveProject = async (isAutoSave = false) => {
    try {
      setIsSaving(true);
      const { data: session } = await supabase.auth.getSession();
      
      if (!session?.session) {
        navigate('/auth');
        return;
      }

      const userId = session.session.user.id;
      console.log('Saving project for user:', userId);

      const projectPayload = {
        title,
        pattern_data: {
          prompt,
        } as Json,
        user_id: userId,
        is_draft: true,
      };

      let result;
      
      if (projectId) {
        console.log('Updating existing project:', projectId);
        const { data, error } = await supabase
          .from('projects')
          .update(projectPayload)
          .eq('id', projectId)
          .select()
          .single();
          
        if (error) throw error;
        result = { data, error };
      } else {
        console.log('Creating new project');
        const { data, error } = await supabase
          .from('projects')
          .insert([projectPayload])
          .select()
          .single();
          
        if (error) throw error;
        result = { data, error };
      }

      setLastSaved(new Date());
      
      if (!isAutoSave) {
        toast.success("Project saved successfully");
      }
      
      if (!projectId && result.data) {
        navigate(`/design-studio?project=${result.data.id}`, { replace: true });
      }

      console.log('Project saved successfully:', result.data);
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error("Failed to save project");
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = () => {
    toast.info("Export functionality coming soon!");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-display font-semibold text-center text-gray-900 mb-6">
          Design Studio
        </h1>
        
        <ProjectHeader
          title={title}
          setTitle={setTitle}
          lastSaved={lastSaved}
          isSaving={isSaving}
          onSave={() => saveProject()}
          onExport={handleExport}
        />

        <div className="mt-6 space-y-4 px-4 sm:px-6">
          <DesignControls
            prompt={prompt}
            setPrompt={setPrompt}
          />
          <PatternPreview onExport={handleExport} />
        </div>
      </div>
      <ChatBot />
    </div>
  );
}