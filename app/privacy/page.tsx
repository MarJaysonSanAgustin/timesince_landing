import type { Metadata } from 'next';
import { SITE } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${SITE.name} handles your data: on-device storage, optional iCloud backup, and what we never collect.`,
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPolicy() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">Privacy Policy</h1>
        <p className="text-lg text-gray-600">Last updated: {SITE.legalLastUpdated}</p>
      </div>

      <div className="prose prose-purple prose-lg text-gray-600 max-w-none space-y-8">
        <p>
          This policy describes how <strong>{SITE.name}</strong> (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) handles information for the mobile application <strong>{SITE.fullName}</strong>. {SITE.name} is built to work entirely on your device, with no user accounts and no developer-operated servers.
        </p>

        <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100 not-prose">
          <h3 className="text-gray-900 font-bold mb-2">In short</h3>
          <p className="text-sm text-gray-700">
            No accounts. No ads. No behavioral analytics or tracking SDKs in the app. Your events, logs, notes, and photos are encrypted and stored on your device. If you turn on iCloud backup, a copy goes to your own private iCloud, never to a server we run. We do not sell or share your personal data.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">1. What stays on your device</h2>
          <p>
            Events, habits, routines, chores, and log entries (titles, icons, colors, categories, notes, photos, timestamps, and intervals) are stored in a local database on your device. That database is <strong>encrypted with SQLCipher</strong>, and the encryption key is generated on your device and held in the iOS Keychain. We have no server that stores your tracking data, and we cannot access it.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">2. iCloud backup (optional)</h2>
          <p>
            If you turn on iCloud backup, {SITE.name} writes a copy of your data to <strong>your own private iCloud account</strong>: events, categories, logs (including note text and photos), custom field values, reminders, and your profile name and photo. That data lives inside a container only you and your devices can access, and you can see the file yourself in the Files app under &quot;{SITE.name}&quot;.
          </p>
          <p className="mt-2">
            This transfer goes directly to Apple&apos;s iCloud infrastructure under your Apple ID and is governed by <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Apple&apos;s privacy policy</a>. We do not operate this storage and cannot read its contents.
          </p>
          <p className="mt-2">
            iCloud sync is free for everyone and is <strong>off until you turn it on</strong>; nothing enables it for you. Choosing &quot;Erase Everywhere&quot; in Settings removes your iCloud backups along with your on-device data.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">3. Purchases (RevenueCat)</h2>
          <p>
            Pro purchases and subscriptions are processed by Apple and validated using RevenueCat, which manages our entitlement and subscription status. RevenueCat receives an anonymous app-user identifier and transaction/entitlement data, not your name, email, or tracking data. See the <a href="https://www.revenuecat.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">RevenueCat Privacy Policy</a> and <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Apple&apos;s privacy policy</a> for details.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">4. Feedback and support (UserJot)</h2>
          <p>
            If you choose to submit feedback or a feature request through our &quot;Feedback &amp; Support&quot; link, you&apos;ll be taken to a board hosted by UserJot, a third-party service. Anything you post there is handled under UserJot&apos;s own privacy policy, not this one.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">5. Device permissions</h2>
          <p className="mb-4">{SITE.name} asks for the following permissions, each used only for the feature named, and none of it is transmitted anywhere:</p>
          <div className="overflow-x-auto not-prose">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="py-2 pr-4 font-semibold text-gray-900">Permission</th>
                  <th className="py-2 font-semibold text-gray-900">Used for</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 align-top">Camera</td>
                  <td className="py-2 align-top">Taking a photo for an event icon or a log entry.</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 align-top">Photo Library</td>
                  <td className="py-2 align-top">Choosing an existing photo for an event icon or a log entry.</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 align-top">Face ID / Touch ID</td>
                  <td className="py-2 align-top">Unlocking your Hidden events and hidden log entries.</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 align-top">NFC</td>
                  <td className="py-2 align-top">Pairing a physical NFC tag with an event so tapping your phone on it logs that event.</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 align-top">Alarms</td>
                  <td className="py-2 align-top">Delivering a reminder as an alarm that can ring through silent mode and Focus, on supported devices.</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 align-top">Notifications</td>
                  <td className="py-2 align-top">Delivering local reminders you&apos;ve scheduled.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4">
            We do not request location, HealthKit, contacts, microphone, or advertising identifier access, and none of these permissions are used to collect data about you.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">6. Notifications and alarms</h2>
          <p>
            Reminders are scheduled entirely on your device using iOS&apos;s local notification and alarm systems. We do not use push notifications, and no reminder data is ever sent to a server, because there is no server to send it to.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">7. Biometrics</h2>
          <p>
            Face ID and Touch ID are used only to unlock Hidden events and hidden logs within the app. Biometric data is handled entirely by Apple&apos;s Secure Enclave; {SITE.name} never sees or stores it.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">8. Export and import</h2>
          <p>
            You can export your data to a JSON file that remains completely under your control, and import a compatible JSON file back in. This file never passes through our servers; it goes directly between your device and wherever you choose to save it.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">9. Analytics on this website</h2>
          <p>
            This website (not the app) uses Vercel Analytics to understand aggregate traffic, such as which pages are visited. It is cookieless and does not track you individually across sites. It has no connection to your data inside the {SITE.name} app.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">10. Data deletion</h2>
          <p>
            In Settings &rarr; Your data, &quot;Erase on This Device&quot; permanently deletes all local events, categories, and logs from your device. &quot;Erase Everywhere&quot; also deletes any iCloud backup copies. Neither action can be undone.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">11. Children</h2>
          <p>
            The application is suitable for all ages. No email registration or account creation is required for standard use. Premium purchases require an active Apple ID; parental controls apply as per Apple&apos;s family policies.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">12. Your rights</h2>
          <p>
            Because {SITE.name} keeps no server-side account or profile, most data rights are already in your hands: use in-app Export for a full copy of your data (access and portability), and &quot;Erase all data&quot; to delete it (erasure). If you have questions about how this applies to you under GDPR, CCPA, or another privacy law, contact us below.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">13. Changes to this policy</h2>
          <p>
            We may update this policy from time to time to reflect changes to the app or to clarify terms. The current version will always be available directly on <a href="/privacy" className="text-purple-600 hover:underline">this page</a>.
          </p>
        </div>

        <div>
          <h2 className="text-gray-900 font-display text-2xl font-bold mb-2">14. Terms of Use</h2>
          <p>
            Please read our <a href="/terms" className="text-purple-600 hover:underline">Terms of Use</a> to understand your responsibilities and disclaimers.
          </p>
        </div>

        <div className="mt-12 p-6 bg-purple-50 rounded-2xl border border-purple-100 not-prose">
          <h3 className="text-gray-900 font-bold mb-2">Contact</h3>
          <p className="text-sm">
            For privacy-related questions, data export help, or legal inquiries, please contact us <a href={`mailto:${SITE.email}`} className="text-purple-600 hover:underline">via email</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
