import { Navbar } from "@/components/Navbar";
import { MarketplaceHeader } from "@/components/marketplace/MarketplaceHeader";
import { MarketplaceFilters } from "@/components/marketplace/MarketplaceFilters";
import { PatternCard } from "@/components/marketplace/PatternCard";
import { useMarketplace } from "@/hooks/useMarketplace";
import { Loader2 } from "lucide-react";

export default function Marketplace() {
  const {
    loading,
    patterns,
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
  } = useMarketplace();

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
          ) : patterns.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No patterns found matching your criteria.</p>
            </div>
          ) : (
            patterns.map((pattern) => (
              <PatternCard
                key={pattern.id}
                pattern={pattern}
                onBuy={buyPattern}
                buyingPattern={buyingPattern}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}