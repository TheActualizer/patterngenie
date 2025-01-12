import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MeasurementInput } from "./MeasurementInput";

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

interface MeasurementsFormProps {
  measurements: Measurements;
  onMeasurementChange: (key: keyof Measurements, value: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export function MeasurementsForm({ 
  measurements, 
  onMeasurementChange, 
  onSubmit, 
  loading 
}: MeasurementsFormProps) {
  const measurementFields = [
    { id: "bust", label: "Bust" },
    { id: "waist", label: "Waist" },
    { id: "hips", label: "Hips" },
    { id: "shoulder", label: "Shoulder Width" },
    { id: "arm_length", label: "Arm Length" },
    { id: "inseam", label: "Inseam" },
    { id: "neck", label: "Neck" },
    { id: "chest", label: "Chest" },
    { id: "back_width", label: "Back Width" },
    { id: "front_length", label: "Front Length" },
    { id: "sleeve_length", label: "Sleeve Length" },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {measurementFields.map(({ id, label }) => (
          <MeasurementInput
            key={id}
            id={id}
            label={label}
            value={measurements[id as keyof Measurements] || ""}
            onChange={(value) => onMeasurementChange(id as keyof Measurements, value)}
          />
        ))}
      </div>
      <Separator className="my-6" />
      <Button 
        onClick={onSubmit}
        disabled={loading}
        className="w-full"
      >
        {loading ? "Updating..." : "Save Measurements"}
      </Button>
    </div>
  );
}