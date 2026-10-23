import type { LucideIcon } from 'lucide-react';
import {
  Activity, Brain, Clock, Ban, Smartphone, Wrench,
  HeartPulse, Users, ShieldCheck, Scale,
} from 'lucide-react';
import { CLUSTERS, type Cluster } from '@/lib/content/schema';

/** Drives the tier-3 visual fallback and the hub's section headings. */
export const CLUSTER_ICONS: Record<Cluster, LucideIcon> = {
  'anti-streak': Activity,
  adhd: Brain,
  'interval-tracking': Clock,
  quitting: Ban,
  ios: Smartphone,
  'home-maintenance': Wrench,
  health: HeartPulse,
  relationships: Users,
  privacy: ShieldCheck,
  'choosing-an-app': Scale,
};

export { CLUSTERS };
export type { Cluster };
