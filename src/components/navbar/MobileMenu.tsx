import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, UserCircle2, FolderOpen, Settings, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { NavLinks } from "./NavLinks";

interface MobileMenuProps {
  user: User | null;
  onSignOut: () => void;
}

export function MobileMenu({ user, onSignOut }: MobileMenuProps) {
  const navigate = useNavigate();

  return (
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
                <Button variant="ghost" className="w-full justify-start text-red-600" onClick={onSignOut}>
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
  );
}