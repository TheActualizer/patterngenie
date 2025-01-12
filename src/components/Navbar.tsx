import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-display text-2xl text-primary">PatternGenie</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/marketplace">
            <Button variant="ghost">Marketplace</Button>
          </Link>
          <Link to="/studio">
            <Button variant="ghost">Design Studio</Button>
          </Link>
          <Link to="/login">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}