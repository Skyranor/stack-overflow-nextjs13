import { ThemeValue } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDefaultTheme = (): Exclude<ThemeValue, "system"> => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const getTimestamp = (createdAt: Date) => {
  const now = new Date();
  const timeDiff = now.getTime() - createdAt.getTime();

  // Define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  const getTimeDiffString = (
    timeDiff: number,
    interval: number,
    unit: string,
  ) => {
    const time = Math.floor(timeDiff / interval);
    return `${time} ${unit}${time === 1 ? "" : "s"} ago`;
  };

  // Calculate time difference
  if (timeDiff < minute) {
    return getTimeDiffString(timeDiff, 1000, "second");
  } else if (timeDiff < hour) {
    return getTimeDiffString(timeDiff, minute, "minute");
  } else if (timeDiff < day) {
    return getTimeDiffString(timeDiff, hour, "hour");
  } else if (timeDiff < week) {
    return getTimeDiffString(timeDiff, day, "day");
  } else if (timeDiff < month) {
    return getTimeDiffString(timeDiff, week, "week");
  } else if (timeDiff < year) {
    return getTimeDiffString(timeDiff, month, "month");
  } else {
    return getTimeDiffString(timeDiff, year, "year");
  }
};

export const formatAndDivideNumber = (number: number) => {
  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1)}M`;
  } else if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}K`;
  } else {
    return number.toString();
  }
};

export const getJoinedDate = (date: Date) => {
  const month = date.toLocaleDateString("default", { month: "long" });
  const year = date.getFullYear();

  const joinedDate = `${month} ${year}`;

  return joinedDate;
};
