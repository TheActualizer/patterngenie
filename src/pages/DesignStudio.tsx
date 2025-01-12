import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { useDebounce } from "@/hooks/use-debounce";
import { ProjectHeader } from "@/components/design-studio/ProjectHeader";
import { DesignControls } from "@/components/design-studio/DesignControls";
import { PatternPreview } from "@/components/design-studio/PatternPreview";

interface PatternData {
  prompt: string;
  measurements: {
    bust: number;
    waist: number;
    hips: number;
  };
}

export default function DesignStudio() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("project");
  
  const [prompt, setPrompt] = useState("");
  const [measurements, setMeasurements] = useState({
    bust: 36,
    waist: 28,
    hips: 38,
  });
  const [title, setTitle] = useState("Untitled Project");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [projectData, setProjectData] = useState<PatternData>({
    prompt: "",
    measurements: {
      bust: 36,
      waist: 28,
      hips: 38,
    },
  });
  
  const debouncedProjectData = useDebounce(projectData, 2000);

  useEffect(() => {
    if (projectId) {
      loadProject();
    }
  }, [projectId]);

  useEffect(() => {
    if (projectId && debouncedProjectData) {
      saveProject(true);
    }
  }, [debouncedProjectData]);

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
        .maybeSingle();

      if (error) throw error;

      if (project) {
        setTitle(project.title);
        // Safely cast the pattern_data to PatternData with type checking
        const patternData = project.pattern_data as { prompt?: string; measurements?: { bust: number; waist: number; hips: number; } };
        setPrompt(patternData.prompt || "");
        setMeasurements(patternData.measurements || {
          bust: 36,
          waist: 28,
          hips: 38,
        });
        setProjectData({
          prompt: patternData.prompt || "",
          measurements: patternData.measurements || {
            bust: 36,
            waist: 28,
            hips: 38,
          }
        });
        setLastSaved(new Date(project.updated_at));
      }
    } catch (error) {
      console.error('Error loading project:', error);
      toast.error("Failed to load project");
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

      const currentPatternData: PatternData = {
        prompt,
        measurements,
      };

      const projectPayload = {
        title,
        pattern_data: currentPatternData,
        user_id: session.session.user.id,
        is_draft: true,
      };

      let result;
      
      if (projectId) {
        const { data, error } = await supabase
          .from('projects')
          .update(projectPayload)
          .eq('id', projectId)
          .select()
          .single();
          
        if (error) throw error;
        result = { data, error };
      } else {
        const { data, error } = await supabase
          .from('projects')
          .insert([projectPayload])
          .select()
          .single();
          
        if (error) throw error;
        result = { data, error };
      }

      if (result.error) throw result.error;

      setLastSaved(new Date());
      
      if (!isAutoSave) {
        toast.success("Project saved successfully");
      }
      
      if (!projectId && result.data) {
        navigate(`/design-studio?project=${result.data.id}`, { replace: true });
      }
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

  const handleShare = () => {
    toast.info("Sharing functionality coming soon!");
  };

  useEffect(() => {
    setProjectData({
      prompt,
      measurements,
    });
  }, [prompt, measurements]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <ProjectHeader
          title={title}
          setTitle={setTitle}
          lastSaved={lastSaved}
          isSaving={isSaving}
          onSave={() => saveProject()}
          onShare={handleShare}
          onExport={handleExport}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <DesignControls
            prompt={prompt}
            setPrompt={setPrompt}
            measurements={measurements}
            setMeasurements={setMeasurements}
          />
          <div className="lg:col-span-2 space-y-8">
            <PatternPreview onExport={handleExport} />
          </div>
        </div>
      </div>
    </div>
  );
}