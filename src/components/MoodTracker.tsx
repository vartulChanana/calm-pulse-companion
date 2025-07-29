import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useMoodEntries } from "@/hooks/useMoodEntries";

const moods = [
  { emoji: "😊", label: "Great", color: "text-green-500", score: 5 },
  { emoji: "🙂", label: "Good", color: "text-blue-500", score: 4 },
  { emoji: "😐", label: "Okay", color: "text-yellow-500", score: 3 },
  { emoji: "😔", label: "Low", color: "text-orange-500", score: 2 },
  { emoji: "😢", label: "Very Low", color: "text-red-500", score: 1 },
];

export const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [isTracked, setIsTracked] = useState(false);
  const { addMoodEntry, loading } = useMoodEntries();

  const handleMoodSelect = (index: number) => {
    setSelectedMood(index);
    setIsTracked(false);
  };

  const handleTrackMood = async () => {
    if (selectedMood !== null) {
      const mood = moods[selectedMood];
      const success = await addMoodEntry(mood.emoji, mood.score, notes);
      if (success) {
        setIsTracked(true);
        setNotes("");
      }
    }
  };

  return (
    <Card className="glass-card p-6 hover-lift">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-foreground">
            How are you feeling today?
          </h3>
          <p className="text-muted-foreground">
            Take a moment to check in with yourself
          </p>
        </div>

        {!isTracked ? (
          <>
            <div className="grid grid-cols-5 gap-4">
              {moods.map((mood, index) => (
                <button
                  key={index}
                  onClick={() => handleMoodSelect(index)}
                  className={`
                    p-4 rounded-2xl transition-all duration-300 border-2 cursor-pointer hover-bounce
                    ${selectedMood === index 
                      ? 'border-primary shadow-glow scale-110 animate-pulse-slow' 
                      : 'border-transparent hover:scale-105'
                    }
                    ${mood.color}
                    hover:shadow-soft
                  `}
                >
                  <div className="text-4xl mb-2 animate-float">
                    {mood.emoji}
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    {mood.label}
                  </div>
                </button>
              ))}
            </div>

            {selectedMood !== null && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <Label htmlFor="mood-notes">Notes (optional)</Label>
                  <Textarea
                    id="mood-notes"
                    placeholder="How are you feeling? What's on your mind?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <Button 
                  onClick={handleTrackMood}
                  disabled={loading}
                  className="transition-bounce hover-glow"
                  size="lg"
                >
                  {loading ? "Tracking..." : "Track My Mood"}
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <div className="text-6xl animate-mood-bounce">
              {moods[selectedMood!].emoji}
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-medium text-foreground">
                Mood tracked! 
              </h4>
              <p className="text-muted-foreground">
                Thank you for checking in. Remember, every feeling is valid.
              </p>
            </div>
            <Button 
              onClick={() => {
                setIsTracked(false); 
                setSelectedMood(null);
                setNotes("");
              }}
              variant="outline"
              className="mt-4"
            >
              Track Again
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};