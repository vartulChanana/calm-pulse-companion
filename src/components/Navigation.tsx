import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Heart, 
  BookOpen, 
  Users, 
  BarChart3, 
  Settings,
  Menu,
  X,
  LogOut,
  User,
  Bell,
  Moon,
  Sun,
  HelpCircle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface NavigationProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

const navigationItems = [
  { 
    icon: Heart, 
    label: "Mood Tracker", 
    id: "mood",
    description: "Track your daily emotions"
  },
  { 
    icon: BookOpen, 
    label: "Journal", 
    id: "journal",
    description: "Write and reflect"
  },
  { 
    icon: Users, 
    label: "Community", 
    id: "community",
    description: "Connect with others"
  },
  { 
    icon: BarChart3, 
    label: "Insights", 
    id: "stats",
    description: "View your progress"
  },
];

export const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(3);

  const handleSectionClick = (sectionId: string) => {
    if (onSectionChange) {
      onSectionChange(sectionId);
    } else {
      // Scroll to section if no handler provided
      const element = document.querySelector(`#${sectionId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed Out",
        description: "You've been successfully signed out."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out. Please try again."
      });
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    toast({
      title: isDarkMode ? "Light Mode" : "Dark Mode",
      description: `Switched to ${isDarkMode ? 'light' : 'dark'} mode`
    });
  };

  const clearNotifications = () => {
    setNotifications(0);
    toast({
      title: "Notifications Cleared",
      description: "All notifications have been marked as read."
    });
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block">
        <div className="glass-card px-4 py-2 rounded-full shadow-soft">
          <div className="flex items-center gap-2">
            {/* Main Navigation Items */}
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeSection === item.id;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSectionClick(item.id)}
                  className={`
                    flex items-center gap-2 transition-all duration-300 rounded-full px-4 py-2
                    ${isActive 
                      ? 'bg-primary text-primary-foreground shadow-glow' 
                      : 'hover:bg-primary/10 hover:text-primary'
                    }
                  `}
                  title={item.description}
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Button>
              );
            })}

            {/* Divider */}
            <div className="w-px h-6 bg-border mx-2" />

            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearNotifications}
              className="relative hover:bg-accent/10 rounded-full p-2"
              title="Notifications"
            >
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-destructive">
                  {notifications}
                </Badge>
              )}
            </Button>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="hover:bg-accent/10 rounded-full p-2"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* User Menu */}
            {user && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-accent/10 rounded-full p-2"
                  title="Profile Settings"
                >
                  <User className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="hover:bg-destructive/10 hover:text-destructive rounded-full p-2"
                  title="Sign Out"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-4 right-4 z-50 glass-card p-3 rounded-full shadow-soft"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div 
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="absolute top-20 right-4 left-4">
              <Card className="glass-card p-6 rounded-2xl space-y-4 shadow-glow">
                {/* User Info */}
                {user && (
                  <div className="flex items-center gap-3 pb-4 border-b border-border/30">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Welcome back!</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                    {notifications > 0 && (
                      <Badge className="ml-auto bg-destructive">
                        {notifications}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Navigation Items */}
                <div className="space-y-2">
                  {navigationItems.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = activeSection === item.id;
                    return (
                      <Button
                        key={item.id}
                        variant="ghost"
                        onClick={() => handleSectionClick(item.id)}
                        className={`
                          w-full justify-start gap-3 rounded-xl p-4 h-auto
                          ${isActive 
                            ? 'bg-primary text-primary-foreground shadow-glow' 
                            : 'hover:bg-primary/10 hover:text-primary'
                          }
                        `}
                      >
                        <IconComponent className="h-5 w-5" />
                        <div className="text-left">
                          <div className="font-medium">{item.label}</div>
                          <div className="text-xs opacity-70">{item.description}</div>
                        </div>
                      </Button>
                    );
                  })}
                </div>

                {/* Settings & Actions */}
                <div className="pt-4 border-t border-border/30 space-y-2">
                  <Button
                    variant="ghost"
                    onClick={toggleDarkMode}
                    className="w-full justify-start gap-3 rounded-xl p-4"
                  >
                    {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={clearNotifications}
                    className="w-full justify-start gap-3 rounded-xl p-4"
                  >
                    <Bell className="h-5 w-5" />
                    <span>Clear Notifications</span>
                    {notifications > 0 && (
                      <Badge className="ml-auto bg-destructive">
                        {notifications}
                      </Badge>
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 rounded-xl p-4"
                  >
                    <HelpCircle className="h-5 w-5" />
                    <span>Help & Support</span>
                  </Button>

                  {user && (
                    <Button
                      variant="ghost"
                      onClick={handleSignOut}
                      className="w-full justify-start gap-3 rounded-xl p-4 hover:bg-destructive/10 hover:text-destructive"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Sign Out</span>
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-30">
        <Card className="glass-card p-2 rounded-2xl shadow-glow">
          <div className="grid grid-cols-4 gap-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeSection === item.id;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSectionClick(item.id)}
                  className={`
                    flex flex-col items-center gap-1 rounded-xl p-3 h-auto
                    ${isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-primary/10 hover:text-primary'
                    }
                  `}
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </Card>
      </div>
    </>
  );
};