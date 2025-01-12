import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Settings } from "lucide-react";
import { AdvancedSettingsContent } from "./AdvancedSettingsContent";
import { useState } from "react";
import { AvatarCustomization } from "./AvatarCustomization";
import { PatternChat } from "./PatternChat";

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

      <PatternChat 
        prompt={prompt}
        setPrompt={setPrompt}
        fabricType={fabricType}
        designStyle={designStyle}
      />
    </div>
  );
};