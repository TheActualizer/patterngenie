import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Upload } from "lucide-react";
import { toast } from "sonner";

export const AvatarCustomization = () => {
  const [gender, setGender] = useState<"male" | "female">("female");
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [sideImage, setSideImage] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "front" | "side") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (type === "front") {
      setFrontImage(file);
    } else {
      setSideImage(file);
    }
  };

  const handleScanAvatar = () => {
    if (!frontImage || !sideImage) {
      toast.error("Please upload both front and side photos");
      return;
    }
    toast.info("Scanning avatar...", { duration: 2000 });
    // Add avatar scanning logic here
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">Customize Avatar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Customize Your Avatar</DialogTitle>
          <DialogDescription>
            Upload photos for scanning or manually set your avatar's characteristics
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="scan" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="scan">Photo Scan</TabsTrigger>
            <TabsTrigger value="manual">Manual Setup</TabsTrigger>
          </TabsList>

          <TabsContent value="scan" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Front Photo</Label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "front")}
                    className="hidden"
                    id="front-photo"
                  />
                  <label
                    htmlFor="front-photo"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {frontImage ? frontImage.name : "Upload front view"}
                    </span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Side Photo</Label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "side")}
                    className="hidden"
                    id="side-photo"
                  />
                  <label
                    htmlFor="side-photo"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {sideImage ? sideImage.name : "Upload side view"}
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <Button 
              className="w-full" 
              onClick={handleScanAvatar}
              disabled={!frontImage || !sideImage}
            >
              Scan Avatar
            </Button>
          </TabsContent>

          <TabsContent value="manual" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup
                  value={gender}
                  onValueChange={(value) => setGender(value as "male" | "female")}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <Button className="w-full">Apply Changes</Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};