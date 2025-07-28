import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Heart, 
  Users, 
  Zap, 
  Moon, 
  Smile,
  ExternalLink,
  Play,
  BookOpen 
} from "lucide-react";

const resources = [
  {
    title: "Managing Anxiety",
    description: "Practical techniques to understand and cope with anxiety in daily life.",
    type: "article",
    category: "Anxiety",
    icon: Brain,
    color: "bg-blue-50 text-blue-600",
    estimated_time: "8 min read"
  },
  {
    title: "5-Minute Breathing Exercise",
    description: "A guided breathing exercise to help you find calm in moments of stress.",
    type: "video",
    category: "Stress Relief",
    icon: Heart,
    color: "bg-green-50 text-green-600",
    estimated_time: "5 min"
  },
  {
    title: "Building Better Sleep Habits",
    description: "Evidence-based strategies for improving sleep quality and establishing healthy routines.",
    type: "guide",
    category: "Sleep",
    icon: Moon,
    color: "bg-purple-50 text-purple-600",
    estimated_time: "12 min read"
  },
  {
    title: "Connecting with Others",
    description: "Tips for building meaningful relationships and maintaining social connections.",
    type: "article",
    category: "Relationships",
    icon: Users,
    color: "bg-orange-50 text-orange-600",
    estimated_time: "6 min read"
  },
  {
    title: "Energy and Motivation",
    description: "Understanding energy cycles and finding motivation during difficult times.",
    type: "guide",
    category: "Productivity",
    icon: Zap,
    color: "bg-yellow-50 text-yellow-600",
    estimated_time: "10 min read"
  },
  {
    title: "Daily Gratitude Practice",
    description: "Simple gratitude exercises to shift perspective and boost mood.",
    type: "video",
    category: "Mindfulness",
    icon: Smile,
    color: "bg-pink-50 text-pink-600",
    estimated_time: "7 min"
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "video":
      return Play;
    case "guide":
      return BookOpen;
    default:
      return ExternalLink;
  }
};

export const ResourceHub = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-semibold text-foreground">
          Resource Hub
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Curated resources to support your mental health journey. 
          Take what feels helpful and leave what doesn't resonate.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => {
          const IconComponent = resource.icon;
          const TypeIcon = getTypeIcon(resource.type);
          
          return (
            <Card 
              key={index}
              className="glass-card p-6 hover-lift transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl ${resource.color}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {resource.category}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground text-lg leading-tight">
                    {resource.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {resource.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <TypeIcon className="h-3 w-3" />
                    <span>{resource.estimated_time}</span>
                  </div>
                  <Button size="sm" className="transition-bounce">
                    Access
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="glass-subtle p-6 text-center">
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground">
            Looking for something specific?
          </h4>
          <p className="text-muted-foreground text-sm">
            Our resource library is continuously growing. 
            Suggest topics you'd like to see covered.
          </p>
          <Button variant="outline" className="hover-glow">
            Request Resources
          </Button>
        </div>
      </Card>
    </div>
  );
};