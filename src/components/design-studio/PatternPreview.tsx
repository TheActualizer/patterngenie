import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

interface PatternPreviewProps {
  onExport: () => void;
}

export const PatternPreview = ({ onExport }: PatternPreviewProps) => {
  const [selectedFormat, setSelectedFormat] = useState<string>("pdf");
  const [showExportDialog, setShowExportDialog] = useState(false);

  const handleExport = () => {
    toast.info(`Exporting pattern in ${selectedFormat.toUpperCase()} format...`);
    onExport();
    setShowExportDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl p-6 animate-fade-in">
        <h3 className="text-lg font-semibold mb-4 text-white">3D Preview</h3>
        <div className="aspect-[3/4] bg-black/20 rounded-lg border-2 border-dashed border-white/10 flex items-center justify-center mb-4 transition-all hover:border-white/30 hover:bg-black/30">
          <p className="text-white/60 font-medium">3D Preview Coming Soon</p>
        </div>
        <Button variant="outline" className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10 transition-all">
          Toggle View Mode
        </Button>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl p-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
        <div className="text-center space-y-4">
          <div className="w-full aspect-square bg-black/20 rounded-lg border-2 border-dashed border-white/10 flex items-center justify-center transition-all hover:border-white/30 hover:bg-black/30">
            <p className="text-white/60 font-medium">2D Pattern View</p>
          </div>
          <Button 
            onClick={() => setShowExportDialog(true)}
            className="w-full bg-primary/90 hover:bg-primary transition-all shadow-lg hover:shadow-primary/20"
          >
            Export Pattern
          </Button>
        </div>
      </div>

      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent className="bg-gray-900/95 backdrop-blur-md border border-white/20">
          <DialogHeader>
            <DialogTitle className="text-white">Export Pattern</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Select Export Format
              </label>
              <Select
                value={selectedFormat}
                onValueChange={setSelectedFormat}
              >
                <SelectTrigger className="bg-black/50 border-white/20 text-white">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/20">
                  <SelectItem value="pdf">PDF (Print Ready)</SelectItem>
                  <SelectItem value="dxf">DXF (CAD Software)</SelectItem>
                  <SelectItem value="svg">SVG (Vector Graphics)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-400">
                {selectedFormat === "pdf" && "Best for home printing and professional print shops"}
                {selectedFormat === "dxf" && "Compatible with CAD software and cutting machines"}
                {selectedFormat === "svg" && "Ideal for digital editing and scaling"}
              </p>
            </div>
            <Button onClick={handleExport} className="w-full bg-primary/90 hover:bg-primary">
              Export as {selectedFormat.toUpperCase()}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};