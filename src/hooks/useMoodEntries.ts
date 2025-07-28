import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface MoodEntry {
  id: string;
  mood_emoji: string;
  mood_score: number;
  notes?: string;
  created_at: string;
}

export const useMoodEntries = () => {
  const { user } = useAuth();
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMoodEntries = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('mood_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMoodEntries(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load mood entries"
      });
    } finally {
      setLoading(false);
    }
  };

  const addMoodEntry = async (moodEmoji: string, moodScore: number, notes?: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('mood_entries')
        .insert({
          user_id: user.id,
          mood_emoji: moodEmoji,
          mood_score: moodScore,
          notes: notes
        });

      if (error) throw error;
      
      toast({
        title: "Mood Tracked!",
        description: "Your mood has been successfully recorded."
      });
      
      fetchMoodEntries();
      return true;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save mood entry"
      });
      return false;
    }
  };

  useEffect(() => {
    fetchMoodEntries();
  }, [user]);

  return {
    moodEntries,
    loading,
    addMoodEntry,
    refreshEntries: fetchMoodEntries
  };
};