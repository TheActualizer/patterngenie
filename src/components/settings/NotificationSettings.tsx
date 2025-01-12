import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function NotificationSettings() {
  const [loading, setLoading] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [newPatterns, setNewPatterns] = useState(false);

  const handleUpdateNotifications = async () => {
    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) return;

      const { error } = await supabase
        .from('profiles')
        .update({
          preferences: {
            notifications: {
              email: emailNotifications,
              orderUpdates,
              newPatterns,
            },
          },
          updated_at: new Date().toISOString(),
        })
        .eq('id', session.user.id);

      if (error) throw error;
      
      toast.success("Notification preferences updated successfully");
    } catch (error) {
      console.error('Error updating notification preferences:', error);
      toast.error("Failed to update notification preferences");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="emailNotifications">Email Notifications</Label>
              <Switch
                id="emailNotifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="orderUpdates">Order Updates</Label>
              <Switch
                id="orderUpdates"
                checked={orderUpdates}
                onCheckedChange={setOrderUpdates}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="newPatterns">New Pattern Alerts</Label>
              <Switch
                id="newPatterns"
                checked={newPatterns}
                onCheckedChange={setNewPatterns}
              />
            </div>
            <Button 
              onClick={handleUpdateNotifications}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Updating..." : "Save Notification Settings"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}