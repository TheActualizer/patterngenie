import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Share2, Undo, Redo, Download, Plus, Pencil } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProjectHeaderProps {
  title: string;
  setTitle: (title: string) => void;
  lastSaved: Date | null;
  isSaving: boolean;
  onSave: () => void;
  onExport: () => void;
}

export const ProjectHeader = ({
  title,
  setTitle,
  lastSaved,
  isSaving,
  onSave,
  onExport,
}: ProjectHeaderProps) => {
  const navigate = useNavigate();
  const currentUrl = window.location.href;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy link:", err);
      toast.error("Failed to copy link");
    }
  };

  const handleShareOnTwitter = () => {
    const text = encodeURIComponent(`Check out my pattern design "${title}" on Lovable!`);
    const url = encodeURIComponent(currentUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleShareOnFacebook = () => {
    const url = encodeURIComponent(currentUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const handleSave = () => {
    onSave();
    toast.success("Project saved! View it in the Projects tab.", {
      action: {
        label: "View Projects",
        onClick: () => navigate('/projects')
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 p-4 space-y-4">
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
            <div className="border border-gray-200 rounded-lg p-1 flex items-center gap-1 bg-white/50">
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
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Share Pattern</DialogTitle>
                    <DialogDescription>
                      Share your pattern design with others
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Input
                        readOnly
                        value={currentUrl}
                        className="flex-1"
                      />
                      <Button onClick={handleCopyLink} variant="secondary">
                        Copy Link
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleShareOnTwitter}
                        variant="outline"
                        className="flex-1"
                      >
                        Share on Twitter
                      </Button>
                      <Button
                        onClick={handleShareOnFacebook}
                        variant="outline"
                        className="flex-1"
                      >
                        Share on Facebook
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button
                variant="ghost"
                size="sm"
                onClick={onExport}
                className="text-gray-500 hover:text-gray-700"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="relative w-full max-w-md">
            <div className="flex items-center justify-center gap-2 bg-gray-50/80 hover:bg-gray-100/80 transition-colors rounded-lg px-4 py-2">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-xl font-display font-medium bg-transparent border-0 px-0 focus-visible:ring-0 text-center w-full placeholder:text-gray-400"
                placeholder="Enter project name..."
              />
              <Pencil className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </div>
          </div>
          <span className="text-sm text-gray-500">
            {lastSaved ? `Last saved ${lastSaved.toLocaleTimeString()}` : "Not saved yet"}
          </span>
        </div>
      </div>
    </div>
  );
};