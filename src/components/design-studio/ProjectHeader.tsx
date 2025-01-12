import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Share2, Undo, Redo, Download, Plus } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface ProjectHeaderProps {
  title: string;
  setTitle: (title: string) => void;
  lastSaved: Date | null;
  isSaving: boolean;
  onSave: () => void;
  onShare: () => void;
  onExport: () => void;
}

export const ProjectHeader = ({
  title,
  setTitle,
  lastSaved,
  isSaving,
  onSave,
  onShare,
  onExport,
}: ProjectHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-display font-semibold text-center text-gray-900">Design Studio</h1>
      
      <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100/50 p-4 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/design-studio')}
            className="gap-2 hover:bg-primary hover:text-white transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Pattern
          </Button>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toast.info("Undo functionality coming soon!")}
              className="text-gray-500 hover:text-gray-700"
            >
              <Undo className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toast.info("Redo functionality coming soon!")}
              className="text-gray-500 hover:text-gray-700"
            >
              <Redo className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onShare}
              className="text-gray-500 hover:text-gray-700"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onExport}
              className="text-gray-500 hover:text-gray-700"
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button
              onClick={onSave}
              disabled={isSaving}
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-xl font-display font-medium bg-transparent border-0 px-0 focus-visible:ring-0 text-center w-full max-w-md"
            placeholder="Enter project name..."
          />
          <span className="text-sm text-gray-500">
            {lastSaved ? `Last saved ${lastSaved.toLocaleTimeString()}` : "Not saved yet"}
          </span>
        </div>
      </div>
    </div>
  );
};