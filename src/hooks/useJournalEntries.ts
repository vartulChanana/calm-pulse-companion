import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export const useJournalEntries = () => {
  const { user } = useAuth();
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchJournalEntries = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setJournalEntries(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load journal entries"
      });
    } finally {
      setLoading(false);
    }
  };

  const saveJournalEntry = async (title: string, content: string, id?: string) => {
    if (!user) return false;

    try {
      if (id) {
        // Update existing entry
        const { error } = await supabase
          .from('journal_entries')
          .update({ title, content })
          .eq('id', id)
          .eq('user_id', user.id);

        if (error) throw error;
        
        toast({
          title: "Entry Updated",
          description: "Your journal entry has been updated."
        });
      } else {
        // Create new entry
        const { error } = await supabase
          .from('journal_entries')
          .insert({
            user_id: user.id,
            title,
            content
          });

        if (error) throw error;
        
        toast({
          title: "Entry Saved",
          description: "Your journal entry has been saved."
        });
      }
      
      fetchJournalEntries();
      return true;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save journal entry"
      });
      return false;
    }
  };

  const deleteJournalEntry = async (id: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('journal_entries')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      
      toast({
        title: "Entry Deleted",
        description: "Your journal entry has been deleted."
      });
      
      fetchJournalEntries();
      return true;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete journal entry"
      });
      return false;
    }
  };

  useEffect(() => {
    fetchJournalEntries();
  }, [user]);

  return {
    journalEntries,
    loading,
    saveJournalEntry,
    deleteJournalEntry,
    refreshEntries: fetchJournalEntries
  };
};