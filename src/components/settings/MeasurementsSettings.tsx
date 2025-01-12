import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { MeasurementsForm } from "./measurements/MeasurementsForm";
import { Json } from "@/integrations/supabase/types";

export interface Measurements {
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
        .maybeSingle();

      if (error) {
        console.error('Error loading measurements:', error);
        toast.error("Failed to load measurements");
        return;
      }

      if (data?.measurements) {
        setMeasurements(data.measurements as unknown as Measurements);
      }
    } catch (error) {
      console.error('Error:', error);
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
          measurements: measurements as unknown as Json,
          updated_at: new Date().toISOString(),
        })
        .eq('id', session.user.id);

      if (error) {
        console.error('Error updating measurements:', error);
        toast.error("Failed to update measurements");
        return;
      }
      
      toast.success("Measurements updated successfully");
    } catch (error) {
      console.error('Error:', error);
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
          <MeasurementsForm
            measurements={measurements}
            onMeasurementChange={handleInputChange}
            onSubmit={handleUpdateMeasurements}
            loading={loading}
          />
        </CardContent>
      </Card>
    </div>
  );
}