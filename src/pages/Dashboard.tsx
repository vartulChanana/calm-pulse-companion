import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MoodTracker } from '@/components/MoodTracker';
import JournalList from '@/components/JournalList';
import CommunityFeed from '@/components/CommunityFeed';
import StatsOverview from '@/components/StatsOverview';
import { Navigation } from '@/components/Navigation';
import { 
  Heart, 
  Calendar,
  BookOpen,
  Users,
  BarChart3,
  Sparkles 
} from 'lucide-react';
import heroMeditation from '@/assets/hero-meditation.jpg';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('mood');
  
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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20 animate-fade-in">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-subtle border-b border-border/30 animate-slide-up">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-primary to-primary-glow rounded-xl animate-float shadow-glow">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Mindful</h1>
                <p className="text-xs text-muted-foreground">
                  Welcome back, {user?.email?.split('@')[0] || 'User'}
                </p>
              </div>
            </div>
            <Navigation activeSection={activeTab} onSectionChange={setActiveTab} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-24">
        {/* Hero Section */}
        <section className="py-8 animate-scale-in">
          <div className="relative overflow-hidden rounded-3xl max-w-4xl mx-auto shadow-glow">
            <img 
              src={heroMeditation} 
              alt="Peaceful meditation scene"
              className="w-full h-60 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-3 text-white">
                <h2 className="text-3xl md:text-4xl font-bold animate-bounce-gentle">
                  Welcome Back
                </h2>
                <p className="text-lg opacity-90 animate-fade-in">{currentDate}</p>
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm animate-pulse-slow">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Your safe space for mental wellness
                </Badge>
              </div>
            </div>
          </div>
          
          {/* Daily Quote */}
          <Card className="glass-card p-6 max-w-2xl mx-auto mt-6 hover-lift animate-fade-in border-primary/20">
            <div className="text-center">
              <p className="text-foreground italic leading-relaxed">
                "{randomQuote}"
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Daily Inspiration
              </p>
            </div>
          </Card>
        </section>

        {/* Main Dashboard */}
        <section className="py-8 animate-slide-up">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 glass-card shadow-soft">
              <TabsTrigger 
                value="mood" 
                className="flex items-center gap-2 transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Calendar className="h-4 w-4" />
                Mood
              </TabsTrigger>
              <TabsTrigger 
                value="journal" 
                className="flex items-center gap-2 transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <BookOpen className="h-4 w-4" />
                Journal
              </TabsTrigger>
              <TabsTrigger 
                value="community" 
                className="flex items-center gap-2 transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Users className="h-4 w-4" />
                Community
              </TabsTrigger>
              <TabsTrigger 
                value="stats" 
                className="flex items-center gap-2 transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <BarChart3 className="h-4 w-4" />
                Insights
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mood" id="mood" className="space-y-6 animate-fade-in">
              <MoodTracker />
            </TabsContent>

            <TabsContent value="journal" id="journal" className="space-y-6 animate-fade-in">
              <JournalList />
            </TabsContent>

            <TabsContent value="community" id="community" className="space-y-6 animate-fade-in">
              <CommunityFeed />
            </TabsContent>

            <TabsContent value="stats" id="stats" className="space-y-6 animate-fade-in">
              <StatsOverview />
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;