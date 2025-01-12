import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

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
  return (
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
            <p className="text-muted-foreground">Advanced settings coming soon...</p>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};