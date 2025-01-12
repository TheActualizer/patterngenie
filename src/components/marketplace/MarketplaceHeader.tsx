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
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-4xl font-display font-bold text-primary mb-2">Pattern Marketplace</h1>
        <p className="text-muted-foreground">Discover and purchase unique sewing patterns from talented designers</p>
      </div>
      {userRole === 'designer' && (
        <Button onClick={handleAddPattern} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Pattern
        </Button>
      )}
    </div>
  );
}