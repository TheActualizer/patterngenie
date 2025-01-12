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
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in">
      <CardHeader className="p-0">
        {pattern.thumbnail_url && (
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={pattern.thumbnail_url}
              alt={pattern.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-6">
          <CardTitle className="line-clamp-2 text-xl group-hover:text-primary transition-colors duration-200">
            {pattern.title}
          </CardTitle>
          <div className="flex items-center gap-2 mt-3">
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
              {pattern.difficulty}
            </Badge>
            <Badge variant="outline" className="border-purple-200 text-purple-800">
              {pattern.category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
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
            <Star className="h-4 w-4 text-yellow-400" />
            4.5
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t bg-gray-50/50">
        <span className="text-lg font-bold text-primary">
          ${pattern.price}
        </span>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => navigate(`/patterns/${pattern.id}`)}
            className="hover:bg-purple-50"
          >
            Details
          </Button>
          <Button 
            onClick={() => onBuy(pattern.id)}
            disabled={buyingPattern === pattern.id}
            className="bg-purple-600 hover:bg-purple-700"
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