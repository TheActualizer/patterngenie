import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

export function NavLinks() {
  return (
    <>
      <Link to="/marketplace">
        <Button variant="ghost" className="font-medium text-gray-600 hover:text-gray-900 hover:bg-purple-50">
          Marketplace
        </Button>
      </Link>
      <Link to="/design-studio">
        <Button variant="ghost" className="font-medium text-gray-600 hover:text-gray-900 hover:bg-purple-50">
          Design Studio
        </Button>
      </Link>
      <a 
        href="https://www.facebook.com/studiosewme?mibextid=ZbWKwL" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <Button variant="ghost" className="font-medium text-gray-600 hover:text-gray-900 hover:bg-purple-50">
          <GraduationCap className="w-4 h-4 mr-2" />
          Classes
        </Button>
      </a>
    </>
  );
}