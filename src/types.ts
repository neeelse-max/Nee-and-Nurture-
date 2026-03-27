export interface BookingData {
  type: 'group' | 'private';
  date: Date;
  time?: string;
  dueDate: string;
  partnerName: string;
  birthChoice: string;
  nervousAbout: string;
}

export const MONDAY_CLUB_CAPACITY = 8;

export const MONDAY_DATES = [
  new Date(2026, 3, 6),
  new Date(2026, 3, 13),
  new Date(2026, 3, 20),
  new Date(2026, 3, 27),
  new Date(2026, 4, 4),
  new Date(2026, 4, 11),
  new Date(2026, 4, 18),
  new Date(2026, 4, 25),
];

export const PRIVATE_SLOTS = [
  "10:00 - 12:00",
  "13:00 - 15:00",
  "16:00 - 18:00",
  "19:00 - 21:00"
];
