import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, Scissors } from "lucide-react";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-purple-50">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGM0LjQxOCAwIDgtMy41ODIgOC04cy0zLjU4Mi04LTgtOC04IDMuNTgyLTggOCAzLjU4MiA4IDggOHoiIHN0cm9rZT0iI0U1REVGRiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-5"></div>
      <div className="container mx-auto px-4">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 pt-20">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="text-center">
              <div className="flex justify-center mb-12">
                <div className="w-24 h-24 bg-gradient-to-br from-[#9b87f5] to-[#7E69AB] rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-purple-300/50">
                  <Scissors className="w-14 h-14 text-white transform -rotate-45 hover:rotate-0 transition-all duration-500" />
                </div>
              </div>
              <h1 className="text-5xl tracking-tight font-display font-bold text-gray-900 sm:text-6xl md:text-7xl mb-8">
                <span className="block mb-2 animate-fade-in">Create Custom</span>
                <span className="block bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent animate-fade-in [animation-delay:200ms]">
                  Sewing Patterns with AI
                </span>
              </h1>
              <p className="mt-3 text-lg text-gray-500 sm:mt-5 sm:text-xl sm:max-w-2xl sm:mx-auto md:mt-5 md:text-2xl animate-fade-in [animation-delay:400ms]">
                Transform your creative vision into reality with PatternGenie's AI-powered pattern generation. Design, customize, and share your unique sewing patterns.
              </p>
              <div className="mt-12 sm:mt-16 sm:flex sm:justify-center gap-6 animate-fade-in [animation-delay:600ms]">
                <Link to="/design-studio">
                  <Button size="lg" className="w-full sm:w-auto group px-8 py-6 text-lg bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:shadow-lg hover:shadow-purple-300/50 transition-all duration-300">
                    Start Creating
                    <Sparkles className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                  </Button>
                </Link>
                <Link to="/marketplace">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto mt-3 sm:mt-0 px-8 py-6 text-lg border-2 hover:bg-purple-50 transition-all duration-300">
                    Browse Patterns
                  </Button>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}