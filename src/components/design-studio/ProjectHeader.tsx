import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Share2, Undo, Redo, Download, Plus } from "lucide-react";
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

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl p-6 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/design-studio')}
            className="gap-2 hover:bg-primary hover:text-white transition-colors border-white/20"
          >
            <Plus className="w-4 h-4" />
            New Pattern
          </Button>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toast.info("Undo functionality coming soon!")}
              className="text-white/60 hover:text-white/90"
            >
              <Undo className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toast.info("Redo functionality coming soon!")}
              className="text-white/60 hover:text-white/90"
            >
              <Redo className="w-4 h-4" />
            </Button>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/60 hover:text-white/90"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white/10 backdrop-blur-xl border border-white/20">
                <DialogHeader>
                  <DialogTitle className="text-white/90">Share Pattern</DialogTitle>
                  <DialogDescription className="text-white/60">
                    Share your pattern design with others
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Input
                      readOnly
                      value={currentUrl}
                      className="flex-1 bg-black/20 border-white/20 text-white/90"
                    />
                    <Button onClick={handleCopyLink} variant="secondary" className="backdrop-blur-sm">
                      Copy Link
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleShareOnTwitter}
                      variant="outline"
                      className="flex-1 border-white/20"
                    >
                      Share on Twitter
                    </Button>
                    <Button
                      onClick={handleShareOnFacebook}
                      variant="outline"
                      className="flex-1 border-white/20"
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
              className="text-white/60 hover:text-white/90"
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
            className="text-xl font-display font-medium bg-transparent border-0 px-0 focus-visible:ring-0 text-center w-full max-w-md text-white/90"
            placeholder="Enter project name..."
          />
          <span className="text-sm text-white/60">
            {lastSaved ? `Last saved ${lastSaved.toLocaleTimeString()}` : "Not saved yet"}
          </span>
        </div>
      </div>
    </div>
  );
};