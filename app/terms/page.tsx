import type { Metadata } from 'next';
import { SITE } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: `The terms of use for the ${SITE.fullName} app, including subscriptions, disclaimers, and your license.`,
  alternates: { canonical: '/terms' },
};

export default function TermsAndConditions() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">Terms &amp; Conditions</h1>
        <p className="text-lg text-gray-600">Last updated: {SITE.legalLastUpdated}</p>
      </div>

      <div className="prose prose-purple prose-lg text-gray-600 max-w-none space-y-8">
        <p>
          Welcome to {SITE.name}. These Terms of Use apply to the mobile application <strong>{SITE.fullName}</strong> provided by <strong>{SITE.name}</strong> (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;). By downloading, installing, or using the app, you agree to be bound by these terms.
        </p>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">1. License and Apple Terms</h2>
          <p>
            Your license to use the application is also subject to Apple&apos;s Standard End User License Agreement (EULA): <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">https://www.apple.com/legal/internet-services/itunes/dev/stdeula/</a>.
          </p>
          <p className="mt-2">
            In the event of a conflict between these Terms and Apple&apos;s mandatory platform guidelines, Apple&apos;s terms shall apply.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">2. What the app does</h2>
          <p>
            {SITE.name} is a personal utility designed to help you track habits, chores, intervals, and routines on your device without the anxiety of punitive streaks. Features include on-device database tracking, local reminders and alarms, custom logging fields, home screen widgets, Siri Shortcuts, NFC tag pairing, optional iCloud backup, data export, and optional paid upgrades ({SITE.name} Pro).
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">3. Subscriptions and purchases</h2>
          <p>
            The free tier of {SITE.name} lets you track up to <strong>3 active events</strong>, with core logging, reminders, and the widget. <strong>{SITE.name} Pro</strong> removes that limit and adds hidden events, archiving, custom logging fields (notes, photos, numbers), NFC pairing, Siri Shortcuts, and iCloud backup upload. Pro is offered as an auto-renewable subscription and, separately, as a one-time lifetime purchase. A lifetime purchase is not a subscription: it does not renew and is not billed again.
          </p>
          <p className="mt-2 font-semibold">For auto-renewable subscriptions:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Payment will be charged to your Apple ID account at confirmation of purchase.</li>
            <li>Subscriptions renew automatically unless canceled at least 24 hours prior to the end of the active billing period.</li>
            <li>Your account will be charged for renewal within 24 hours before the end of the current period.</li>
            <li>You can manage, configure, or cancel subscriptions in your Apple ID account settings after purchase.</li>
            <li>Any unused portion of a free trial, if offered, will be forfeited when you purchase a subscription.</li>
          </ul>
          <p className="mt-2">
            Prices are displayed locally inside the App Store and may vary by currency and region. Family Sharing availability follows standard App Store rules and Apple platform eligibility.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">4. If your subscription lapses</h2>
          <p>
            If a {SITE.name} Pro subscription ends and you have more than 3 active events, you&apos;ll be asked to choose up to 3 to keep active; the rest are <strong>archived, not deleted</strong>. Archived events and their history return automatically if you resubscribe or restore your purchase. Hidden events also become unavailable on the free tier until Pro is restored.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">5. Data, privacy, and backups</h2>
          <p>
            {SITE.name} stores your events and logs locally on your device, encrypted, with no developer-operated server involved. If you enable iCloud backup, a copy is written to your own private iCloud account under your Apple ID: a convenience, not a guarantee.
          </p>
          <p className="mt-2">
            Please review our complete <a href="/privacy" className="text-purple-600 hover:underline">Privacy Policy</a> to understand our data practices in full.
          </p>
          <p className="mt-2">
            Because we run no server-side copy of your data, we cannot recover it for you if a device is lost, reset, or damaged and iCloud backup was not enabled. You are responsible for enabling iCloud backup or using the in-app manual export to maintain your own copies.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">6. Availability and changes</h2>
          <p>
            We may update application features, pricing models, Pro benefits, and these terms from time to time. Your continued use of the application following the posting of any updates constitutes your acceptance of the modified Terms.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">7. Disclaimers</h2>
          <p>
            The application is provided strictly on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis to the maximum extent permitted by applicable law. We do not warrant that operation will be completely uninterrupted, error-free, or compatible with all operating system updates.
          </p>
          <p className="mt-2">
            <strong>Medical Disclaimer:</strong> {SITE.name} is not a medical device and does not provide clinical health advice. Features like numeric logging (for example, dose or count tracking) and quit-habit tracking are general wellness tools, not medical instruments, and this is not professional advice. Never rely on {SITE.name} as your sole record for medication schedules or other critical medical logs; always consult a qualified healthcare professional.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">8. Reminders are not guaranteed</h2>
          <p>
            Reminders and alarms are delivered by iOS, not by us, and are subject to the operating system&apos;s own limits and behavior, including a cap on pending notifications, and delays or suppression under Focus modes, Low Power Mode, or after the app has been force-quit. Do not rely on {SITE.name} for safety-critical or medical reminders where a missed notification could cause harm.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">9. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, in no event shall {SITE.name}, its developers, or affiliates be liable for indirect, incidental, special, consequential, or punitive damages (including but not limited to loss of data, personal logs, or device damage) arising from your use of the application.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">10. Termination</h2>
          <p>
            You can stop using the application and delete it at any time. We reserve the right to suspend or restrict access to premium subscription validation features if required for security reasons, compliance audits, or fraud prevention.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">11. Governing law</h2>
          <p>
            {/* TODO: fill in your jurisdiction, e.g. "the laws of [Country/State]". Left unset pending confirmation. */}
            These Terms are governed by the laws of <strong>[jurisdiction to be confirmed]</strong>, without regard to its conflict-of-law provisions, except where superseded by Apple&apos;s mandatory platform terms as described in Section 1.
          </p>
        </div>

        <div className="mt-12 p-6 bg-purple-50 rounded-2xl border border-purple-100 not-prose">
          <h3 className="text-gray-900 font-bold mb-2">Contact</h3>
          <p className="text-sm">
            For support requests, billing issues, or legal inquiries, please contact us <a href={`mailto:${SITE.email}`} className="text-purple-600 hover:underline">via email</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
