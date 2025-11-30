// Centralized current event data
// TODO: This will eventually be fetched from Sanity CMS
// For now, update this one file each month instead of updating multiple pages

export interface CurrentEvent {
  month: string;
  date: string;
  time: string;
  book: string;
  author: string;
  theme: string;
  type: string;
  meetingDate: string; // For sentence usage like "September 29th"
  nextMonth?: string; // For transition messaging
}

// UPDATE THIS MONTHLY - Single source of truth
export const currentEvent: CurrentEvent = {
  month: "September",
  date: "September 29th",
  time: "7:00 PM CST",
  book: "Dune",
  author: "Frank Herbert",
  theme: "Free Will and Prophecy",
  type: "Online Meeting",
  meetingDate: "September 29th",
  nextMonth: "October" // Optional: for "join before October" messaging
};

// Helper function for common text patterns
export function getCurrentEventText() {
  return {
    // For homepage and join page
    nextMeetingText: `Join us for our 2026 reading adventure! Our first meeting will be held on January 26th at 7pm CST to discuss The Power and the Glory by Graham Greene.`,

    // For join page specific text
    joinPrompt: `Join the Book Club to get the 2026 Study Guide and participate in monthly online group discussions! Our 2026 theme is "War is Heck"—exploring human conflict, virtue in adversity, and heroic sacrifice through the lens of Catholic faith. Our first meeting will be held on January 26th at 7pm CST to discuss The Power and the Glory by Graham Greene.`,

    // For banner usage
    bannerText: `Now Reading: The Power and the Glory`,

    // For current book references
    currentBook: 'The Power and the Glory',
    currentAuthor: 'Graham Greene',
    currentDate: 'January 26th',
    currentTime: '7pm CST',

    // Monthly schedule text (for various pages)
    scheduleText: `Monthly online meetings will be held on the last Monday of every month throughout 2026 (except November, which is the 3rd Monday to avoid Thanksgiving week). Our first meeting is January 26th at 7pm CST.`,

    // Call to action variations
    joinNowText: `You can join anytime during the year, starting now!`,
    signUpPrompt: `Sign up now to get the 2026 Study Guide and participate in our monthly meetings!`
  };
}

// Function that will eventually connect to CMS
export async function getCurrentEventFromCMS(): Promise<CurrentEvent> {
  // TODO: Replace with actual Sanity CMS fetch
  // This is where you'll query for the next upcoming event
  console.log("📝 TODO: Connect to Sanity CMS for dynamic event data");
  return currentEvent;
}