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
    <div className="space-y-8">
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl p-8 transition-all duration-300 hover:shadow-2xl hover:bg-white/15">
        <h3 className="text-lg font-semibold mb-6 text-white/90 font-display">3D Preview</h3>
        <div className="aspect-[3/4] bg-black/20 rounded-lg border-2 border-dashed border-white/20 flex items-center justify-center mb-6 transition-colors hover:bg-black/30">
          <p className="text-white/60 font-medium">3D Preview Coming Soon</p>
        </div>
        <Button variant="outline" className="w-full border-white/20 backdrop-blur-sm hover:bg-white/10">
          Toggle View Mode
        </Button>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl p-8 transition-all duration-300 hover:shadow-2xl hover:bg-white/15">
        <div className="text-center space-y-6">
          <div className="w-full aspect-square bg-black/20 rounded-lg border-2 border-dashed border-white/20 flex items-center justify-center transition-colors hover:bg-black/30">
            <p className="text-white/60 font-medium">2D Pattern View</p>
          </div>
          
          <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
            <DialogTrigger asChild>
              <Button className="w-full bg-primary hover:bg-primary/90">Export Pattern</Button>
            </DialogTrigger>
            <DialogContent className="bg-white/10 backdrop-blur-xl border border-white/20">
              <DialogHeader>
                <DialogTitle className="text-white/90">Export Pattern</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">
                    Select Export Format
                  </label>
                  <Select
                    value={selectedFormat}
                    onValueChange={setSelectedFormat}
                  >
                    <SelectTrigger className="border-white/20 bg-black/20">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF (Print Ready)</SelectItem>
                      <SelectItem value="dxf">DXF (CAD Software)</SelectItem>
                      <SelectItem value="svg">SVG (Vector Graphics)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-white/60">
                    {selectedFormat === "pdf" && "Best for home printing and professional print shops"}
                    {selectedFormat === "dxf" && "Compatible with CAD software and cutting machines"}
                    {selectedFormat === "svg" && "Ideal for digital editing and scaling"}
                  </p>
                </div>
                <Button onClick={handleExport} className="w-full bg-primary hover:bg-primary/90">
                  Export as {selectedFormat.toUpperCase()}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};