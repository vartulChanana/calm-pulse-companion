import { Navigation } from "@/components/Navigation";
import { MoodTracker } from "@/components/MoodTracker";
import { JournalSection } from "@/components/JournalSection";
import { ResourceHub } from "@/components/ResourceHub";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Heart, 
  Users, 
  Shield,
  Quote,
  TrendingUp
} from "lucide-react";
import heroMeditation from "@/assets/hero-meditation.jpg";

const Index = () => {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const inspirationalQuotes = [
    "You are stronger than you think and more resilient than you know.",
    "Progress, not perfection, is the goal of mental wellness.",
    "Every small step toward self-care is a victory worth celebrating.",
    "Your feelings are valid, and your journey matters.",
    "Healing isn't linear, and that's perfectly okay.",
  ];

  const randomQuote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-subtle border-b border-border/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 gradient-peaceful rounded-xl">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Mindful</h1>
                <p className="text-xs text-muted-foreground">Your Mental Health Companion</p>
              </div>
            </div>
            <Navigation />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-24">
        {/* Hero Section */}
        <section className="py-12 text-center space-y-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl">
              <img 
                src={heroMeditation} 
                alt="Peaceful meditation scene"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4 text-white">
                  <h2 className="text-4xl md:text-6xl font-bold animate-fade-in">
                    Welcome Back
                  </h2>
                  <p className="text-lg md:text-xl opacity-90 animate-fade-in">
                    {currentDate}
                  </p>
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Your safe space for mental wellness
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Quote */}
          <Card className="glass-card p-6 max-w-2xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-accent/20 rounded-lg flex-shrink-0">
                <Quote className="h-5 w-5 text-accent" />
              </div>
              <div className="text-left">
                <p className="text-foreground italic leading-relaxed">
                  "{randomQuote}"
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Daily Inspiration
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Mood Tracking Section */}
        <section id="mood" className="py-12">
          <MoodTracker />
        </section>

        {/* Features Overview */}
        <section className="py-12">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="glass-card p-6 text-center hover-lift">
              <div className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-2xl w-fit mx-auto">
                  <Heart className="h-8 w-8 text-primary animate-gentle-pulse" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Daily Check-ins
                </h3>
                <p className="text-muted-foreground text-sm">
                  Track your emotional journey with gentle, mindful check-ins that help you understand patterns.
                </p>
              </div>
            </Card>

            <Card className="glass-card p-6 text-center hover-lift">
              <div className="space-y-4">
                <div className="p-4 bg-secondary/20 rounded-2xl w-fit mx-auto">
                  <Users className="h-8 w-8 text-secondary-foreground animate-float" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Safe Community
                </h3>
                <p className="text-muted-foreground text-sm">
                  Connect anonymously with others on similar journeys in a supportive, judgment-free environment.
                </p>
              </div>
            </Card>

            <Card className="glass-card p-6 text-center hover-lift">
              <div className="space-y-4">
                <div className="p-4 bg-accent/20 rounded-2xl w-fit mx-auto">
                  <Shield className="h-8 w-8 text-accent-foreground animate-breathe" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Private & Secure
                </h3>
                <p className="text-muted-foreground text-sm">
                  Your thoughts and feelings are completely private. We prioritize your safety and confidentiality.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Journal Section */}
        <section id="journal" className="py-12">
          <div className="text-center space-y-2 mb-12">
            <h2 className="text-3xl font-semibold text-foreground">
              Journal & Reflect
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A private space to process thoughts, explore feelings, and track your growth over time.
            </p>
          </div>
          <JournalSection />
        </section>

        {/* Resources Section */}
        <section id="resources" className="py-12">
          <ResourceHub />
        </section>

        {/* Quick Stats Preview */}
        <section className="py-12">
          <Card className="glass-card p-8">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-semibold text-foreground">
                  Your Wellness Journey
                </h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">7</div>
                  <div className="text-sm text-muted-foreground">Days tracked</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-secondary-foreground">3</div>
                  <div className="text-sm text-muted-foreground">Journal entries</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-accent-foreground">5</div>
                  <div className="text-sm text-muted-foreground">Resources explored</div>
                </div>
              </div>

              <Button className="hover-glow">
                View Detailed Report
              </Button>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Index;
