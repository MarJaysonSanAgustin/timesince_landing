import Image from 'next/image';
import {
  Activity,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Clock,
  ListX,
  Palette,
  Pencil,
  Lock,
  BarChart2,
  Layers,
} from 'lucide-react';
import * as motion from 'motion/react-client';
import handAppImg from '../assets/features/hand-app.png';
import customImg from '../assets/features/custom.png';
import customInputsImg from '../assets/features/custom-inputs.png';
import privateImg from '../assets/features/private.png';
import rythmImg from '../assets/features/rythm.png';
import timelineImg from '../assets/features/timeline.png';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center w-full bg-[#F9FAFB] text-gray-900 overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full px-4 pt-32 pb-24 sm:px-6 lg:px-8 flex flex-col items-center text-center mx-auto min-h-[90vh] justify-center overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-purple-400/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-300/20 rounded-full blur-[120px] pointer-events-none"></div>

        <motion.div
          className="relative z-10 max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm px-4 py-1.5 text-xs font-bold tracking-widest text-purple-700 ring-1 ring-inset ring-purple-600/20 mb-8 shadow-sm uppercase"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="h-2 w-2 rounded-full bg-purple-600 animate-pulse"></span>
            A New Era In Habit Building
          </motion.span>
          <h1 className="font-display text-5xl font-extrabold tracking-tight text-gray-900 sm:text-7xl mb-8 leading-[1.05]">
            Consistency without<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-violet-500 to-blue-500">
              the anxiety.
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 leading-relaxed mb-12">
            <strong className="font-semibold text-gray-900">No streaks, no pressure, no guilt.</strong> Life happens. Build habits at your own pace without the pressure of a perfect streak.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <motion.a
              href="#download"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-gray-900 px-8 py-4 text-base font-semibold text-white transition-all shadow-lg hover:shadow-xl flex items-center gap-2 w-full sm:w-auto justify-center group"
            >
              Get TimeSince Free <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100/80 px-2.5 py-0.5 text-xs font-bold tracking-wide text-yellow-800 ring-1 ring-inset ring-yellow-600/20 uppercase">
                  <span className="text-yellow-600">🏆</span> Great for ADHD
                </span>
                <span className="text-sm font-medium flex items-center gap-1.5 text-gray-700">
                  <ShieldCheck className="w-4 h-4 text-green-600" /> 100% Private
                </span>
              </div>
              <span className="text-sm text-gray-500">No servers. No ads. No accounts.</span>
            </div>
          </div>
        </motion.div>

        {/* App Mockups Container */}
        <motion.div
          className="mt-24 relative w-full max-w-5xl mx-auto z-10"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          <div className="relative group flex justify-center items-center">
            <Image
              src={handAppImg}
              alt="TimeSince App on Phone"
              className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]"
              priority
            />
          </div>
        </motion.div>
      </section>

      {/* The Problem Section */}
      <section className="w-full bg-white py-32 relative z-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-20">
            <h2 className="text-sm font-bold leading-7 text-purple-600 tracking-widest uppercase">The Problem</h2>
            <p className="mt-2 font-display text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Why standard trackers fail.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Standard habit trackers and to-do lists assume life operates on rigid, daily schedules. When a task doesn't have a fixed deadline, it slips through the cracks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div whileHover={{ y: -5 }} className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-gray-200 text-gray-800 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">The "When Did I Last...?" Guesswork</h3>
              <p className="text-gray-600 leading-relaxed">Forgetting vital, irregular chores, medical routines, or social connections because they don't happen every single day.</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-gray-200 text-gray-800 rounded-2xl flex items-center justify-center mb-6">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">Rigid Tracker Anxiety</h3>
              <p className="text-gray-600 leading-relaxed">Stressing over broken "daily streaks" for habits that naturally recur every few days or weeks. Life always happens.</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-gray-200 text-gray-800 rounded-2xl flex items-center justify-center mb-6">
                <ListX className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">Scattered Information</h3>
              <p className="text-gray-600 leading-relaxed">Using messy notebooks or general spreadsheets to keep track of various household maintenance, health logs, and personal events.</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-gray-200 text-gray-800 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">Privacy Concerns</h3>
              <p className="text-gray-600 leading-relaxed">Reluctance to log deeply personal or sensitive habits in cloud-hosted trackers that monetize your behavioral data.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      {/* Features Showcase Header */}
      <section className="w-full bg-[#F9FAFB] pt-32 pb-16" id="features">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl lg:text-center">
            <h2 className="text-sm font-bold leading-7 text-purple-600 tracking-widest uppercase">The Solution</h2>
            <p className="mt-2 font-display text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Manage life on your own terms.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              TimeSince focuses entirely on the interval, the time since last done, giving you a relaxing, data-rich way to capture your unique tempos.
            </p>
          </div>
        </div>
      </section>

      {/* Feature 1: Dynamic Event Customization */}
      <section className="w-full bg-white py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 space-y-6">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                <Palette className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-extrabold font-display text-gray-900">Dynamic Event Customization</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Make every tracked moment visually your own. Customize events using a rich spectrum of curated, premium color palettes, intuitive emoji icons, and custom image covers for full personalization.
              </p>
            </div>
            <div className="flex-1 w-full flex items-center justify-center relative">
              <Image src={customImg} alt="Dynamic Event Customization" className="w-full max-w-[320px] h-auto object-contain drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2: Find your natural rhythm */}
      <section className="w-full bg-[#F9FAFB] py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20">
            <div className="flex-1 space-y-6">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                <BarChart2 className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-extrabold font-display text-gray-900">Find your natural rhythm.</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                No rigid schedules, just insights into how you actually spend your time. We analyze your logging history to calculate average intervals and render beautiful dynamic charts displaying interval trends.
              </p>
            </div>
            <div className="flex-1 w-full flex items-center justify-center relative">
              <Image src={rythmImg} alt="Rhythm Analytics" className="w-full max-w-[320px] h-auto object-contain drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature 3: Keep it personal */}
      <section className="w-full bg-white py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-extrabold font-display text-gray-900">Keep it personal.</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Lock sensitive habits and routines behind FaceID. TimeSince features a dedicated hidden layer shielded by biometric security, fully masked from the main UI and encrypted locally.
              </p>
            </div>
            <div className="flex-1 w-full flex items-center justify-center relative">
              <Image src={privateImg} alt="Privacy-First Hidden Events" className="w-full max-w-[320px] h-auto object-contain drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature 4: Advanced Custom Logging */}
      <section className="w-full bg-[#F9FAFB] py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20">
            <div className="flex-1 space-y-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                <Pencil className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-extrabold font-display text-gray-900">Advanced Custom Logging</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Go far beyond simple date-and-time stamps. Define custom inputs for each event: numbers for doses or costs (with a built-in calculator), text fields for detailed journaling, or photos for visual evidence.
              </p>
            </div>
            <div className="flex-1 w-full flex items-center justify-center relative">
              <Image src={customInputsImg} alt="Advanced Custom Logging" className="w-full max-w-[320px] h-auto object-contain drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature 5: A Beautiful Timeline */}
      <section className="w-full bg-white py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 space-y-6">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                <Layers className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-extrabold font-display text-gray-900">A Beautiful Timeline</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Keep your habits, events, and routines perfectly organized in a stunning timeline. Easily visualize your history, track your intervals, and capture the natural rhythm of your life in one place.
              </p>
            </div>
            <div className="flex-1 w-full flex items-center justify-center relative">
              <Image src={timelineImg} alt="A Beautiful Timeline" className="w-full max-w-[320px] h-auto object-contain drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="w-full bg-white py-32 relative overflow-hidden" id="download">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-100/50 via-white to-white pointer-events-none"></div>
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center z-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl font-display mb-8">
              Habit tracking, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">minus the guilt trip.</span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl leading-8 text-gray-600 mb-10">
              Say goodbye to broken streaks and stressful notifications. Discover a simpler, kinder way to track what matters at your own natural pace.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="rounded-full bg-gray-900 px-10 py-4 text-lg font-bold text-white transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-3">
                Download for iOS
              </button>
            </div>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600 font-medium">
              <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> Generous free version</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> 100% private & offline</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> Start without signing up</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
