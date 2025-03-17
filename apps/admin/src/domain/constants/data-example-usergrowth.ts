"use client";

// Example API data structures for different time ranges

// 1. Year view (monthly data)
export const yearData = [
  { month: "2023-01", students: 820, teachers: 52, moderators: 12 },
  { month: "2023-02", students: 932, teachers: 58, moderators: 14 },
  { month: "2023-03", students: 901, teachers: 63, moderators: 15 },
  { month: "2023-04", students: 934, teachers: 60, moderators: 13 },
  { month: "2023-05", students: 1290, teachers: 71, moderators: 16 },
  { month: "2023-06", students: 1330, teachers: 75, moderators: 18 },
  { month: "2023-07", students: 1320, teachers: 74, moderators: 17 },
  { month: "2023-08", students: 1400, teachers: 78, moderators: 19 },
  { month: "2023-09", students: 1450, teachers: 82, moderators: 21 },
  { month: "2023-10", students: 1370, teachers: 79, moderators: 20 },
  { month: "2023-11", students: 1390, teachers: 81, moderators: 22 },
  { month: "2023-12", students: 1250, teachers: 76, moderators: 18 },
];

// 2. Month view (daily data)
export const monthData = [
  { month: "2023-12-01", students: 42, teachers: 3, moderators: 1 },
  { month: "2023-12-02", students: 38, teachers: 2, moderators: 0 },
  { month: "2023-12-03", students: 35, teachers: 2, moderators: 1 },
  { month: "2023-12-04", students: 51, teachers: 4, moderators: 1 },
  { month: "2023-12-05", students: 53, teachers: 3, moderators: 1 },
  // ... more days
  { month: "2023-12-30", students: 39, teachers: 2, moderators: 1 },
  { month: "2023-12-31", students: 37, teachers: 2, moderators: 0 },
];

// 3. Week view (daily data)
export const weekData = [
  { month: "2023-12-25", students: 51, teachers: 4, moderators: 1 }, // Monday
  { month: "2023-12-26", students: 53, teachers: 3, moderators: 1 }, // Tuesday
  { month: "2023-12-27", students: 57, teachers: 5, moderators: 2 }, // Wednesday
  { month: "2023-12-28", students: 48, teachers: 3, moderators: 1 }, // Thursday
  { month: "2023-12-29", students: 45, teachers: 3, moderators: 1 }, // Friday
  { month: "2023-12-30", students: 39, teachers: 2, moderators: 1 }, // Saturday
  { month: "2023-12-31", students: 37, teachers: 2, moderators: 0 }, // Sunday
];

// 4. Custom - Hours (hourly data)
export const hoursData = [
  { month: "00:00", students: 12, teachers: 1, moderators: 0 },
  { month: "01:00", students: 8, teachers: 0, moderators: 0 },
  { month: "02:00", students: 5, teachers: 0, moderators: 0 },
  { month: "03:00", students: 3, teachers: 0, moderators: 0 },
  { month: "04:00", students: 2, teachers: 0, moderators: 0 },
  { month: "05:00", students: 4, teachers: 0, moderators: 0 },
  { month: "06:00", students: 10, teachers: 1, moderators: 0 },
  { month: "07:00", students: 18, teachers: 2, moderators: 0 },
  { month: "08:00", students: 25, teachers: 3, moderators: 1 },
  { month: "09:00", students: 32, teachers: 4, moderators: 1 },
  { month: "10:00", students: 38, teachers: 5, moderators: 1 },
  { month: "11:00", students: 42, teachers: 4, moderators: 1 },
  { month: "12:00", students: 45, teachers: 5, moderators: 2 },
  { month: "13:00", students: 48, teachers: 6, moderators: 2 },
  { month: "14:00", students: 52, teachers: 5, moderators: 2 },
  { month: "15:00", students: 55, teachers: 6, moderators: 2 },
  { month: "16:00", students: 58, teachers: 5, moderators: 1 },
  { month: "17:00", students: 52, teachers: 4, moderators: 1 },
  { month: "18:00", students: 48, teachers: 3, moderators: 1 },
  { month: "19:00", students: 42, teachers: 3, moderators: 1 },
  { month: "20:00", students: 38, teachers: 2, moderators: 1 },
  { month: "21:00", students: 32, teachers: 2, moderators: 0 },
  { month: "22:00", students: 25, teachers: 1, moderators: 0 },
  { month: "23:00", students: 18, teachers: 1, moderators: 0 },
];

// 5. Custom - Days (daily data for past N days)
export const daysData = [
  { month: "2023-12-25", students: 51, teachers: 4, moderators: 1 },
  { month: "2023-12-26", students: 53, teachers: 3, moderators: 1 },
  { month: "2023-12-27", students: 57, teachers: 5, moderators: 2 },
  { month: "2023-12-28", students: 48, teachers: 3, moderators: 1 },
  { month: "2023-12-29", students: 45, teachers: 3, moderators: 1 },
  { month: "2023-12-30", students: 39, teachers: 2, moderators: 1 },
  { month: "2023-12-31", students: 37, teachers: 2, moderators: 0 },
];

// 6. Custom - Months (monthly data for past N months)
export const monthsData = [
  { month: "2023-07", students: 1320, teachers: 74, moderators: 17 },
  { month: "2023-08", students: 1400, teachers: 78, moderators: 19 },
  { month: "2023-09", students: 1450, teachers: 82, moderators: 21 },
  { month: "2023-10", students: 1370, teachers: 79, moderators: 20 },
  { month: "2023-11", students: 1390, teachers: 81, moderators: 22 },
  { month: "2023-12", students: 1250, teachers: 76, moderators: 18 },
];

// 7. Custom - Years (yearly data)
export const yearsData = [
  { month: 2019, students: 8500, teachers: 420, moderators: 85 },
  { month: 2020, students: 9800, teachers: 510, moderators: 95 },
  { month: 2021, students: 11200, teachers: 620, moderators: 110 },
  { month: 2022, students: 13500, teachers: 720, moderators: 130 },
  { month: 2023, students: 15800, teachers: 845, moderators: 150 },
];
