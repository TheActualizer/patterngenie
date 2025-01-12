import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MeasurementInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function MeasurementInput({ id, label, value, onChange }: MeasurementInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter measurement"
      />
    </div>
  );
}