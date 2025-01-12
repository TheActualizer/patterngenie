import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Database } from "@/integrations/supabase/types";
import { loadMarketplacePatterns, handlePatternPurchase, checkUserRole } from '@/utils/marketplaceUtils';

type Pattern = Database["public"]["Tables"]["patterns"]["Row"] & {
  profiles: { full_name: string | null } | null;
};

type PatternCategory = Database["public"]["Enums"]["pattern_category"];
type DifficultyLevel = Database["public"]["Enums"]["difficulty_level"];

export function useMarketplace() {
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
    checkUserRole().then(setUserRole);
    fetchPatterns();
    
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

  const fetchPatterns = async () => {
    try {
      setLoading(true);
      const data = await loadMarketplacePatterns(category, difficulty, sortBy);
      setPatterns(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load patterns. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const buyPattern = async (patternId: string) => {
    try {
      setBuyingPattern(patternId);
      const url = await handlePatternPurchase(patternId);
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to initiate checkout. Please try again.",
      });
    } finally {
      setBuyingPattern(null);
    }
  };

  const filteredPatterns = patterns.filter(pattern =>
    pattern.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pattern.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    loading,
    patterns: filteredPatterns,
    buyingPattern,
    searchTerm,
    setSearchTerm,
    category,
    setCategory,
    difficulty,
    setDifficulty,
    sortBy,
    setSortBy,
    userRole,
    buyPattern
  };
}