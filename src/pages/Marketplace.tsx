import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { MarketplaceHeader } from "@/components/marketplace/MarketplaceHeader";
import { MarketplaceFilters } from "@/components/marketplace/MarketplaceFilters";
import { PatternCard } from "@/components/marketplace/PatternCard";
import { Database } from "@/integrations/supabase/types";

type Pattern = Database["public"]["Tables"]["patterns"]["Row"] & {
  profiles: { full_name: string | null } | null;
};

type PatternCategory = Database["public"]["Enums"]["pattern_category"];
type DifficultyLevel = Database["public"]["Enums"]["difficulty_level"];

export default function Marketplace() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [buyingPattern, setBuyingPattern] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<PatternCategory | "all">("all");
  const [difficulty, setDifficulty] = useState<DifficultyLevel | "all">("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    checkUserRole();
    loadPatterns();
    
    // Check for payment status
    const params = new URLSearchParams(window.location.search);
    if (params.get('success')) {
      toast({
        title: "Purchase Successful!",
        description: "Your pattern has been added to your library.",
      });
    }
    if (params.get('canceled')) {
      toast({
        variant: "destructive",
        title: "Purchase Canceled",
        description: "Your pattern purchase was canceled.",
      });
    }
  }, [category, difficulty, sortBy]);

  async function checkUserRole() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        if (profile) {
          setUserRole(profile.role);
        }
      }
    } catch (error) {
      console.error('Error checking user role:', error);
    }
  }

  async function loadPatterns() {
    try {
      setLoading(true);
      let query = supabase
        .from('patterns')
        .select('*, profiles(full_name)')
        .eq('is_approved', true);

      if (category && category !== "all") {
        query = query.eq('category', category);
      }
      if (difficulty && difficulty !== "all") {
        query = query.eq('difficulty', difficulty);
      }

      switch (sortBy) {
        case 'popular':
          query = query.order('sales_count', { ascending: false });
          break;
        case 'price-low':
          query = query.order('price', { ascending: true });
          break;
        case 'price-high':
          query = query.order('price', { ascending: false });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;
      
      if (error) throw error;
      setPatterns(data || []);
    } catch (error) {
      console.error('Error loading patterns:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load patterns. Please try again.",
      });
    } finally {
      setLoading(false);
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

      const response = await supabase.functions.invoke('create-pattern-checkout', {
        body: { patternId },
      });

      const { data: { url }, error } = response;
      if (error) throw error;

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

  const filteredPatterns = patterns.filter(pattern =>
    pattern.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pattern.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <MarketplaceHeader userRole={userRole} />
        
        <MarketplaceFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          category={category}
          setCategory={setCategory}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredPatterns.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No patterns found matching your criteria.</p>
            </div>
          ) : (
            filteredPatterns.map((pattern) => (
              <PatternCard
                key={pattern.id}
                pattern={pattern}
                onBuy={handleBuyPattern}
                buyingPattern={buyingPattern}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}