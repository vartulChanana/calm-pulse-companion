import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Send, Users, Heart, MessageCircle } from 'lucide-react';

interface CommunityMessage {
  id: string;
  message: string;
  anonymous_name: string;
  created_at: string;
}

const CommunityFeed = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<CommunityMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [anonymousName, setAnonymousName] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('community_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setMessages(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load community messages"
      });
    } finally {
      setLoading(false);
    }
  };

  const submitMessage = async () => {
    if (!user || !newMessage.trim() || !anonymousName.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('community_messages')
        .insert({
          user_id: user.id,
          message: newMessage.trim(),
          anonymous_name: anonymousName.trim()
        });

      if (error) throw error;
      
      toast({
        title: "Message Shared",
        description: "Your message has been shared with the community."
      });
      
      setNewMessage('');
      fetchMessages();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to share message"
      });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    
    // Generate a random anonymous name if not set
    if (!anonymousName) {
      const adjectives = ['Kind', 'Brave', 'Gentle', 'Strong', 'Peaceful', 'Wise', 'Caring', 'Hopeful'];
      const nouns = ['Soul', 'Spirit', 'Heart', 'Mind', 'Friend', 'Warrior', 'Helper', 'Listener'];
      const randomName = `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
      setAnonymousName(randomName);
    }
  }, []);

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - past.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">
          Safe Community
        </h2>
        <p className="text-muted-foreground">
          Connect anonymously with others on similar journeys
        </p>
      </div>

      {/* Share Message */}
      <Card className="glass-card p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Share Your Thoughts</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="anonymous-name">Anonymous Name</Label>
              <Input
                id="anonymous-name"
                placeholder="How would you like to be known?"
                value={anonymousName}
                onChange={(e) => setAnonymousName(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="message">Your Message</Label>
            <Textarea
              id="message"
              placeholder="Share something positive, ask for support, or offer encouragement..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <Button 
            onClick={submitMessage}
            disabled={submitting || !newMessage.trim() || !anonymousName.trim()}
            className="hover-glow"
          >
            <Send className="h-4 w-4 mr-2" />
            {submitting ? 'Sharing...' : 'Share Message'}
          </Button>
        </div>
      </Card>

      {/* Community Guidelines */}
      <Card className="glass-card p-4 bg-accent/10 border-accent/20">
        <div className="flex items-start gap-3">
          <Heart className="h-5 w-5 text-accent-foreground mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Community Guidelines</h4>
            <p className="text-sm text-muted-foreground">
              This is a safe space. Please be kind, supportive, and respectful. 
              Share experiences, offer encouragement, and remember we're all on this journey together.
            </p>
          </div>
        </div>
      </Card>

      {/* Messages Feed */}
      <div className="space-y-4">
        {loading ? (
          <Card className="glass-card p-8 text-center">
            <p className="text-muted-foreground">Loading community messages...</p>
          </Card>
        ) : messages.length === 0 ? (
          <Card className="glass-card p-8 text-center space-y-4">
            <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Start the Conversation
              </h3>
              <p className="text-muted-foreground">
                Be the first to share a message with the community.
              </p>
            </div>
          </Card>
        ) : (
          messages.map((message) => (
            <Card key={message.id} className="glass-card p-6 hover-lift">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {message.anonymous_name}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(message.created_at)}
                  </span>
                </div>
                
                <p className="text-foreground leading-relaxed">
                  {message.message}
                </p>
                
                <div className="flex items-center gap-4 pt-2">
                  <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">Support</span>
                  </button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CommunityFeed;