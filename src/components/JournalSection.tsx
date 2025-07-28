import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Save, Sparkles } from "lucide-react";
import journalingScene from "@/assets/journaling-scene.jpg";

export const JournalSection = () => {
  const [journalEntry, setJournalEntry] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    if (journalEntry.trim()) {
      setIsSaved(true);
      // Here you would typically save to backend/local storage
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  const prompts = [
    "What made you smile today?",
    "What are you grateful for right now?",
    "How did you show kindness to yourself today?",
    "What would you tell a friend who's going through what you're experiencing?",
    "What small victory can you celebrate today?",
  ];

  const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      {/* Journal Writing Area */}
      <Card className="glass-card p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">
              Your Safe Space
            </h3>
            <p className="text-sm text-muted-foreground">
              Write freely, your thoughts are safe here
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-subtle p-4 rounded-xl border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent-foreground">
                Journal Prompt
              </span>
            </div>
            <p className="text-sm text-muted-foreground italic">
              "{randomPrompt}"
            </p>
          </div>

          <Textarea
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            placeholder="Start writing your thoughts here... Let your emotions flow freely."
            className="min-h-[200px] resize-none border-0 bg-background/50 backdrop-blur-sm text-base leading-relaxed"
          />

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {journalEntry.length} characters
            </span>
            <Button 
              onClick={handleSave}
              disabled={!journalEntry.trim()}
              className={`transition-all duration-300 ${isSaved ? 'bg-green-500 hover:bg-green-600' : ''}`}
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaved ? "Saved!" : "Save Entry"}
            </Button>
          </div>
        </div>
      </Card>

      {/* Inspiration Image */}
      <div className="space-y-6">
        <Card className="glass-card overflow-hidden hover-lift">
          <div className="relative">
            <img 
              src={journalingScene} 
              alt="Peaceful journaling scene"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          <div className="p-6 space-y-4">
            <h4 className="text-lg font-semibold text-foreground">
              The Power of Reflection
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Journaling helps process emotions, gain clarity, and track your mental health journey. 
              There's no right or wrong way to express yourself here.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                Self-reflection
              </span>
              <span className="px-3 py-1 bg-secondary/20 text-secondary-foreground text-xs rounded-full">
                Emotional clarity
              </span>
              <span className="px-3 py-1 bg-accent/20 text-accent-foreground text-xs rounded-full">
                Personal growth
              </span>
            </div>
          </div>
        </Card>

        <Card className="glass-subtle p-4">
          <h5 className="font-medium text-foreground mb-2">Quick Tips</h5>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Write without judgment</li>
            <li>• Focus on feelings, not just events</li>
            <li>• Be kind to yourself</li>
            <li>• Your privacy is protected</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};