import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, DollarSign, Eye, Loader2, Star } from "lucide-react";
import { Database } from "@/integrations/supabase/types";
import { useNavigate } from "react-router-dom";

type Pattern = Database["public"]["Tables"]["patterns"]["Row"] & {
  profiles: { full_name: string | null } | null;
};

interface PatternCardProps {
  pattern: Pattern;
  onBuy: (patternId: string) => Promise<void>;
  buyingPattern: string | null;
}

export function PatternCard({ pattern, onBuy, buyingPattern }: PatternCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="flex flex-col">
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
            onClick={() => onBuy(pattern.id)}
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
  );
}