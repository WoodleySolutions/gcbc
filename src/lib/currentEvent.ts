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
    nextMeetingText: `The next online meeting to discuss ${currentEvent.book} will be held on ${currentEvent.date} at ${currentEvent.time}.`,

    // For join page specific text
    joinPrompt: `Join the Book Club to get the 2025 Study Guide to participate in monthly online group discussions, get info about quarterly in-person movie night meet ups, and updates on our blog and video content! The next online meeting to discuss ${currentEvent.book} will be held on ${currentEvent.date} at ${currentEvent.time}.`,

    // For banner usage
    bannerText: `Discussing "${currentEvent.book}" by ${currentEvent.author}`,

    // For current book references
    currentBook: currentEvent.book,
    currentAuthor: currentEvent.author,
    currentDate: currentEvent.date,
    currentTime: currentEvent.time,

    // Monthly schedule text (for various pages)
    scheduleText: `Monthly online meetings will be held on the last Monday of every month from January to October 2025, and on the third Monday of November 2025.`,

    // Call to action variations
    joinNowText: `You can join anytime during the year, starting now!`,
    signUpPrompt: `Sign up now to get the 2025 Study Guide and participate in our monthly meetings!`
  };
}

// Function that will eventually connect to CMS
export async function getCurrentEventFromCMS(): Promise<CurrentEvent> {
  // TODO: Replace with actual Sanity CMS fetch
  // This is where you'll query for the next upcoming event
  console.log("📝 TODO: Connect to Sanity CMS for dynamic event data");
  return currentEvent;
}