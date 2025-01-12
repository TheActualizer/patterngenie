import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Settings } from "lucide-react";
import { AdvancedSettingsContent } from "./AdvancedSettingsContent";
import { useState } from "react";
import { toast } from "sonner";

interface Measurements {
  bust: number;
  waist: number;
  hips: number;
}

interface DesignControlsProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  measurements: Measurements;
  setMeasurements: (measurements: Measurements) => void;
}

export const DesignControls = ({
  prompt,
  setPrompt,
  measurements,
  setMeasurements,
}: DesignControlsProps) => {
  const [fabricType, setFabricType] = useState("woven");
  const [designStyle, setDesignStyle] = useState("casual");
  const [features, setFeatures] = useState<string[]>([]);

  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100/50 p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-display font-semibold text-gray-900 mb-6">Design Studio</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prompt" className="text-sm font-medium text-gray-700">Describe your design</Label>
            <Input
              id="prompt"
              placeholder="E.g., A-line dress with ruffled sleeves..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full"
            />
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90">Generate Pattern</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Measurements</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-medium text-gray-700">Bust</Label>
              <span className="text-sm text-gray-500">{measurements.bust}"</span>
            </div>
            <Slider
              value={[measurements.bust]}
              min={28}
              max={50}
              step={0.5}
              onValueChange={(value) => setMeasurements({ ...measurements, bust: value[0] })}
              className="my-2"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-medium text-gray-700">Waist</Label>
              <span className="text-sm text-gray-500">{measurements.waist}"</span>
            </div>
            <Slider
              value={[measurements.waist]}
              min={22}
              max={44}
              step={0.5}
              onValueChange={(value) => setMeasurements({ ...measurements, waist: value[0] })}
              className="my-2"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-medium text-gray-700">Hips</Label>
              <span className="text-sm text-gray-500">{measurements.hips}"</span>
            </div>
            <Slider
              value={[measurements.hips]}
              min={30}
              max={52}
              step={0.5}
              onValueChange={(value) => setMeasurements({ ...measurements, hips: value[0] })}
              className="my-2"
            />
          </div>
        </div>
      </div>

      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" className="w-full gap-2 hover:bg-primary hover:text-white transition-colors">
            <Settings className="w-4 h-4" />
            Advanced Settings
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Advanced Pattern Settings</DrawerTitle>
          </DrawerHeader>
          <AdvancedSettingsContent
            fabricType={fabricType}
            setFabricType={setFabricType}
            designStyle={designStyle}
            setDesignStyle={setDesignStyle}
            features={features}
            setFeatures={setFeatures}
          />
        </DrawerContent>
      </Drawer>
    </div>
  );
};