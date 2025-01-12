import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageSquare, Users, Heart, Share2 } from "lucide-react";

export default function Community() {
  const discussions = [
    {
      title: "Tips for Working with Stretch Fabrics",
      author: "Sarah Miller",
      avatar: "/placeholder.svg",
      likes: 24,
      comments: 12,
      tags: ["tips", "fabrics"],
    },
    {
      title: "Show & Tell: My First Pattern Creation",
      author: "James Chen",
      avatar: "/placeholder.svg",
      likes: 45,
      comments: 8,
      tags: ["showcase", "beginner"],
    },
    {
      title: "Pattern Modification Help Needed",
      author: "Emma Wilson",
      avatar: "/placeholder.svg",
      likes: 15,
      comments: 20,
      tags: ["help", "modification"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">Community</h1>
              <p className="text-lg text-gray-600">Connect with fellow pattern makers</p>
            </div>
            <Button className="gap-2">
              <MessageSquare className="w-4 h-4" />
              New Discussion
            </Button>
          </div>

          <div className="flex gap-4 mb-8">
            <Input placeholder="Search discussions..." className="max-w-md" />
            <Button variant="secondary">Search</Button>
          </div>

          <div className="space-y-4">
            {discussions.map((discussion, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <img
                        src={discussion.avatar}
                        alt={discussion.author}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <CardTitle className="text-xl mb-2">{discussion.title}</CardTitle>
                        <div className="flex gap-2">
                          {discussion.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Posted by {discussion.author}</span>
                    <div className="flex gap-4">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Heart className="w-4 h-4" />
                        {discussion.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <MessageSquare className="w-4 h-4" />
                        {discussion.comments}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
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