import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

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

export function MeasurementsSettings() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [measurements, setMeasurements] = useState<Measurements>({
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
  });

  useEffect(() => {
    getMeasurements();
  }, []);

  const getMeasurements = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('measurements')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;
      if (data?.measurements) {
        setMeasurements(data.measurements);
      }
    } catch (error) {
      console.error('Error loading measurements:', error);
      toast.error("Failed to load measurements");
    }
  };

  const handleUpdateMeasurements = async () => {
    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          measurements,
          updated_at: new Date().toISOString(),
        })
        .eq('id', session.user.id);

      if (error) throw error;
      
      toast.success("Measurements updated successfully");
    } catch (error) {
      console.error('Error updating measurements:', error);
      toast.error("Failed to update measurements");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (key: keyof Measurements, value: string) => {
    setMeasurements(prev => ({
      ...prev,
      [key]: value === "" ? null : value
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="bust">Bust</Label>
              <Input
                id="bust"
                value={measurements.bust || ""}
                onChange={(e) => handleInputChange("bust", e.target.value)}
                placeholder="Enter measurement"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="waist">Waist</Label>
              <Input
                id="waist"
                value={measurements.waist || ""}
                onChange={(e) => handleInputChange("waist", e.target.value)}
                placeholder="Enter measurement"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hips">Hips</Label>
              <Input
                id="hips"
                value={measurements.hips || ""}
                onChange={(e) => handleInputChange("hips", e.target.value)}
                placeholder="Enter measurement"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shoulder">Shoulder Width</Label>
              <Input
                id="shoulder"
                value={measurements.shoulder || ""}
                onChange={(e) => handleInputChange("shoulder", e.target.value)}
                placeholder="Enter measurement"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="arm_length">Arm Length</Label>
              <Input
                id="arm_length"
                value={measurements.arm_length || ""}
                onChange={(e) => handleInputChange("arm_length", e.target.value)}
                placeholder="Enter measurement"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inseam">Inseam</Label>
              <Input
                id="inseam"
                value={measurements.inseam || ""}
                onChange={(e) => handleInputChange("inseam", e.target.value)}
                placeholder="Enter measurement"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="neck">Neck</Label>
              <Input
                id="neck"
                value={measurements.neck || ""}
                onChange={(e) => handleInputChange("neck", e.target.value)}
                placeholder="Enter measurement"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="chest">Chest</Label>
              <Input
                id="chest"
                value={measurements.chest || ""}
                onChange={(e) => handleInputChange("chest", e.target.value)}
                placeholder="Enter measurement"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="back_width">Back Width</Label>
              <Input
                id="back_width"
                value={measurements.back_width || ""}
                onChange={(e) => handleInputChange("back_width", e.target.value)}
                placeholder="Enter measurement"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="front_length">Front Length</Label>
              <Input
                id="front_length"
                value={measurements.front_length || ""}
                onChange={(e) => handleInputChange("front_length", e.target.value)}
                placeholder="Enter measurement"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sleeve_length">Sleeve Length</Label>
              <Input
                id="sleeve_length"
                value={measurements.sleeve_length || ""}
                onChange={(e) => handleInputChange("sleeve_length", e.target.value)}
                placeholder="Enter measurement"
              />
            </div>
          </div>
          <Separator className="my-6" />
          <Button 
            onClick={handleUpdateMeasurements}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Updating..." : "Save Measurements"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}