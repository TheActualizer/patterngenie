import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Database } from "@/integrations/supabase/types";
import { Search } from "lucide-react";

type PatternCategory = Database["public"]["Enums"]["pattern_category"];
type DifficultyLevel = Database["public"]["Enums"]["difficulty_level"];

interface MarketplaceFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  category: PatternCategory | "all";
  setCategory: (value: PatternCategory | "all") => void;
  difficulty: DifficultyLevel | "all";
  setDifficulty: (value: DifficultyLevel | "all") => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

export function MarketplaceFilters({
  searchTerm,
  setSearchTerm,
  category,
  setCategory,
  difficulty,
  setDifficulty,
  sortBy,
  setSortBy,
}: MarketplaceFiltersProps) {
  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 mb-8 animate-fade-in [animation-delay:600ms]">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative md:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search patterns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/70 hover:bg-white transition-colors duration-200"
          />
        </div>
        <Select value={category} onValueChange={(value: PatternCategory | "all") => setCategory(value)}>
          <SelectTrigger className="md:w-1/4 bg-white/70 hover:bg-white transition-colors duration-200">
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
          <SelectTrigger className="md:w-1/4 bg-white/70 hover:bg-white transition-colors duration-200">
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
          <SelectTrigger className="md:w-1/4 bg-white/70 hover:bg-white transition-colors duration-200">
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
    </div>
  );
}