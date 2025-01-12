import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

interface Measurements {
  bust: string | null;
  waist: string | null;
  hips: string | null;
  shoulder: string | null;
  arm_length: string | null;
  inseam: string | null;
  neck: string | null;
  chest: string | null;
  back_width: string | null;
  front_length: string | null;
  sleeve_length: string | null;
}

const defaultMeasurements: Measurements = {
  bust: null,
  waist: null,
  hips: null,
  shoulder: null,
  arm_length: null,
  inseam: null,
  neck: null,
  chest: null,
  back_width: null,
  front_length: null,
  sleeve_length: null,
};

export const AvatarCustomization = () => {
  const [gender, setGender] = useState<"male" | "female">("female");
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [sideImage, setSideImage] = useState<File | null>(null);
  const [frontImageUrl, setFrontImageUrl] = useState<string | null>(null);
  const [sideImageUrl, setSideImageUrl] = useState<string | null>(null);
  const [measurements, setMeasurements] = useState<Measurements>(defaultMeasurements);
  const [syncWithProfile, setSyncWithProfile] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfileMeasurements();
    loadExistingPhotos();
  }, []);

  const loadProfileMeasurements = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('measurements')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;

      if (data?.measurements) {
        setMeasurements(data.measurements as unknown as Measurements);
      }
    } catch (error) {
      console.error('Error loading measurements:', error);
    }
  };

  const loadExistingPhotos = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const userId = session.user.id;
      
      // Check if front photo exists
      const { data: frontData } = await supabase.storage
        .from('avatars')
        .createSignedUrl(`${userId}/front.jpg`, 3600);
      
      if (frontData?.signedUrl) {
        setFrontImageUrl(frontData.signedUrl);
      }

      // Check if side photo exists
      const { data: sideData } = await supabase.storage
        .from('avatars')
        .createSignedUrl(`${userId}/side.jpg`, 3600);
      
      if (sideData?.signedUrl) {
        setSideImageUrl(sideData.signedUrl);
      }
    } catch (error) {
      console.error('Error loading existing photos:', error);
    }
  };

  const uploadPhoto = async (file: File, type: "front" | "side") => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Please sign in to upload photos");
        return null;
      }

      const userId = session.user.id;
      const fileName = `${type}.jpg`;
      const filePath = `${userId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          upsert: true,
          contentType: 'image/jpeg'
        });

      if (uploadError) throw uploadError;

      const { data } = await supabase.storage
        .from('avatars')
        .createSignedUrl(filePath, 3600);

      return data?.signedUrl;
    } catch (error) {
      console.error(`Error uploading ${type} photo:`, error);
      toast.error(`Failed to upload ${type} photo`);
      return null;
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "front" | "side") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    setLoading(true);
    try {
      const signedUrl = await uploadPhoto(file, type);
      
      if (signedUrl) {
        if (type === "front") {
          setFrontImage(file);
          setFrontImageUrl(signedUrl);
        } else {
          setSideImage(file);
          setSideImageUrl(signedUrl);
        }
        toast.success(`${type} photo uploaded successfully`);
      }
    } finally {
      setLoading(false);
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

  const handleMeasurementChange = (key: keyof Measurements, value: string) => {
    setMeasurements(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveMeasurements = async () => {
    if (!syncWithProfile) {
      toast.success("Avatar measurements saved for this project");
      return;
    }

    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Please sign in to save measurements to your profile");
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          measurements: measurements as unknown as Json,
          updated_at: new Date().toISOString(),
        })
        .eq('id', session.user.id);

      if (error) throw error;
      toast.success("Measurements saved to your profile");
    } catch (error) {
      console.error('Error saving measurements:', error);
      toast.error("Failed to save measurements to profile");
    } finally {
      setLoading(false);
    }
  };

  const measurementFields = [
    { key: 'bust', label: 'Bust' },
    { key: 'waist', label: 'Waist' },
    { key: 'hips', label: 'Hips' },
    { key: 'shoulder', label: 'Shoulder Width' },
    { key: 'arm_length', label: 'Arm Length' },
    { key: 'inseam', label: 'Inseam' },
    { key: 'neck', label: 'Neck' },
    { key: 'chest', label: 'Chest' },
    { key: 'back_width', label: 'Back Width' },
    { key: 'front_length', label: 'Front Length' },
    { key: 'sleeve_length', label: 'Sleeve Length' },
  ] as const;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">Customize Avatar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
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
                    disabled={loading}
                  />
                  <label
                    htmlFor="front-photo"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    {frontImageUrl ? (
                      <img src={frontImageUrl} alt="Front view" className="w-32 h-32 object-cover rounded" />
                    ) : (
                      <Upload className="w-8 h-8 text-gray-400" />
                    )}
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
                    disabled={loading}
                  />
                  <label
                    htmlFor="side-photo"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    {sideImageUrl ? (
                      <img src={sideImageUrl} alt="Side view" className="w-32 h-32 object-cover rounded" />
                    ) : (
                      <Upload className="w-8 h-8 text-gray-400" />
                    )}
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
              disabled={!frontImage || !sideImage || loading}
            >
              {loading ? "Processing..." : "Scan Avatar"}
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

              <div className="grid grid-cols-2 gap-4">
                {measurementFields.map(({ key, label }) => (
                  <div key={key} className="space-y-2">
                    <Label htmlFor={key}>{label}</Label>
                    <Input
                      id={key}
                      type="text"
                      value={measurements[key]}
                      onChange={(e) => handleMeasurementChange(key, e.target.value)}
                      placeholder="Enter measurement"
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sync-profile"
                  checked={syncWithProfile}
                  onCheckedChange={(checked) => setSyncWithProfile(checked as boolean)}
                />
                <Label htmlFor="sync-profile">
                  Save measurements to my profile for future projects
                </Label>
              </div>

              <Button 
                className="w-full" 
                onClick={handleSaveMeasurements}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Measurements"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
