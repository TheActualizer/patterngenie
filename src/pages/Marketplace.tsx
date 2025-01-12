import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function Marketplace() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [patterns, setPatterns] = useState<any[]>([]);
  const [buyingPattern, setBuyingPattern] = useState<string | null>(null);

  useEffect(() => {
    loadPatterns();
    
    // Check for canceled payment
    const params = new URLSearchParams(window.location.search);
    if (params.get('canceled')) {
      toast({
        variant: "destructive",
        title: "Purchase Canceled",
        description: "Your pattern purchase was canceled.",
      });
    }
  }, []);

  async function loadPatterns() {
    try {
      const { data, error } = await supabase
        .from('patterns')
        .select('*')
        .eq('is_approved', true);
      
      if (error) throw error;
      setPatterns(data || []);
    } catch (error) {
      console.error('Error loading patterns:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load patterns. Please try again.",
      });
    }
  }

  async function handleBuyPattern(patternId: string) {
    try {
      setBuyingPattern(patternId);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }

      const response = await fetch('/functions/v1/create-pattern-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ patternId }),
      });

      const { url, error } = await response.json();
      if (error) throw new Error(error);
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to initiate checkout. Please try again.",
      });
    } finally {
      setBuyingPattern(null);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-primary mb-2">Pattern Marketplace</h1>
          <p className="text-muted-foreground">Discover and purchase unique sewing patterns from talented designers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patterns.map((pattern) => (
            <Card key={pattern.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{pattern.title}</CardTitle>
                <CardDescription>By {pattern.designer_name}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-2">{pattern.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Difficulty: {pattern.difficulty}</span>
                  <span className="text-lg font-bold text-primary">${pattern.price}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => navigate(`/patterns/${pattern.id}`)}>
                  View Details
                </Button>
                <Button 
                  onClick={() => handleBuyPattern(pattern.id)}
                  disabled={buyingPattern === pattern.id}
                >
                  {buyingPattern === pattern.id ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Buy Now'
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}