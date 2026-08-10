import { Unlink, ListChecks, Brain, type LucideIcon } from 'lucide-react';

interface BlogVisual {
  icon: LucideIcon;
  gradient: string;
}

export const blogVisuals: Record<string, BlogVisual> = {
  'why-streaks-backfire': { icon: Unlink, gradient: 'from-purple-600 via-violet-500 to-blue-500' },
  'tracking-irregular-chores': { icon: ListChecks, gradient: 'from-orange-500 to-red-500' },
  'habit-tracking-with-adhd': { icon: Brain, gradient: 'from-emerald-500 to-teal-500' },
};

export const defaultBlogVisual: BlogVisual = { icon: Unlink, gradient: 'from-purple-600 to-blue-600' };
