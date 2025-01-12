import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { UserCircle2, FolderOpen, Menu, LogOut, Scissors, Settings } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SettingsDialog } from "./settings/SettingsDialog";

export function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message,
      });
    } else {
      navigate('/');
    }
  };

  const NavLinks = () => (
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
    </>
  );

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-purple-100">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#9b87f5] to-[#7E69AB] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Scissors className="w-6 h-6 text-white transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </div>
            <span className="font-display text-2xl bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent font-semibold">
              PatternGenie
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 hover:bg-purple-50">
                    <Avatar className="h-9 w-9 border-2 border-purple-100">
                      <AvatarImage src={user.user_metadata.avatar_url} alt={user.user_metadata.full_name} />
                      <AvatarFallback className="bg-purple-50 text-purple-700">
                        {user.user_metadata.full_name?.charAt(0) ?? "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.user_metadata.full_name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/account')} className="cursor-pointer">
                    <UserCircle2 className="mr-2 h-4 w-4" />
                    Account Overview
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/account/projects')} className="cursor-pointer">
                    <FolderOpen className="mr-2 h-4 w-4" />
                    My Projects
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600 focus:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:shadow-lg hover:shadow-purple-300/50 transition-all duration-300">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-4 py-4">
                  <NavLinks />
                  {user ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 px-2">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={user.user_metadata.avatar_url} />
                          <AvatarFallback>{user.user_metadata.full_name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{user.user_metadata.full_name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/account')}>
                          <UserCircle2 className="mr-2 h-4 w-4" />
                          Account Overview
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/account/projects')}>
                          <FolderOpen className="mr-2 h-4 w-4" />
                          My Projects
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-red-600" onClick={handleSignOut}>
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign out
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Link to="/auth" className="w-full">
                      <Button className="w-full">Sign In</Button>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}