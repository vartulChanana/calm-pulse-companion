import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  BookOpen, 
  Users, 
  Archive, 
  Settings,
  Menu,
  X 
} from "lucide-react";

const navigationItems = [
  { icon: Heart, label: "Mood", href: "#mood" },
  { icon: BookOpen, label: "Journal", href: "#journal" },
  { icon: Users, label: "Community", href: "#community" },
  { icon: Archive, label: "Resources", href: "#resources" },
  { icon: Settings, label: "Settings", href: "#settings" },
];

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block">
        <div className="glass-card px-6 py-3 rounded-full">
          <div className="flex items-center gap-2">
            {navigationItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToSection(item.href)}
                  className="flex items-center gap-2 hover:bg-primary/10 hover:text-primary transition-smooth rounded-full px-4"
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
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

        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div 
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="absolute top-20 right-4 left-4">
              <div className="glass-card p-4 rounded-2xl space-y-2">
                {navigationItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <Button
                      key={index}
                      variant="ghost"
                      onClick={() => scrollToSection(item.href)}
                      className="w-full justify-start gap-3 hover:bg-primary/10 hover:text-primary transition-smooth rounded-xl p-4"
                    >
                      <IconComponent className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-30">
        <div className="glass-card p-2 rounded-2xl">
          <div className="grid grid-cols-4 gap-1">
            {navigationItems.slice(0, 4).map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToSection(item.href)}
                  className="flex flex-col items-center gap-1 hover:bg-primary/10 hover:text-primary transition-smooth rounded-xl p-3"
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};