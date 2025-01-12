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
import { supabase } from "@/integrations/supabase/client";

interface PatternPreviewProps {
  onExport: () => void;
}

export const PatternPreview = ({ onExport }: PatternPreviewProps) => {
  const [selectedFormat, setSelectedFormat] = useState<string>("pdf");
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleExport = async () => {
    try {
      setIsProcessing(true);
      
      // Get current user session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Please sign in to export patterns");
        return;
      }

      // Create checkout session
      const { data, error } = await supabase.functions.invoke('create-pattern-checkout', {
        body: { patternId: 'your-pattern-id' }, // You'll need to pass the actual pattern ID here
      });

      if (error) throw error;

      // Redirect to Stripe Checkout
      if (data?.url) {
        window.location.href = data.url;
      }

    } catch (error) {
      console.error('Export error:', error);
      toast.error("Failed to process export");
    } finally {
      setIsProcessing(false);
      setShowExportDialog(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">3D Preview</h3>
        <div className="aspect-[3/4] bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center mb-4 transition-colors hover:bg-gray-100/50">
          <p className="text-gray-500 font-medium">3D Preview Coming Soon</p>
        </div>
        <Button variant="outline" className="w-full">Toggle View Mode</Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="text-center space-y-4">
          <div className="w-full aspect-square bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center transition-colors hover:bg-gray-100/50">
            <p className="text-gray-500 font-medium">2D Pattern View</p>
          </div>
        </div>
      </div>

      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogTrigger asChild>
          <Button className="w-full" variant="default">Export Pattern</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Pattern</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Select Export Format
              </label>
              <Select
                value={selectedFormat}
                onValueChange={setSelectedFormat}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF (Print Ready)</SelectItem>
                  <SelectItem value="dxf">DXF (CAD Software)</SelectItem>
                  <SelectItem value="svg">SVG (Vector Graphics)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500">
                {selectedFormat === "pdf" && "Best for home printing and professional print shops"}
                {selectedFormat === "dxf" && "Compatible with CAD software and cutting machines"}
                {selectedFormat === "svg" && "Ideal for digital editing and scaling"}
              </p>
            </div>
            <Button 
              onClick={handleExport} 
              className="w-full"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : `Export as ${selectedFormat.toUpperCase()}`}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};