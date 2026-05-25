export default function PrivacyPolicy() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">Privacy Policy</h1>
        <p className="text-lg text-gray-600">Last updated: May 25, 2026</p>
      </div>

      <div className="prose prose-purple prose-lg text-gray-600 max-w-none space-y-8">
        <p>
          This policy describes how <strong>TimeSince</strong> (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) handles information for the mobile application <strong>TimeSince: Habit &amp; Chore Tracker</strong>. The app runs on your device with minimal data handling.
        </p>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">1. Data collection</h2>
          <p>
            Events, habits, routines, chores, and log entries (titles, icons, colors, rhythm, intervals, timestamps, notes) are stored strictly and exclusively on your physical device. We do not collect, transmit, or sell your personal data. We have no servers that store your tracking data.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">2. Purchases (RevenueCat)</h2>
          <p>
            Pro purchases and subscriptions are processed securely via Apple and validated using RevenueCat. RevenueCat may receive anonymized transaction metrics for entitlement validation and subscription status management. For complete details, see the <a href="https://www.revenuecat.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">RevenueCat Privacy Policy</a>.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">3. Export and import</h2>
          <p>
            Export produces an unencrypted or encrypted JSON data backup file that remains completely under your personal control. Import reads a compatible JSON file that you manually select on your mobile device. No data is ever sent to or processed by our servers.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">4. No ads, no tracking</h2>
          <p>
            We do not show advertisements. We do not use third-party behavioral analytics, user tracking, or crash-reporting telemetry inside the application. Your behavioral metrics are not tracked by default.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">5. Data deletion</h2>
          <p>
            Using the &quot;Erase all data&quot; command in the app Settings permanently deletes all local habits, chores, and logs from your device.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">6. Children</h2>
          <p>
            The application is suitable for all ages. No email registration or account creation is required for standard local use. Premium purchases require an active Apple ID; parental controls apply as per Apple&#x27;s family policies.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">7. Changes to this policy</h2>
          <p>
            We may update this policy from time to time to clarify terms. The current version will always be available directly on <a href="/privacy" className="text-purple-600 hover:underline">this page</a>.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">8. Terms of Use</h2>
          <p>
            Please read our Terms of Use to understand your responsibilities and disclaimers at <a href="/terms" className="text-purple-600 hover:underline">https://timesinceapp.com/terms</a>.
          </p>
        </div>

        <div className="mt-12 p-6 bg-purple-50 rounded-2xl border border-purple-100">
          <h3 className="text-gray-900 font-bold mb-2">Contact</h3>
          <p className="text-sm">
            For privacy-related questions, data export help, or legal inquiries, please contact us <a href="mailto:mjsanagustin.dev@gmail.com" className="text-purple-600 hover:underline">via email</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
