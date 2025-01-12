import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountSettings } from "./AccountSettings";
import { PreferencesSettings } from "./PreferencesSettings";
import { NotificationSettings } from "./NotificationSettings";
import { MeasurementsSettings } from "./MeasurementsSettings";

interface SettingsDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Manage your account settings and preferences.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="measurements">Measurements</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <div className="mt-4">
              <TabsContent value="account">
                <AccountSettings />
              </TabsContent>
              <TabsContent value="measurements">
                <MeasurementsSettings />
              </TabsContent>
              <TabsContent value="preferences">
                <PreferencesSettings />
              </TabsContent>
              <TabsContent value="notifications">
                <NotificationSettings />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}