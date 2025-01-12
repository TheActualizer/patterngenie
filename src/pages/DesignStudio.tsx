import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useState } from "react";

const DesignStudio = () => {
  const [prompt, setPrompt] = useState("");
  const [measurements, setMeasurements] = useState({
    bust: 36,
    waist: 28,
    hips: 38,
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Controls */}
          <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
            <div>
              <h2 className="text-2xl font-display font-semibold mb-4">Design Studio</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="prompt">Describe your design</Label>
                  <Input
                    id="prompt"
                    placeholder="E.g., A-line dress with ruffled sleeves..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>
                <Button className="w-full">Generate Pattern</Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Measurements</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Bust: {measurements.bust}"</Label>
                  <Slider
                    value={[measurements.bust]}
                    min={28}
                    max={50}
                    step={0.5}
                    onValueChange={(value) => setMeasurements({ ...measurements, bust: value[0] })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Waist: {measurements.waist}"</Label>
                  <Slider
                    value={[measurements.waist]}
                    min={22}
                    max={44}
                    step={0.5}
                    onValueChange={(value) => setMeasurements({ ...measurements, waist: value[0] })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Hips: {measurements.hips}"</Label>
                  <Slider
                    value={[measurements.hips]}
                    min={30}
                    max={52}
                    step={0.5}
                    onValueChange={(value) => setMeasurements({ ...measurements, hips: value[0] })}
                  />
                </div>
              </div>
            </div>

            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" className="w-full">Advanced Settings</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Advanced Pattern Settings</DrawerTitle>
                </DrawerHeader>
                <div className="p-4 space-y-4">
                  {/* Placeholder for advanced settings */}
                  <p className="text-muted-foreground">Advanced settings coming soon...</p>
                </div>
              </DrawerContent>
            </Drawer>
          </div>

          {/* Center Panel - Pattern View */}
          <div className="bg-gray-50 p-6 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-full aspect-square bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <p className="text-gray-500">2D Pattern View</p>
              </div>
              <Button variant="secondary">Toggle 3D View</Button>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">3D Preview</h3>
            <div className="aspect-[3/4] bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <p className="text-gray-500">3D Preview Coming Soon</p>
            </div>
            <div className="mt-4 space-y-2">
              <Button className="w-full" variant="secondary">Customize Avatar</Button>
              <Button className="w-full" variant="success">Export Pattern</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignStudio;