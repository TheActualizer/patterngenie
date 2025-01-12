import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-purple-50">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGM0LjQxOCAwIDgtMy41ODIgOC04cy0zLjU4Mi04LTgtOC04IDMuNTgyLTggOCAzLjU4MiA4IDggOHoiIHN0cm9rZT0iI0U1REVGRiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-5"></div>
      <div className="container mx-auto px-4">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 pt-20">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="text-center">
              <div className="flex justify-center mb-12">
                {/* AI Dress Logo */}
                <div className="relative w-32 h-32 group">
                  {/* Animated background circles */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E5DEFF] via-[#D3E4FD] to-[#FDE1D3] rounded-full blur-xl opacity-75 animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#8B5CF6] via-[#D946EF] to-[#33C3F0] rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                  
                  {/* Dress Shape */}
                  <div className="relative w-full h-full bg-gradient-to-b from-[#9b87f5] to-[#7E69AB] rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-purple-300/50">
                    {/* Dress Pattern - Abstract AI Lines */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-20 h-20 text-white/90" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path 
                          d="M12 3L20 8V16L12 21L4 16V8L12 3Z" 
                          stroke="currentColor" 
                          strokeWidth="1.5" 
                          className="animate-[dash_3s_ease-in-out_infinite]"
                          strokeDasharray="60"
                          strokeDashoffset="60"
                        />
                        <path 
                          d="M12 3V21M4 8L20 16M20 8L4 16" 
                          stroke="currentColor" 
                          strokeWidth="1.5" 
                          className="animate-[dash_3s_ease-in-out_infinite]"
                          strokeDasharray="40"
                          strokeDashoffset="40"
                        />
                      </svg>
                    </div>
                    
                    {/* Floating Particles */}
                    <div className="absolute inset-0">
                      <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping"></div>
                      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white rounded-full animate-ping [animation-delay:500ms]"></div>
                      <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full animate-ping [animation-delay:1000ms]"></div>
                    </div>
                  </div>
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