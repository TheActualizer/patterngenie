import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Star, DollarSign, Eye, Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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

  useEffect(() => {
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
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-primary mb-2">Pattern Marketplace</h1>
          <p className="text-muted-foreground">Discover and purchase unique sewing patterns from talented designers</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Input
            placeholder="Search patterns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:w-1/3"
          />
          <Select value={category} onValueChange={(value: PatternCategory | "all") => setCategory(value)}>
            <SelectTrigger className="md:w-1/4">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="dresses">Dresses</SelectItem>
              <SelectItem value="tops">Tops</SelectItem>
              <SelectItem value="bottoms">Bottoms</SelectItem>
              <SelectItem value="outerwear">Outerwear</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
              <SelectItem value="children">Children</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Select value={difficulty} onValueChange={(value: DifficultyLevel | "all") => setDifficulty(value)}>
            <SelectTrigger className="md:w-1/4">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="md:w-1/4">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

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
              <Card key={pattern.id} className="flex flex-col">
                <CardHeader>
                  {pattern.thumbnail_url && (
                    <div className="aspect-video w-full overflow-hidden rounded-lg mb-4">
                      <img
                        src={pattern.thumbnail_url}
                        alt={pattern.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardTitle className="line-clamp-2">{pattern.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Badge variant="secondary">{pattern.difficulty}</Badge>
                    <Badge variant="outline">{pattern.category}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {pattern.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      {pattern.sales_count || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {pattern.views || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      4.5
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-lg font-bold text-primary">
                    ${pattern.price}
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => navigate(`/patterns/${pattern.id}`)}>
                      Details
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
                        <>
                          <DollarSign className="mr-2 h-4 w-4" />
                          Buy Now
                        </>
                      )}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}