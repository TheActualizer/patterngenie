import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Bookmark, Star } from "lucide-react";

export default function Favorites() {
  const savedPatterns = [
    {
      title: "Summer Dress Pattern",
      designer: "Emma Wilson",
      thumbnail: "/placeholder.svg",
      price: 12.99,
      rating: 4.5,
      saves: 234,
    },
    {
      title: "Classic Shirt Pattern",
      designer: "James Chen",
      thumbnail: "/placeholder.svg",
      price: 9.99,
      rating: 4.8,
      saves: 456,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">My Favorites</h1>
          
          <Tabs defaultValue="patterns" className="mb-8">
            <TabsList>
              <TabsTrigger value="patterns" className="gap-2">
                <Heart className="w-4 h-4" />
                Saved Patterns
              </TabsTrigger>
              <TabsTrigger value="tutorials" className="gap-2">
                <Bookmark className="w-4 h-4" />
                Saved Tutorials
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="patterns">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedPatterns.map((pattern, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <img
                        src={pattern.thumbnail}
                        alt={pattern.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <CardTitle className="text-xl">{pattern.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          by {pattern.designer}
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span>{pattern.rating}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <span className="font-semibold">${pattern.price}</span>
                        <Button variant="secondary" size="sm">View Pattern</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="tutorials">
              <div className="text-center py-12">
                <p className="text-gray-600">No saved tutorials yet</p>
                <Button variant="secondary" className="mt-4">
                  Browse Tutorials
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}