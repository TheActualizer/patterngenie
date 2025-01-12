import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Share2, Undo, Redo, Download } from "lucide-react";

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
  return (
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
          onClick={onShare}
        >
          <Share2 className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
        >
          <Download className="w-4 h-4" />
        </Button>
        <Button
          onClick={onSave}
          disabled={isSaving}
          className="gap-2"
        >
          <Save className="w-4 h-4" />
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
};