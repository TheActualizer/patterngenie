import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";

// Temporary mock data until we connect to Supabase
const mockPatterns = [
  {
    id: 1,
    title: "Summer Dress Pattern",
    description: "A beautiful summer dress pattern perfect for warm days",
    price: 9.99,
    designer: "Sarah Smith",
    difficulty: "Intermediate",
  },
  {
    id: 2,
    title: "Classic Shirt Pattern",
    description: "Timeless shirt design with modern details",
    price: 12.99,
    designer: "John Doe",
    difficulty: "Advanced",
  },
  {
    id: 3,
    title: "Easy Skirt Pattern",
    description: "Perfect for beginners, quick to make",
    price: 7.99,
    designer: "Emma Wilson",
    difficulty: "Beginner",
  },
];

export default function Marketplace() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-primary mb-2">Pattern Marketplace</h1>
          <p className="text-muted-foreground">Discover and purchase unique sewing patterns from talented designers</p>
        </div>

        {/* Filters - To be implemented */}
        <div className="mb-8">
          {/* Placeholder for filters */}
        </div>

        {/* Pattern Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPatterns.map((pattern) => (
            <Card key={pattern.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{pattern.title}</CardTitle>
                <CardDescription>By {pattern.designer}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-2">{pattern.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Difficulty: {pattern.difficulty}</span>
                  <span className="text-lg font-bold text-primary">${pattern.price}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">View Details</Button>
                <Button>Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}