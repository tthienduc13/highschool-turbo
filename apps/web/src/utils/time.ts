import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(relativeTime);

const units = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
};

export const rtf = new Intl.RelativeTimeFormat("vi", { numeric: "auto" });

// https://stackoverflow.com/a/53800501/9768266
export const getRelativeTime = (d1: Date, d2 = new Date()) => {
  const elapsed = d1.getTime() - d2.getTime();

  // "Math.abs" accounts for both "past" & "future" scenarios
  for (const u in units)
    if (Math.abs(elapsed) > units[u as keyof typeof units] || u == "giây")
      return rtf
        .format(
          Math.round(elapsed / units[u as keyof typeof units]),
          u as Parameters<typeof rtf.format>[1],
        )
        .replace(/now/g, "vừa xong")
        .replace(/^\d giây trước$/, "vừa xong")
        .replace(/^in.*$/, "vừa xong");
};

export const relevantLabel = (date: Date) => {
  const now = dayjs();
  const inputDate = dayjs(date);

  if (inputDate.isSame(now, "year")) {
    if (inputDate.isSame(now, "month")) {
      if (inputDate.isSame(now, "day")) {
        return "Hôm nay";
      } else if (inputDate.isSame(now.subtract(1, "day"), "day")) {
        return "Hôm qua";
      } else if (
        inputDate.isSameOrAfter(now.startOf("week")) &&
        inputDate.isBefore(now.endOf("week"))
      ) {
        return inputDate.isBefore(now) ? "Tuần này" : "Trong tuần này";
      } else if (
        inputDate.isSameOrAfter(now.subtract(1, "week").startOf("week")) &&
        inputDate.isBefore(now.startOf("week"))
      ) {
        return "Tuần trước";
      } else if (
        inputDate.isSameOrAfter(now.startOf("month")) &&
        inputDate.isBefore(now.endOf("month"))
      ) {
        return inputDate.isBefore(now) ? "Tháng này" : "Trong tháng này";
      }
    } else {
      return date.toLocaleDateString("vi-VN", {
        month: "long",
      });
    }
  }

  return date.toLocaleDateString("vi-VN", {
    month: "long",
    year: "numeric",
  });
};

export const dtFormatter = new Intl.DateTimeFormat("vi-VN", {
  dateStyle: "medium",
  timeStyle: "short",
});

export const briefFormatter = new Intl.DateTimeFormat("vi-VN", {
  month: "short",
  day: "numeric",
});

export const formatElapsedTime = (ms: number) => {
  const value = new Date(ms).toISOString().substring(11, 19);
  if (value.startsWith("00:")) {
    return value.substring(3);
  }
};

export const formatDeciseconds = (deciseconds: number) => {
  const seconds = Math.floor(deciseconds / 10);
  const deci = deciseconds % 10;

  return `${seconds}.${deci}`;
};

export const formatDueDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const today = new Date();
  const dateDifference = Math.floor(
    (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  const isToday =
    new Date(date).setHours(0, 0, 0, 0) == new Date(today).setHours(0, 0, 0, 0);

  if (dateDifference < 0 && !isToday) {
    options.month = "short";
    options.day = "numeric";
    options.weekday = undefined;
  } else if (dateDifference >= 7) {
    options.weekday = undefined;
    options.month = "short";
    options.day = "numeric";
  }

  if (date.getFullYear() !== today.getFullYear()) {
    options.year = "numeric";
  }

  return new Intl.DateTimeFormat("vi-VN", options)
    .formatToParts(date)
    .map((part) => {
      switch (part.type) {
        case "weekday":
          return `${isToday ? "Hôm nay" : part.value} lúc`;
        case "literal":
          return part.value.replace(", ", "");
        case "year":
          return `, ${part.value}`;
        default:
          return part.value;
      }
    })
    .join("");
};
