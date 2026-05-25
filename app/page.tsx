import Image from 'next/image';
import { 
  Activity, 
  ShieldCheck, 
  BrainCircuit, 
  Home, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ListX, 
  Palette, 
  Pencil, 
  Lock, 
  BarChart2, 
  Layers, 
  Smartphone,
  HeartPulse
} from 'lucide-react';
import * as motion from 'motion/react-client';
import mainScreensImg from '../assets/features/main-screens.png';
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
            className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold text-purple-700 ring-1 ring-inset ring-purple-600/20 mb-8 shadow-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="h-2 w-2 rounded-full bg-purple-600 animate-pulse"></span>
            Premium, Privacy-Focused, Local-First
          </motion.span>
          <h1 className="font-display text-5xl font-extrabold tracking-tight text-gray-900 sm:text-7xl mb-8 leading-[1.05]">
            Track your life's<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-violet-500 to-blue-500">
              natural rhythm.
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 leading-relaxed mb-12">
            In a world obsessed with rigid schedules, hourly calendars, and stressful daily streaks, we often lose track of the dynamic, fluid rhythms of our actual lives. 
            TimeSince is designed to help you monitor the natural space between your moments.
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
               <span className="text-sm font-medium flex items-center gap-1.5 text-gray-700">
                  <ShieldCheck className="w-4 h-4 text-green-600" /> 100% Private, Local Storage
               </span>
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
          <div className="relative rounded-[2.5rem] p-3 bg-white/40 backdrop-blur-md border border-white/60 shadow-2xl shadow-purple-500/10 group overflow-hidden">
            <div className="rounded-[2rem] overflow-hidden bg-gray-100 flex justify-center items-center">
              <Image
                src={mainScreensImg}
                alt="TimeSince App Screens"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2.5rem]"></div>
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
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">The "When Did I Last...?" Guesswork</h3>
              <p className="text-gray-600 leading-relaxed">Forgetting vital, irregular chores, medical routines, or social connections because they don't happen every single day.</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">Rigid Tracker Anxiety</h3>
              <p className="text-gray-600 leading-relaxed">Stressing over broken "daily streaks" for habits that naturally recur every few days or weeks. Life always happens.</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <ListX className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">Scattered Information</h3>
              <p className="text-gray-600 leading-relaxed">Using messy notebooks or general spreadsheets to keep track of various household maintenance, health logs, and personal events.</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">Privacy Concerns</h3>
              <p className="text-gray-600 leading-relaxed">Reluctance to log deeply personal or sensitive habits in cloud-hosted trackers that monetize your behavioral data.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="w-full bg-[#F9FAFB] py-32" id="features">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl lg:text-center mb-24">
            <h2 className="text-sm font-bold leading-7 text-purple-600 tracking-widest uppercase">The Solution</h2>
            <p className="mt-2 font-display text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Manage life on your own terms.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              TimeSince focuses entirely on the interval—the time since last done—giving you a relaxing, data-rich way to capture your unique tempos.
            </p>
          </div>

          <div className="flex flex-col gap-24 max-w-6xl mx-auto">
            {/* Feature 1 */}
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

            {/* Feature 2 */}
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

            {/* Feature 3 */}
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
              <div className="flex-1 space-y-6">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                  <Lock className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-extrabold font-display text-gray-900">Privacy-First Hidden Events</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Keep sensitive habits completely confidential. TimeSince features a dedicated hidden layer shielded by biometric security (Face ID / Touch ID), fully masked from the main UI and encrypted locally.
                </p>
              </div>
              <div className="flex-1 w-full flex items-center justify-center relative">
                 <Image src={privateImg} alt="Privacy-First Hidden Events" className="w-full max-w-[320px] h-auto object-contain drop-shadow-2xl" />
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20">
              <div className="flex-1 space-y-6">
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                  <BarChart2 className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-extrabold font-display text-gray-900">Rhythm Analytics</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Discover your natural habits. We analyze your logging history to calculate average intervals, smartly categorize events by frequency, and render beautiful dynamic charts displaying interval trends over time.
                </p>
              </div>
              <div className="flex-1 w-full flex items-center justify-center relative">
                 <Image src={rythmImg} alt="Rhythm Analytics" className="w-full max-w-[320px] h-auto object-contain drop-shadow-2xl" />
              </div>
            </div>

            {/* Feature 5 */}
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
               Ready to find your <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">natural rhythm?</span>
             </h2>
             <p className="mx-auto max-w-2xl text-xl leading-8 text-gray-600 mb-10">
               Stop punishing yourself with broken streaks. Start tracking what matters with an app designed for sustainable, guilt-free consistency.
             </p>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
               <button className="rounded-full bg-gray-900 px-10 py-4 text-lg font-bold text-white transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-3">
                 Download for iOS
               </button>
             </div>
             <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600 font-medium">
               <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> Free forever features</span>
               <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> Local-only privacy</span>
               <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> No account required</span>
             </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
