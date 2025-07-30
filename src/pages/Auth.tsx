import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { Heart, Loader2 } from 'lucide-react';

const Auth = () => {
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: ''
  });

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields."
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await signIn(formData.email, formData.password);
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: error.message
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "You've been successfully logged in."
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Error",
        description: "An unexpected error occurred. Please try again."
      });
    }
    
    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields."
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await signUp(formData.email, formData.password, formData.displayName);
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Sign Up Failed",
          description: error.message
        });
      } else {
        toast({
          title: "Account Created!",
          description: "You can now sign in with your credentials."
        });
        setActiveTab('signin');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign Up Error",
        description: "An unexpected error occurred. Please try again."
      });
    }
    
    setIsLoading(false);
  };

  // Demo access for testing
  const handleDemoAccess = () => {
    setFormData({
      email: 'demo@mindful.app',
      password: 'demo123',
      displayName: 'Demo User'
    });
    setActiveTab('signin');
    toast({
      title: "Demo Mode",
      description: "Use these credentials to explore the app!"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20 flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 animate-scale-in">
          <div className="flex items-center justify-center gap-2">
            <div className="p-3 bg-gradient-to-r from-primary to-primary-glow rounded-xl animate-float shadow-glow">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground">Mindful</h1>
          </div>
          <p className="text-muted-foreground">Your Mental Health Companion</p>
        </div>

        {/* Demo Access */}
        <Card className="glass-card p-4 animate-slide-up border-primary/20">
          <Button 
            onClick={handleDemoAccess}
            variant="outline"
            className="w-full hover-glow transition-all duration-300 border-primary/30 hover:border-primary/50"
            disabled={isLoading}
          >
            Try Demo (No registration needed)
          </Button>
        </Card>

        {/* Auth Form */}
        <Card className="glass-card p-6 animate-slide-up border-primary/20 shadow-soft">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 glass-subtle mb-6">
              <TabsTrigger 
                value="signin" 
                className="transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger 
                value="signup" 
                className="transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="space-y-4 animate-fade-in">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    disabled={isLoading}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full hover-glow transition-all duration-300 bg-primary hover:bg-primary/90" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4 animate-fade-in">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Display Name</Label>
                  <Input
                    id="signup-name"
                    name="displayName"
                    type="text"
                    placeholder="Choose a display name"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    placeholder="Choose a password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    disabled={isLoading}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full hover-glow transition-all duration-300 bg-primary hover:bg-primary/90" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Info */}
        <Card className="glass-card p-4 animate-fade-in border-primary/10">
          <p className="text-sm text-muted-foreground text-center">
            Your privacy and security are our top priorities. All data is encrypted and secure.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Auth;