import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useJournalEntries } from '@/hooks/useJournalEntries';
import { Plus, Edit, Trash2, Calendar, BookOpen } from 'lucide-react';
import journalingScene from '@/assets/journaling-scene.jpg';

const JournalList = () => {
  const { journalEntries, saveJournalEntry, deleteJournalEntry, loading } = useJournalEntries();
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  const prompts = [
    "What are three things you're grateful for today?",
    "Describe a moment when you felt proud of yourself.",
    "What emotions did you experience today and why?",
    "Write about a challenge you're currently facing.",
    "What would you tell your younger self?",
    "Describe your ideal day in detail.",
    "What are you learning about yourself lately?"
  ];

  const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];

  const handleStartCreating = () => {
    setIsCreating(true);
    setEditingId(null);
    setFormData({ title: '', content: '' });
  };

  const handleEdit = (entry: any) => {
    setEditingId(entry.id);
    setIsCreating(false);
    setFormData({
      title: entry.title,
      content: entry.content
    });
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.content.trim()) return;

    const success = await saveJournalEntry(
      formData.title,
      formData.content,
      editingId || undefined
    );

    if (success) {
      setIsCreating(false);
      setEditingId(null);
      setFormData({ title: '', content: '' });
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setFormData({ title: '', content: '' });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this journal entry?')) {
      await deleteJournalEntry(id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">
          Journal & Reflect
        </h2>
        <p className="text-muted-foreground">
          A private space to process thoughts and track your growth
        </p>
      </div>

      {/* Writing Prompt */}
      <Card className="glass-card p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-accent/20 rounded-lg flex-shrink-0">
            <BookOpen className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-2">Writing Prompt</h3>
            <p className="text-muted-foreground italic">"{randomPrompt}"</p>
          </div>
        </div>
      </Card>

      {/* Create/Edit Form */}
      {(isCreating || editingId) && (
        <Card className="glass-card p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              {editingId ? 'Edit Entry' : 'New Journal Entry'}
            </h3>
            
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Give your entry a title..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Start writing your thoughts..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="min-h-[200px]"
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleSave}
                disabled={loading || !formData.title.trim() || !formData.content.trim()}
                className="hover-glow"
              >
                {loading ? 'Saving...' : 'Save Entry'}
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Action Button */}
      {!isCreating && !editingId && (
        <div className="text-center">
          <Button onClick={handleStartCreating} className="hover-glow">
            <Plus className="h-4 w-4 mr-2" />
            Write New Entry
          </Button>
        </div>
      )}

      {/* Journal Entries List */}
      <div className="space-y-4">
        {loading && journalEntries.length === 0 ? (
          <Card className="glass-card p-8 text-center">
            <p className="text-muted-foreground">Loading your journal entries...</p>
          </Card>
        ) : journalEntries.length === 0 ? (
          <Card className="glass-card p-8 text-center space-y-4">
            <img 
              src={journalingScene} 
              alt="Journaling"
              className="w-32 h-32 object-cover rounded-lg mx-auto opacity-50"
            />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Start Your Journaling Journey
              </h3>
              <p className="text-muted-foreground">
                Write your first entry to begin reflecting on your thoughts and feelings.
              </p>
            </div>
          </Card>
        ) : (
          journalEntries.map((entry) => (
            <Card key={entry.id} className="glass-card p-6 hover-lift">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {entry.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {formatDate(entry.created_at)}
                      </span>
                      {entry.updated_at !== entry.created_at && (
                        <Badge variant="secondary" className="text-xs">
                          Updated
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(entry)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(entry.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <p className="text-muted-foreground line-clamp-3">
                  {entry.content}
                </p>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default JournalList;