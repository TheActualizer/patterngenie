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
    <div className="flex justify-between items-center mb-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100/50 p-4">
      <div className="flex items-center gap-6">
        <div className="flex flex-col gap-1">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl font-display font-semibold bg-transparent border-0 px-0 focus-visible:ring-0 w-[300px]"
          />
          <span className="text-sm text-gray-500 ml-1">
            {lastSaved ? `Last saved ${lastSaved.toLocaleTimeString()}` : "Not saved yet"}
          </span>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate('/design-studio')}
          className="gap-2 hover:bg-primary hover:text-white transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Pattern
        </Button>
      </div>
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
  );
};