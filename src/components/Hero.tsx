import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, Scissors } from "lucide-react";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGM0LjQxOCAwIDgtMy41ODIgOC04cy0zLjU4Mi04LTgtOC04IDMuNTgyLTggOCAzLjU4MiA4IDggOHoiIHN0cm9rZT0iI0U1REVGRiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
      <div className="container mx-auto px-4">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 pt-10">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-[#9b87f5] to-[#7E69AB] rounded-2xl flex items-center justify-center shadow-xl">
                  <Scissors className="w-12 h-12 text-white transform -rotate-45" />
                </div>
              </div>
              <h1 className="text-4xl tracking-tight font-display font-bold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Create Custom</span>
                <span className="block bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
                  Sewing Patterns with AI
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                Transform your creative vision into reality with PatternGenie's AI-powered pattern generation. Design, customize, and share your unique sewing patterns.
              </p>
              <div className="mt-8 sm:mt-12 sm:flex sm:justify-center gap-4">
                <Link to="/design-studio">
                  <Button size="lg" className="w-full sm:w-auto group">
                    Start Creating
                    <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  </Button>
                </Link>
                <Link to="/marketplace">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto mt-3 sm:mt-0">
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