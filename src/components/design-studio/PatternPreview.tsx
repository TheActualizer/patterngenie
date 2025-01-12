import { Button } from "@/components/ui/button";

interface PatternPreviewProps {
  onExport: () => void;
}

export const PatternPreview = ({ onExport }: PatternPreviewProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="text-center space-y-4">
          <div className="w-full aspect-square bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center transition-colors hover:bg-gray-100/50">
            <p className="text-gray-500 font-medium">2D Pattern View</p>
          </div>
          <Button variant="outline" className="w-full">Toggle 3D View</Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">3D Preview</h3>
        <div className="aspect-[3/4] bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center mb-4 transition-colors hover:bg-gray-100/50">
          <p className="text-gray-500 font-medium">3D Preview Coming Soon</p>
        </div>
        <div className="space-y-2">
          <Button className="w-full" variant="outline">Customize Avatar</Button>
          <Button className="w-full" variant="default" onClick={onExport}>Export Pattern</Button>
        </div>
      </div>
    </div>
  );
};