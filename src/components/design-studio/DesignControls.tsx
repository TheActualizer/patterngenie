import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Settings } from "lucide-react";
import { AdvancedSettingsContent } from "./AdvancedSettingsContent";
import { useState } from "react";
import { AvatarCustomization } from "./AvatarCustomization";

interface DesignControlsProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
}

export const DesignControls = ({
  prompt,
  setPrompt,
}: DesignControlsProps) => {
  const [fabricType, setFabricType] = useState("woven");
  const [designStyle, setDesignStyle] = useState("casual");
  const [features, setFeatures] = useState<string[]>([]);

  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100/50 p-6 space-y-6">
      <AvatarCustomization />
      
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
  );
};