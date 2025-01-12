import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Sparkles, Ruler, Share2 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      <Navbar />
      <Hero />
      
      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-display font-bold text-center mb-16">Why Choose PatternGenie?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white/50 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">AI-Powered Design</h3>
                <p className="text-gray-600 text-center">Transform your creative vision into reality with our advanced AI pattern generation technology.</p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  <Ruler className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Custom Measurements</h3>
                <p className="text-gray-600 text-center">Create patterns that fit perfectly with personalized measurements and adjustments.</p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  <Share2 className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Share & Sell</h3>
                <p className="text-gray-600 text-center">Join our marketplace to share your designs and earn from your creativity.</p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Community</h3>
                <p className="text-gray-600 text-center">Connect with fellow designers and sewists in our vibrant community.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-display font-bold text-center mb-4">Join Our Community</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Connect with thousands of passionate sewists and designers. Share your creations, get inspired, and learn from others.
          </p>
          
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
              <iframe 
                src="https://www.youtube.com/embed/eXlqLTSWMv4"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-3xl font-bold text-purple-600 mb-2">10K+</h3>
                <p className="text-gray-600">Active Members</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-purple-600 mb-2">5K+</h3>
                <p className="text-gray-600">Patterns Created</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-purple-600 mb-2">1K+</h3>
                <p className="text-gray-600">Daily Downloads</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;