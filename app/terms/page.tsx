export default function TermsAndConditions() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">Terms &amp; Conditions</h1>
        <p className="text-lg text-gray-600">Last updated: May 25, 2026</p>
      </div>

      <div className="prose prose-purple prose-lg text-gray-600 max-w-none space-y-8">
        <p>
          Welcome to TimeSince. These Terms of Use apply to the mobile application <strong>TimeSince: Habit &amp; Chore Tracker</strong> provided by <strong>TimeSince</strong> (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;). By downloading, installing, or using the app, you agree to be bound by these terms.
        </p>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">1. License and Apple Terms</h2>
          <p>
            Your license to use the application is also subject to Apple&#x27;s Standard End User License Agreement (EULA): <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">https://www.apple.com/legal/internet-services/itunes/dev/stdeula/</a>.
          </p>
          <p className="mt-2">
            In the event of a conflict between these Terms and Apple&#x27;s mandatory platform guidelines, Apple&#x27;s terms shall apply.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">2. What the app does</h2>
          <p>
            TimeSince is a personal utility designed to help you track habits, chores, intervals, and routines on your device without the anxiety of punitive streaks. Standard features can include on-device database tracking, local reminders, custom schedules, shortcuts, dashboard analytics, data export options, and optional paid upgrades (TimeSince Pro).
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">3. Subscriptions and purchases</h2>
          <p>
            TimeSince offers free baseline tracking and optional paid premium upgrades (TimeSince Pro), including auto-renewable subscriptions and a lifetime purchase tier.
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
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">4. Data, privacy, and backups</h2>
          <p>
            TimeSince operates on a strict absolute local storage model. Your events and log entries stay exclusively and strictly on your physical device.
          </p>
          <p className="mt-2">
            Please review our complete Privacy Policy to understand our data guarantees at <a href="/privacy" className="text-purple-600 hover:underline">https://timesinceapp.com/privacy</a>.
          </p>
          <p className="mt-2">
            Since your database does not sync to external servers, you are solely responsible for creating and maintaining your own secure backup copies using the in-app manual export options.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">5. Availability and changes</h2>
          <p>
            We may update application features, pricing models, Pro benefits, and these terms from time to time. Your continued use of the application following the posting of any updates constitutes your basic acceptance of the modified Terms.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">6. Disclaimers</h2>
          <p>
            The application is provided strictly on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis to the maximum extent permitted by applicable law. We do not warrant that operation will be completely uninterrupted, error-free, or compatible with all operating system updates.
          </p>
          <p className="mt-2">
            <strong>Medical Disclaimer:</strong> TimeSince is not a medical device, nor does it provide clinical health advice. While you may use it to track wellness intervals (e.g. medication reminders or physical therapy routines), you should never rely solely on the application for critical medical logs. Always consult a qualified healthcare professional.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">7. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, in no event shall TimeSince, its developers, or affiliates be liable for indirect, incidental, special, consequential, or punitive damages (including but not limited to loss of data, personal logs, or device damage) arising from your use of the application.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">8. Termination</h2>
          <p>
            You can stop using the application and delete it at any time. We reserve the right to suspend or restrict access to premium subscription validation features if required for security reasons, compliance audits, or fraud prevention.
          </p>
        </div>

        <div className="mt-12 p-6 bg-purple-50 rounded-2xl border border-purple-100">
          <h3 className="text-gray-900 font-bold mb-2">Contact</h3>
          <p className="text-sm">
            For support requests, billing issues, or legal inquiries, please contact us <a href="mailto:mjsanagustin.dev@gmail.com" className="text-purple-600 hover:underline">via email</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
