import { ProjectHeader } from "@/components/design-studio/ProjectHeader";
import { DesignControls } from "@/components/design-studio/DesignControls";
import { PatternPreview } from "@/components/design-studio/PatternPreview";

const DesignStudio = () => {
  const handleExport = () => {
    // Handle export logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/50 to-white">
      <ProjectHeader />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <DesignControls />
          <PatternPreview onExport={handleExport} />
        </div>
      </main>
    </div>
  );
};

export default DesignStudio;