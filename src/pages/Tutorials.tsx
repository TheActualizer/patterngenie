import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, PlayCircle, FileText, Trophy } from "lucide-react";

export default function Tutorials() {
  const tutorials = [
    {
      title: "Getting Started with PatternGenie",
      description: "Learn the basics of creating your first pattern",
      icon: <BookOpen className="w-6 h-6" />,
      level: "Beginner",
      duration: "15 mins",
    },
    {
      title: "Advanced Pattern Customization",
      description: "Master the art of pattern modifications",
      icon: <Trophy className="w-6 h-6" />,
      level: "Advanced",
      duration: "30 mins",
    },
    {
      title: "Digital Pattern Reading Guide",
      description: "Understanding digital pattern formats",
      icon: <FileText className="w-6 h-6" />,
      level: "Intermediate",
      duration: "20 mins",
    },
    {
      title: "Video Tutorial Series",
      description: "Watch step-by-step pattern creation guides",
      icon: <PlayCircle className="w-6 h-6" />,
      level: "All Levels",
      duration: "1 hour",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">Tutorials</h1>
          <p className="text-lg text-gray-600 mb-8">
            Learn how to create and customize patterns with our comprehensive guides
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tutorials.map((tutorial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                      {tutorial.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{tutorial.title}</CardTitle>
                      <CardDescription>{tutorial.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>{tutorial.level}</span>
                      <span>•</span>
                      <span>{tutorial.duration}</span>
                    </div>
                    <Button variant="secondary">Start Learning</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}