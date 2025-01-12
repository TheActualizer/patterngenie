import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

interface AdvancedSettingsContentProps {
  fabricType: string;
  setFabricType: (value: string) => void;
  designStyle: string;
  setDesignStyle: (value: string) => void;
  features: string[];
  setFeatures: (features: string[]) => void;
}

export const AdvancedSettingsContent = ({
  fabricType,
  setFabricType,
  designStyle,
  setDesignStyle,
  features,
  setFeatures,
}: AdvancedSettingsContentProps) => {
  const handleFeatureToggle = (feature: string) => {
    if (features.includes(feature)) {
      setFeatures(features.filter((f) => f !== feature));
    } else {
      setFeatures([...features, feature]);
    }
  };

  return (
    <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-900">Fabric Type</h4>
        <RadioGroup value={fabricType} onValueChange={setFabricType} className="gap-3">
          {["Woven", "Knit", "Stretch", "Non-stretch", "Lightweight", "Medium weight", "Heavyweight"].map((type) => (
            <div key={type} className="flex items-center space-x-3">
              <RadioGroupItem value={type.toLowerCase()} id={`fabric-${type}`} />
              <Label htmlFor={`fabric-${type}`} className="text-sm text-gray-700">{type}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator className="bg-gray-100" />

      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-900">Design Style</h4>
        <RadioGroup value={designStyle} onValueChange={setDesignStyle} className="gap-3">
          {["Casual", "Formal", "Bohemian", "Minimalist", "Vintage", "Modern", "Romantic"].map((style) => (
            <div key={style} className="flex items-center space-x-3">
              <RadioGroupItem value={style.toLowerCase()} id={`style-${style}`} />
              <Label htmlFor={`style-${style}`} className="text-sm text-gray-700">{style}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator className="bg-gray-100" />

      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-900">Additional Features</h4>
        <div className="grid grid-cols-2 gap-4">
          {[
            "Pockets",
            "Lining",
            "Zipper closure",
            "Button closure",
            "Elastic waist",
            "Adjustable straps",
            "Belt loops",
            "Collar",
            "Cuffs",
            "Pleats",
            "Gathered details",
            "Ruffles",
          ].map((feature) => (
            <div key={feature} className="flex items-center space-x-3">
              <Checkbox
                id={`feature-${feature}`}
                checked={features.includes(feature.toLowerCase())}
                onCheckedChange={() => handleFeatureToggle(feature.toLowerCase())}
              />
              <Label htmlFor={`feature-${feature}`} className="text-sm text-gray-700">{feature}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};