import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Save, Share2, Undo, Redo, Download } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";

const DesignStudio = () => {
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
  const [projectData, setProjectData] = useState<any>({});
  
  const debouncedProjectData = useDebounce(projectData, 2000);

  // Load existing project if projectId is present
  useEffect(() => {
    if (projectId) {
      loadProject();
    }
  }, [projectId]);

  // Auto-save when project data changes
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
        .single();

      if (error) throw error;

      if (project) {
        setTitle(project.title);
        setPrompt(project.pattern_data.prompt || "");
        setMeasurements(project.pattern_data.measurements || {
          bust: 36,
          waist: 28,
          hips: 38,
        });
        setProjectData(project.pattern_data);
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

      const projectPayload = {
        title,
        pattern_data: {
          prompt,
          measurements,
          ...projectData
        },
        user_id: session.session.user.id,
        is_draft: true
      };

      let result;
      
      if (projectId) {
        // Update existing project
        result = await supabase
          .from('projects')
          .update(projectPayload)
          .eq('id', projectId)
          .select()
          .single();
      } else {
        // Create new project
        result = await supabase
          .from('projects')
          .insert([projectPayload])
          .select()
          .single();
      }

      if (result.error) throw result.error;

      setLastSaved(new Date());
      if (!isAutoSave) {
        toast.success("Project saved successfully");
      }
      
      // Update URL with project ID for new projects
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
    // TODO: Implement pattern export functionality
    toast.info("Export functionality coming soon!");
  };

  const handleShare = () => {
    // TODO: Implement sharing functionality
    toast.info("Sharing functionality coming soon!");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-xl font-semibold bg-transparent border-0 px-0 focus-visible:ring-0 w-[300px]"
            />
            <span className="text-sm text-muted-foreground">
              {lastSaved ? `Last saved ${new Date(lastSaved).toLocaleTimeString()}` : "Not saved yet"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.info("Undo functionality coming soon!")}
            >
              <Undo className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.info("Redo functionality coming soon!")}
            >
              <Redo className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => saveProject()}
              disabled={isSaving}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Controls */}
          <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
            <div>
              <h2 className="text-2xl font-display font-semibold mb-4">Design Studio</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="prompt">Describe your design</Label>
                  <Input
                    id="prompt"
                    placeholder="E.g., A-line dress with ruffled sleeves..."
                    value={prompt}
                    onChange={(e) => {
                      setPrompt(e.target.value);
                      setProjectData(prev => ({
                        ...prev,
                        prompt: e.target.value
                      }));
                    }}
                  />
                </div>
                <Button className="w-full">Generate Pattern</Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Measurements</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Bust: {measurements.bust}"</Label>
                  <Slider
                    value={[measurements.bust]}
                    min={28}
                    max={50}
                    step={0.5}
                    onValueChange={(value) => {
                      const newMeasurements = { ...measurements, bust: value[0] };
                      setMeasurements(newMeasurements);
                      setProjectData(prev => ({
                        ...prev,
                        measurements: newMeasurements
                      }));
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Waist: {measurements.waist}"</Label>
                  <Slider
                    value={[measurements.waist]}
                    min={22}
                    max={44}
                    step={0.5}
                    onValueChange={(value) => {
                      const newMeasurements = { ...measurements, waist: value[0] };
                      setMeasurements(newMeasurements);
                      setProjectData(prev => ({
                        ...prev,
                        measurements: newMeasurements
                      }));
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Hips: {measurements.hips}"</Label>
                  <Slider
                    value={[measurements.hips]}
                    min={30}
                    max={52}
                    step={0.5}
                    onValueChange={(value) => {
                      const newMeasurements = { ...measurements, hips: value[0] };
                      setMeasurements(newMeasurements);
                      setProjectData(prev => ({
                        ...prev,
                        measurements: newMeasurements
                      }));
                    }}
                  />
                </div>
              </div>
            </div>

            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" className="w-full">Advanced Settings</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Advanced Pattern Settings</DrawerTitle>
                </DrawerHeader>
                <div className="p-4 space-y-4">
                  {/* Placeholder for advanced settings */}
                  <p className="text-muted-foreground">Advanced settings coming soon...</p>
                </div>
              </DrawerContent>
            </Drawer>
          </div>

          {/* Center Panel - Pattern View */}
          <div className="bg-gray-50 p-6 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-full aspect-square bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <p className="text-gray-500">2D Pattern View</p>
              </div>
              <Button variant="secondary">Toggle 3D View</Button>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">3D Preview</h3>
            <div className="aspect-[3/4] bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <p className="text-gray-500">3D Preview Coming Soon</p>
            </div>
            <div className="mt-4 space-y-2">
              <Button className="w-full" variant="secondary">Customize Avatar</Button>
              <Button className="w-full" variant="default" onClick={handleExport}>Export Pattern</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignStudio;