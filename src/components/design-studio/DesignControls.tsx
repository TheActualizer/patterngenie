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
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl p-6 animate-fade-in">
        <AvatarCustomization />
      </div>
      
      <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl p-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
        <Drawer>
          <DrawerTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full gap-2 bg-white/5 border-white/20 text-white hover:bg-white/10 transition-all"
            >
              <Settings className="w-4 h-4" />
              Advanced Settings
            </Button>
          </DrawerTrigger>
          <DrawerContent className="bg-gray-900/95 backdrop-blur-md border-t border-white/20">
            <DrawerHeader>
              <DrawerTitle className="text-white">Advanced Pattern Settings</DrawerTitle>
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

      <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl p-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
        <PatternChat 
          prompt={prompt}
          setPrompt={setPrompt}
          fabricType={fabricType}
          designStyle={designStyle}
        />
      </div>
    </div>
  );
};