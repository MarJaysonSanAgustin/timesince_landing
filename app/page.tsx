import { appStoreUrl } from '@/lib/cta';
import Image from 'next/image';
import { Activity, ShieldCheck, CheckCircle2, Clock, ListX } from 'lucide-react';
import * as motion from 'motion/react-client';
import handAppImg from '@/assets/features/hand-app.png';
import badgeIosImg from '@/assets/badge-ios-en.svg';
import { SITE } from '@/lib/site';
import { faqs } from '@/lib/faq';
import { FEATURES } from '@/lib/features';
import { FeatureRow } from '@/components/sections/feature-row';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center w-full paper text-ink overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full px-4 pt-32 pb-24 sm:px-6 lg:px-8 flex items-center min-h-[90vh] justify-center overflow-hidden">
        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
          <motion.div
            className="flex flex-col items-start text-left max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              className="meta inline-flex items-center gap-2 rounded-card border border-line bg-card px-4 py-1.5 mb-8 uppercase"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-ube"></span>
              Plants watered. Parents called. Car oil changed.
            </motion.span>
            <h1 className="font-display text-5xl font-extrabold tracking-tight text-ink sm:text-7xl mb-6 leading-[1.05]">
              How long since<br />
              <span className="text-ube">
                you last did it?
              </span>
            </h1>
            <p className="text-xl text-muted leading-relaxed mb-10 max-w-lg">
              TimeSince counts the time since you last did something, and keeps counting. <strong className="font-semibold text-ink">No streaks, no due dates, nothing to break.</strong> Come back after a day or a month; what you already did is still there.
            </p>
            <div className="flex items-center gap-4">
              <motion.a
                href={appStoreUrl('web_home_hero')}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block transition-transform"
              >
                <Image src={badgeIosImg} alt="Download on the App Store" className="h-[50px] w-auto" />
              </motion.a>
            </div>

            <div className="mt-8 flex flex-col items-start gap-1">
              <div className="flex items-center gap-2">
                <span className="meta inline-flex items-center gap-1.5 rounded-card border border-line bg-card px-2.5 py-1 uppercase">
                  Great for ADHD
                </span>
                <span className="text-sm font-medium flex items-center gap-1.5 text-muted">
                  <ShieldCheck className="w-4 h-4 text-green-600" /> 100% Private
                </span>
              </div>
              <span className="text-sm text-faint">No accounts. No ads. No tracking.</span>
            </div>
          </motion.div>

          {/* App Mockups Container */}
          <motion.div
            className="relative w-full flex justify-center lg:justify-end"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.3,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            <div className="relative group w-full max-w-2xl flex justify-center lg:justify-end perspective-[1200px]">
              <Image
                src={handAppImg}
                alt="TimeSince App on Phone"
                className="w-full max-w-[400px] h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="w-full paper-dots py-32 relative z-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-20">
            <p className="mt-2 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Why standard trackers fail.
            </p>
            <p className="mt-6 text-lg leading-8 text-muted">
              Habit trackers and to-do lists assume life runs on rigid daily schedules. When something recurs every few weeks on no fixed date, it slips through the cracks entirely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div whileHover={{ y: -5 }} className="ticket p-8">
              <div className="accent-neutral accent-block w-12 h-12 rounded-card flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-ink mb-3 font-display">The &quot;When Did I Last...?&quot; Guesswork</h3>
              <p className="text-muted leading-relaxed">Forgetting vital, irregular chores, medical routines, or social connections because they don&apos;t happen every single day.</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="ticket p-8">
              <div className="accent-neutral accent-block w-12 h-12 rounded-card flex items-center justify-center mb-6">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-ink mb-3 font-display">Rigid Tracker Anxiety</h3>
              <p className="text-muted leading-relaxed">Stressing over broken &quot;daily streaks&quot; for habits that naturally recur every few days or weeks. Life always happens.</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="ticket p-8">
              <div className="accent-neutral accent-block w-12 h-12 rounded-card flex items-center justify-center mb-6">
                <ListX className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-ink mb-3 font-display">Scattered Information</h3>
              <p className="text-muted leading-relaxed">Using messy notebooks or general spreadsheets to keep track of various household maintenance, health logs, and personal counters.</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="ticket p-8">
              <div className="accent-neutral accent-block w-12 h-12 rounded-card flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-ink mb-3 font-display">Privacy Concerns</h3>
              <p className="text-muted leading-relaxed">Reluctance to log deeply personal or sensitive habits in cloud-hosted trackers that monetize your behavioral data.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      {/* Features Showcase Header */}
      <section className="w-full bg-paper pt-32 pb-16" id="features">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl lg:text-center">
            <div className="flex justify-center mb-10">
              <span className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-medium text-muted ring-1 ring-inset ring-line shadow-xs">
                Features
              </span>
            </div>
            <p className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Track the rhythm, not the routine.
            </p>
            <p className="mt-6 text-lg leading-8 text-muted">
              By focusing purely on the time since you last did something, TimeSince offers a relaxing, data-rich way to capture your life&apos;s unique tempos.
            </p>
          </div>
        </div>
      </section>

      {/* The 11 feature rows, from lib/features.ts. Alternation is index
          parity, which is how the hand-written blocks did it too. */}
      {FEATURES.map((feature, i) => (
        <FeatureRow
          key={feature.slug}
          feature={feature}
          reverse={i % 2 === 1}
          showLearnMore
        />
      ))}

      {/* FAQ preview */}
      <section className="w-full paper-dots py-32" id="faq">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Frequently asked questions
            </p>
            <p className="mt-6 text-lg leading-8 text-muted">
              The short answers. For the full list, visit the <a href="/faq" className="text-ube hover:underline">FAQ page</a>.
            </p>
          </div>
          <div className="space-y-4">
            {faqs
              .filter((item) => item.featured)
              .map((item) => (
                <details key={item.question} className="group bg-white rounded-2xl border border-line shadow-sm px-6 py-5 open:shadow-md transition-shadow">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-ink">
                    {item.question}
                    <span className="ml-4 shrink-0 text-ube transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                  </summary>
                  <p className="mt-3 text-muted leading-relaxed">{item.answer}</p>
                </details>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full paper py-32 relative overflow-hidden" id="download">
                <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center z-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-extrabold tracking-tight text-ink sm:text-6xl font-display mb-8">
              Tracking that asks <br />
              <span className="text-ube">nothing of you.</span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl leading-8 text-muted mb-10">
              When it has been a while, TimeSince just says so. No red, no catching up, no streak to rebuild. Free for your first three counters, with no account and no ads.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href={appStoreUrl('web_home_footer')} target="_blank" rel="noopener noreferrer" className="inline-block hover:scale-105 active:scale-95 transition-transform">
                <Image src={badgeIosImg} alt="Download on the App Store" className="h-[50px] w-auto" />
              </a>
            </div>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted font-medium">
              <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> Free for 3 counters</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> Private by design</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> Start without signing up</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
