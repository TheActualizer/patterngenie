import { useState } from "react";
import { AvatarCustomization } from "./AvatarCustomization";
import { AdvancedSettingsContent } from "./AdvancedSettingsContent";
import { PatternChat } from "./PatternChat";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";

export const DesignControls = () => {
  const [fabricType, setFabricType] = useState("woven");
  const [designStyle, setDesignStyle] = useState("casual");
  const [features, setFeatures] = useState<string[]>([]);

  return (
    <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl bg-white/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100/50 p-4 md:p-6 space-y-6">
      <AvatarCustomization />
      
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" className="w-full">
            <Settings2 className="w-4 h-4 mr-2" />
            Advanced Settings
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Advanced Pattern Settings</DrawerTitle>
            <DrawerDescription>
              Fine-tune your pattern with advanced customization options
            </DrawerDescription>
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

      <PatternChat />
    </div>
  );
};