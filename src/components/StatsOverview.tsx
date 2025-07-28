import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { 
  BarChart3, 
  Calendar, 
  BookOpen, 
  TrendingUp, 
  Target,
  Award,
  Activity
} from 'lucide-react';

interface UserStats {
  totalMoodEntries: number;
  totalJournalEntries: number;
  currentStreak: number;
  averageMood: number;
  mostFrequentMood: string;
  recentActivity: any[];
}

const StatsOverview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats>({
    totalMoodEntries: 0,
    totalJournalEntries: 0,
    currentStreak: 0,
    averageMood: 0,
    mostFrequentMood: '😐',
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Fetch mood entries
      const { data: moodData } = await supabase
        .from('mood_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      // Fetch journal entries
      const { data: journalData } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      // Calculate stats
      const moodEntries = moodData || [];
      const journalEntries = journalData || [];
      
      const totalMoodEntries = moodEntries.length;
      const totalJournalEntries = journalEntries.length;
      
      // Calculate average mood
      const averageMood = moodEntries.length > 0 
        ? moodEntries.reduce((sum, entry) => sum + entry.mood_score, 0) / moodEntries.length
        : 0;

      // Find most frequent mood
      const moodCounts: { [key: string]: number } = {};
      moodEntries.forEach(entry => {
        moodCounts[entry.mood_emoji] = (moodCounts[entry.mood_emoji] || 0) + 1;
      });
      const mostFrequentMood = Object.keys(moodCounts).reduce((a, b) => 
        moodCounts[a] > moodCounts[b] ? a : b, '😐'
      );

      // Calculate current streak (simplified - days with any activity)
      const today = new Date();
      let currentStreak = 0;
      const allEntries = [
        ...moodEntries.map(e => ({ type: 'mood', date: e.created_at })),
        ...journalEntries.map(e => ({ type: 'journal', date: e.created_at }))
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      const uniqueDays = [...new Set(allEntries.map(e => 
        new Date(e.date).toDateString()
      ))];

      for (let i = 0; i < uniqueDays.length; i++) {
        const entryDate = new Date(uniqueDays[i]);
        const expectedDate = new Date(today);
        expectedDate.setDate(today.getDate() - i);
        
        if (entryDate.toDateString() === expectedDate.toDateString()) {
          currentStreak++;
        } else {
          break;
        }
      }

      // Recent activity (last 5 entries)
      const recentActivity = allEntries.slice(0, 5);

      setStats({
        totalMoodEntries,
        totalJournalEntries,
        currentStreak,
        averageMood: Number(averageMood.toFixed(1)),
        mostFrequentMood,
        recentActivity
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [user]);

  const getMoodLabel = (score: number) => {
    if (score >= 4.5) return 'Excellent';
    if (score >= 3.5) return 'Good';
    if (score >= 2.5) return 'Okay';
    if (score >= 1.5) return 'Low';
    return 'Very Low';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Card className="glass-card p-8 text-center">
        <p className="text-muted-foreground">Loading your insights...</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">
          Your Wellness Insights
        </h2>
        <p className="text-muted-foreground">
          Track your progress and celebrate your journey
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card p-6 text-center hover-lift">
          <div className="space-y-2">
            <div className="p-3 bg-primary/10 rounded-2xl w-fit mx-auto">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">{stats.totalMoodEntries}</div>
            <div className="text-sm text-muted-foreground">Mood Check-ins</div>
          </div>
        </Card>

        <Card className="glass-card p-6 text-center hover-lift">
          <div className="space-y-2">
            <div className="p-3 bg-secondary/20 rounded-2xl w-fit mx-auto">
              <BookOpen className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div className="text-2xl font-bold text-secondary-foreground">{stats.totalJournalEntries}</div>
            <div className="text-sm text-muted-foreground">Journal Entries</div>
          </div>
        </Card>

        <Card className="glass-card p-6 text-center hover-lift">
          <div className="space-y-2">
            <div className="p-3 bg-accent/20 rounded-2xl w-fit mx-auto">
              <Target className="h-6 w-6 text-accent-foreground" />
            </div>
            <div className="text-2xl font-bold text-accent-foreground">{stats.currentStreak}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </div>
        </Card>

        <Card className="glass-card p-6 text-center hover-lift">
          <div className="space-y-2">
            <div className="p-3 bg-primary/10 rounded-2xl w-fit mx-auto">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">{stats.averageMood}</div>
            <div className="text-sm text-muted-foreground">Avg Mood</div>
          </div>
        </Card>
      </div>

      {/* Mood Analysis */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="glass-card p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Mood Analysis</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Average Mood</span>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{getMoodLabel(stats.averageMood)}</Badge>
                  <span className="font-medium">{stats.averageMood}/5</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Most Common</span>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{stats.mostFrequentMood}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-accent-foreground" />
              <h3 className="text-lg font-semibold text-foreground">Achievements</h3>
            </div>
            
            <div className="space-y-3">
              {stats.currentStreak >= 7 && (
                <Badge className="bg-accent/20 text-accent-foreground">
                  🔥 Week Warrior
                </Badge>
              )}
              {stats.totalJournalEntries >= 5 && (
                <Badge className="bg-secondary/20 text-secondary-foreground">
                  ✍️ Reflective Writer
                </Badge>
              )}
              {stats.totalMoodEntries >= 10 && (
                <Badge className="bg-primary/20 text-primary">
                  📊 Mood Tracker
                </Badge>
              )}
              {stats.currentStreak === 0 && stats.totalMoodEntries === 0 && stats.totalJournalEntries === 0 && (
                <p className="text-muted-foreground text-sm">
                  Start tracking to earn achievements!
                </p>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="glass-card p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-secondary-foreground" />
            <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          </div>
          
          {stats.recentActivity.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No recent activity. Start by tracking your mood or writing a journal entry!
            </p>
          ) : (
            <div className="space-y-3">
              {stats.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-background/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    {activity.type === 'mood' ? (
                      <Calendar className="h-4 w-4 text-primary" />
                    ) : (
                      <BookOpen className="h-4 w-4 text-secondary-foreground" />
                    )}
                    <span className="text-foreground">
                      {activity.type === 'mood' ? 'Mood tracked' : 'Journal entry'}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(activity.date)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default StatsOverview;