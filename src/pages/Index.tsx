import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Sparkles, Ruler, Share2, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { toast } from "sonner";

const Index = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically integrate with a newsletter service
    toast.success("Thanks for subscribing! We'll be in touch soon.");
    setEmail("");
  };

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

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-display font-bold text-center mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Find answers to common questions about PatternGenie
          </p>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How does AI pattern generation work?</AccordionTrigger>
                <AccordionContent>
                  Our AI technology analyzes your design preferences, measurements, and style choices to generate custom-fitted patterns. It combines traditional pattern-making principles with machine learning to create unique, wearable designs.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Can I sell patterns I create on PatternGenie?</AccordionTrigger>
                <AccordionContent>
                  Yes! Once you've created and tested your pattern, you can list it in our marketplace. You'll earn a commission on each sale while retaining full rights to your designs.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>What measurement system do you use?</AccordionTrigger>
                <AccordionContent>
                  PatternGenie supports both metric (cm) and imperial (inches) measurements. You can switch between systems at any time in your account settings.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>How do I get support if I need help?</AccordionTrigger>
                <AccordionContent>
                  We offer multiple support channels including our community forum, email support, and detailed documentation. Premium members also get access to live chat support.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
              <Mail className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-4xl font-display font-bold mb-4">Stay in the Loop</h2>
            <p className="text-xl text-gray-600 mb-8">
              Subscribe to our newsletter for the latest pattern-making tips, community highlights, and exclusive offers.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow"
              />
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;