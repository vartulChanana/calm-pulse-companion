import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const moods = [
  { emoji: "😊", label: "Great", color: "bg-green-100 hover:bg-green-200" },
  { emoji: "🙂", label: "Good", color: "bg-blue-100 hover:bg-blue-200" },
  { emoji: "😐", label: "Okay", color: "bg-yellow-100 hover:bg-yellow-200" },
  { emoji: "😕", label: "Low", color: "bg-orange-100 hover:bg-orange-200" },
  { emoji: "😢", label: "Hard", color: "bg-red-100 hover:bg-red-200" },
];

export const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [isTracked, setIsTracked] = useState(false);

  const handleMoodSelect = (index: number) => {
    setSelectedMood(index);
  };

  const handleTrackMood = () => {
    if (selectedMood !== null) {
      setIsTracked(true);
      // Here you would typically save to backend/local storage
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
                    p-4 rounded-2xl transition-all duration-300 border-2
                    ${selectedMood === index 
                      ? 'border-primary shadow-glow scale-110' 
                      : 'border-transparent hover:scale-105'
                    }
                    ${mood.color}
                    hover:shadow-soft
                  `}
                >
                  <div className="text-4xl mb-2 animate-gentle-pulse">
                    {mood.emoji}
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    {mood.label}
                  </div>
                </button>
              ))}
            </div>

            {selectedMood !== null && (
              <Button 
                onClick={handleTrackMood}
                className="transition-bounce hover-glow"
                size="lg"
              >
                Track My Mood
              </Button>
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
              onClick={() => {setIsTracked(false); setSelectedMood(null);}}
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