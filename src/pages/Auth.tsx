import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignUpForm } from "@/components/auth/SignUpForm";

const AuthPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      if (event === "SIGNED_IN") {
        try {
          const { data, error } = await supabase.functions.invoke('create-checkout-session', {
            headers: {
              Authorization: `Bearer ${session?.access_token}`,
            },
          });

          if (error) throw error;

          if (data?.url) {
            window.location.href = data.url;
          } else {
            toast({
              title: "Welcome!",
              description: "You have successfully signed in.",
            });
            navigate("/");
          }
        } catch (error) {
          console.error("Error creating checkout session:", error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "There was a problem setting up your payment. Please try again.",
          });
          navigate("/");
        }
      }
      if (event === "SIGNED_OUT") {
        toast({
          title: "Signed out",
          description: "You have been signed out successfully.",
        });
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const handleSignUpSuccess = () => {
    toast({
      title: "Account created!",
      description: "Please check your email to verify your account.",
    });
  };

  const handleSignUpError = (error: Error) => {
    setAuthError(error.message);
    toast({
      variant: "destructive",
      title: "Error",
      description: error.message,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-display font-bold text-primary mb-2">Welcome to PatternGenie</h1>
            <p className="text-muted-foreground">Sign in to access your patterns and designs</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
              <CardDescription>
                Choose how you want to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="signin">
                  <Auth
                    supabaseClient={supabase}
                    appearance={{
                      theme: ThemeSupa,
                      variables: {
                        default: {
                          colors: {
                            brand: 'hsl(var(--primary))',
                            brandAccent: 'hsl(var(--primary))',
                          },
                        },
                      },
                    }}
                    providers={["google"]}
                    redirectTo={window.location.origin}
                  />
                </TabsContent>
                <TabsContent value="signup">
                  {authError && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertDescription>{authError}</AlertDescription>
                    </Alert>
                  )}
                  <SignUpForm 
                    onSuccess={handleSignUpSuccess}
                    onError={handleSignUpError}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;