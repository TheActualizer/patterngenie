import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { SettingsDialog } from "@/components/settings/SettingsDialog";

export default function Account() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (location.pathname === "/account/settings") {
      const settingsButton = document.querySelector('[aria-label="Settings"]') as HTMLButtonElement;
      if (settingsButton) {
        settingsButton.click();
      }
    }
  }, [location.pathname]);

  async function getProfile() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      // First try to get the profile
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .maybeSingle();

      if (fetchError) throw fetchError;
      
      // If profile doesn't exist, create it
      if (!existingProfile) {
        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: session.user.id,
              full_name: session.user.user_metadata.full_name,
              avatar_url: session.user.user_metadata.avatar_url,
            }
          ])
          .select()
          .single();

        if (insertError) throw insertError;
        setProfile(newProfile);
      } else {
        setProfile(existingProfile);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast({
        variant: "destructive",
        title: "Error loading profile",
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto py-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Profile Overview Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Profile Overview</CardTitle>
              <CardDescription>Manage your account details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback>{profile?.full_name?.charAt(0) ?? "U"}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-2xl font-semibold">{profile?.full_name}</h3>
                  <p className="text-sm text-muted-foreground">{profile?.email}</p>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Preferences</h4>
                <p className="text-sm">Measurement Units: {profile?.measurement_units || "Not set"}</p>
                <Button variant="outline" onClick={() => navigate("/account/settings")}>
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle>Account Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Member Since</p>
                <p className="text-2xl font-bold">
                  {new Date(profile?.created_at).toLocaleDateString()}
                </p>
              </div>
              <Button className="w-full" onClick={() => navigate("/projects")}>
                View My Projects
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/marketplace")}
              >
                Purchase History
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
