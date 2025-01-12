import { Button } from "@/components/ui/button";

interface PatternPreviewProps {
  onExport: () => void;
}

export const PatternPreview = ({ onExport }: PatternPreviewProps) => {
  return (
    <>
      <div className="bg-gray-50 p-6 rounded-lg flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-full aspect-square bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
            <p className="text-gray-500">2D Pattern View</p>
          </div>
          <Button variant="secondary">Toggle 3D View</Button>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">3D Preview</h3>
        <div className="aspect-[3/4] bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
          <p className="text-gray-500">3D Preview Coming Soon</p>
        </div>
        <div className="mt-4 space-y-2">
          <Button className="w-full" variant="secondary">Customize Avatar</Button>
          <Button className="w-full" variant="default" onClick={onExport}>Export Pattern</Button>
        </div>
      </div>
    </>
  );
};