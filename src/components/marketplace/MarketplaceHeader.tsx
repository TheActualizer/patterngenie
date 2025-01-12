import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MarketplaceHeaderProps {
  userRole: string | null;
}

export function MarketplaceHeader({ userRole }: MarketplaceHeaderProps) {
  const navigate = useNavigate();

  const handleAddPattern = () => {
    navigate('/design-studio', { state: { fromMarketplace: true } });
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-800 to-indigo-900 p-8 mb-8">
      <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:60px_60px]" />
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2 animate-fade-in">
              Pattern Marketplace
            </h1>
            <p className="text-purple-200 max-w-2xl animate-fade-in [animation-delay:200ms]">
              Discover and purchase unique sewing patterns from talented designers worldwide
            </p>
          </div>
          {userRole === 'designer' && (
            <Button 
              onClick={handleAddPattern} 
              className="bg-white text-purple-900 hover:bg-purple-50 transition-all duration-200 shadow-lg hover:shadow-xl animate-fade-in [animation-delay:400ms]"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Pattern
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}