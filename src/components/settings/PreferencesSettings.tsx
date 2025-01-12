import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export function PreferencesSettings() {
  const [loading, setLoading] = useState(false);
  const [units, setUnits] = useState("metric");
  const [darkMode, setDarkMode] = useState(false);

  const handleUpdatePreferences = async () => {
    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) return;

      const { error } = await supabase
        .from('profiles')
        .update({
          measurement_units: units,
          preferences: {
            darkMode,
          },
          updated_at: new Date().toISOString(),
        })
        .eq('id', session.user.id);

      if (error) throw error;
      
      toast.success("Preferences updated successfully");
    } catch (error) {
      console.error('Error updating preferences:', error);
      toast.error("Failed to update preferences");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="units">Measurement Units</Label>
              <Select value={units} onValueChange={setUnits}>
                <SelectTrigger>
                  <SelectValue placeholder="Select units" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metric">Metric (cm)</SelectItem>
                  <SelectItem value="imperial">Imperial (inches)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="darkMode">Dark Mode</Label>
              <Switch
                id="darkMode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
            <Button 
              onClick={handleUpdatePreferences}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Updating..." : "Save Preferences"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}