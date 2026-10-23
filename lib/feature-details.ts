/** Practical product explanations, based on docs/research.md and the app's existing feature catalogue. */
export interface FeatureDetail {
  answer: string;
  use: string;
  steps: { title: string; body: string }[];
  gives: string[];
  limits: string[];
}
export const FEATURE_DETAILS: Record<string, FeatureDetail> = {
  'counter-customization': {
    answer: 'Give each counter a name, colour and icon that you recognise quickly. A watering can, a car or a familiar photo can make a list easier to scan when you only want to find one thing. The counter still measures the same interval; the appearance helps you find it.',
    use: 'For several plants, use a specific name such as “Kitchen fern watered” rather than five counters called “Water plants.” Keep the action in the name so you know what logging it means.',
    steps: [{ title: 'Name the action', body: 'Use a short name that tells you exactly what happened when you log it.' }, { title: 'Choose a visual cue', body: 'Pick a colour and icon, or use a custom image cover, to distinguish it from nearby counters.' }, { title: 'Keep the list useful', body: 'Start with a few things you regularly forget rather than making a counter for every possible task.' }],
    gives: ['A recognisable counter at a glance.', 'Names and visual cues suited to your own routines.'],
    limits: ['A colour is not a priority or a due date.', 'Changing the appearance does not log the action for you.'],
  },
  'rhythm-analytics': {
    answer: 'Rhythm analytics shows the gaps between your recorded logs. Average intervals and charts help you see how often something has actually happened, whether that is every few days or every few months. The figures describe your history; they do not set a target for your next log.',
    use: 'After recording a few filter changes, look at the gaps between them. An unusually long gap is a reason to check your record and the filter, not proof that a particular replacement schedule is safe.',
    steps: [{ title: 'Build a record', body: 'Log the action when you do it. A useful pattern needs more than one timestamp.' }, { title: 'Look at the gaps', body: 'Read the average alongside the individual entries, especially if some logs were missed.' }, { title: 'Use context', body: 'Treat the chart as a description of your records, and keep external maintenance guidance separate.' }],
    gives: ['Average intervals from your logging history.', 'Charts for looking at changes over time.'],
    limits: ['Missing logs can make an interval look longer than it was.', 'An observed average is not a recommended schedule.'],
  },
  'hidden-counters': {
    answer: 'Hidden counters keep selected records out of the main list and behind biometric access. Use them for things you would prefer not to display while showing someone your phone. They remain part of your encrypted local database, rather than moving into a separate online account.',
    use: 'Keep a personal counter separate from everyday chores. Consider where else you choose to expose its information, including anything you share outside the app.',
    steps: [{ title: 'Choose what stays private', body: 'Select the counter whose name and history you want to keep out of the main view.' }, { title: 'Use the hidden layer', body: 'Enable hiding for that counter and use biometric access when you want to view it.' }, { title: 'Review what you share', body: 'Check any exported files or shared images before sending them to someone else.' }],
    gives: ['A separate, biometric-protected place for personal counters.', 'Encrypted storage on your own device.'],
    limits: ['Hiding a counter does not retract information you already shared.', 'It is not a substitute for securing your phone and Apple account.'],
  },
  'custom-logging': {
    answer: 'Custom fields let a log keep more than its date. Record a number, some text or a photo alongside the moment so you can understand it later. For a maintenance counter, that might be the cost, an odometer reading or a photograph of the receipt.',
    use: 'A car service log can hold the date plus the mileage and work performed. Keep the original service documents too; a personal entry is useful context, not an official service record.',
    steps: [{ title: 'Choose the detail you need', body: 'Add number, text or photo fields to the counter rather than collecting detail you will never read.' }, { title: 'Fill them when logging', body: 'Record the details while they are available, such as the mileage printed on a service receipt.' }, { title: 'Read the context later', body: 'Return to the entry when a timestamp alone is not enough to answer your question.' }],
    gives: ['Numbers, text and photos alongside timestamps.', 'A built-in calculator keyboard for number inputs.'],
    limits: ['Entries are only as accurate as the information you supply.', 'Custom fields do not independently verify a service or measurement.'],
  },
  timeline: {
    answer: 'The timeline brings recorded moments into a date-based view. Use it to look back at logs, counter starts and resets without opening each counter in turn. A calendar helps narrow the view to a day when you remember roughly when something happened.',
    use: 'If you remember doing several chores on a weekend, look at that day to find the relevant entries. A missing entry means the app has no record; it cannot tell you whether the chore was actually skipped.',
    steps: [{ title: 'Log as things happen', body: 'Each recorded moment contributes to the history you can browse later.' }, { title: 'Choose a day', body: 'Use the timeline calendar to focus on a date rather than searching your whole list.' }, { title: 'Read the entry', body: 'Check what kind of entry it is and any details you recorded with it.' }],
    gives: ['A shared date-based view of your recorded moments.', 'A way to revisit entries across counters.'],
    limits: ['The timeline contains recorded activity, not everything you did.', 'It is not a shared household activity feed.'],
  },
  'home-screen-widget': {
    answer: 'Home Screen widgets bring counters closer to where you already use your iPhone. See elapsed time and log without first finding the app. Medium and large widgets can show several counters, so a small set of frequently used records can stay together.',
    use: 'Put plant watering or a household chore on your Home Screen if opening the app is the step you tend to forget. Choose counters you will actually log there rather than filling the widget for its own sake.',
    steps: [{ title: 'Add a TimeSince widget', body: 'Use the iPhone Home Screen widget picker and choose the size you want.' }, { title: 'Choose the counters', body: 'Edit the widget to select which counters it displays.' }, { title: 'Log after doing it', body: 'Use the log control after the action so the timestamp represents what happened.' }],
    gives: ['Elapsed time visible from the Home Screen.', 'A shorter path to logging frequently used counters.'],
    limits: ['A visible widget is not proof that an action happened.', 'Widget refresh timing is managed by iOS.'],
  },
  'siri-shortcuts': {
    answer: 'Siri and Shortcuts give you another way to log a counter or ask how long it has been. Use the built-in TimeSince phrases, create a shorter shortcut name, or connect a shortcut to your Action Button. Pick the route that fits where you do the activity.',
    use: 'After watering a plant, a spoken log can save you from putting everything down to find the counter. Use a specific counter name so the intended action is clear.',
    steps: [{ title: 'Choose a counter', body: 'Use its Siri options to see the phrases available for that counter.' }, { title: 'Try the phrase', body: 'Ask Siri to log it or ask how long it has been. Check that the intended counter was used.' }, { title: 'Make it convenient', body: 'Give a shortcut a memorable name or assign it to a supported Action Button setup.' }],
    gives: ['Spoken logging and elapsed-time queries.', 'Integration with Apple Shortcuts and the Action Button.'],
    limits: ['Siri availability depends on your device settings.', 'An automation records its trigger; it does not verify that you performed the real-world action.'],
  },
  'nfc-tags': {
    answer: 'Pair an NTAG215 NFC tag with a counter, then tap it with your iPhone to log the action. A tag beside the place you do something can make recording it easier to remember. The ordinary log controls remain available; the tag is a shortcut, not a requirement.',
    use: 'A tag by a watering can can prompt a log after watering. Keep the meaning precise: scanning the tag means you are recording the action, not just checking the plant.',
    steps: [{ title: 'Pair the tag', body: 'Use the counter’s NFC pairing option with an NTAG215 tag.' }, { title: 'Place it by the action', body: 'Choose a convenient location where you can tap it after completing the task.' }, { title: 'Check your first log', body: 'Scan once and confirm that the intended counter received the entry.' }],
    gives: ['A physical shortcut to logging a chosen counter.', 'Logging without navigating to the counter first.'],
    limits: ['You need a compatible tag and an NFC-capable iPhone.', 'A scan records a log, not independent evidence of completion.'],
  },
  'quitting-mode': {
    answer: 'Quitting mode measures the time since you last did something you want to step away from. The counter grows while you leave it alone. If you return to the activity, a reset starts a new interval while keeping the completed run in your history.',
    use: 'For a scrolling habit, define what you want the counter to represent before starting. You might track opening a particular app after bedtime; a clear definition makes resets less ambiguous.',
    steps: [{ title: 'Define the activity', body: 'Choose a concrete action you want to stop or step away from.' }, { title: 'Start a quitting counter', body: 'Set its starting point to the last occurrence you can accurately record.' }, { title: 'Reset when needed', body: 'If the action happens again, record it and start the next interval. The previous run remains part of the record.' }],
    gives: ['Elapsed time since the activity last happened.', 'A record of completed runs and resets.'],
    limits: ['It does not block apps or prevent an activity.', 'It is a personal record, not treatment or professional support.'],
  },
  reminders: {
    answer: 'Reminders let a counter ask for your attention at a time you choose. Add up to five reminders per counter, including one-time, repeating or last-log-relative reminders. Supported alarms on iOS 26 or later can ring through silent mode and Focus.',
    use: 'For an irregular chore, a reminder can be a prompt to check whether it needs doing. Keep fixed safety-critical schedules in the appropriate system rather than assuming an interval describes what is safe.',
    steps: [{ title: 'Choose the timing', body: 'Decide whether the reminder should use a set time or relate to the last log.' }, { title: 'Allow notifications', body: 'Check your iPhone notification settings so the reminder can reach you.' }, { title: 'Review the prompt', body: 'When it arrives, decide whether to do the action. Log only after it happens.' }],
    gives: ['Up to five reminders attached to a counter.', 'Alarm support on compatible iOS versions.'],
    limits: ['Delivery depends on device permissions and settings.', 'A reminder is not a guarantee of completion or a safety monitoring service.'],
  },
  'icloud-backup': {
    answer: 'Optional iCloud sync keeps a copy of your TimeSince data in your own private iCloud account. Your database is encrypted on the device, and the developer does not operate a server for your counters. Sync is available on the free tier and stays off until you enable it.',
    use: 'Turn on sync if you want your records available through your own iCloud setup. If you intentionally use the app only on one phone, you can leave it off and keep logging locally.',
    steps: [{ title: 'Choose whether to sync', body: 'Open TimeSince Settings and review the iCloud option.' }, { title: 'Enable it when wanted', body: 'Use your own Apple account and allow the initial sync to complete.' }, { title: 'Understand deletion', body: 'Read the distinction between erasing this device and erasing everywhere before deleting your records.' }],
    gives: ['Optional backup and sync through your private iCloud container.', 'Local logging without a developer-operated account.'],
    limits: ['Sync is not shared household collaboration.', 'Deleting everywhere also clears the iCloud copy; it is not a permanent archive.'],
  },
};
