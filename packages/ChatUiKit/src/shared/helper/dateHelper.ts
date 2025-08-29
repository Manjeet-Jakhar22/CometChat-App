import { ValueOf } from "./types";

// TODO: Fix the logics - as currently it is inefficient and non-readable

export class DateHelper {
  /**
   * Pattern for Date.
   * one of
   * 1. timeFormat: "hh:mm a".
   * 2. dayDateFormat: Today, Yesterday, weekday or "d MMM, yyyy".
   * 3. dayWeekDayDateTimeFormat: Today(time), weekday, Yesterday, or "dd/mm/yyyy".
   */

  public static patterns = {
    timeFormat: "timeFormat",
    dayDateFormat: "dayDateFormat",
    dayWeekDayDateFormat: "dayWeekDayDateFormat",
    dayWeekDayDateTimeFormat: "dayWeekDayDateTimeFormat",
    dayDateTimeFormat: "dayDateTimeFormat",
    callBubble: "d MMM, hh:mm aa",
    callLogs: "d MMMM, h:m aa",
  } as const;

  private static monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ] as const;

  private static weekNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ] as const;

  getWeekOfDay(date: Date) {
    let weekDay = date.getDay();
    let week = DateHelper.weekNames[weekDay];
    return week.substring(0, 3);
  }

  getMonthOfDay(date: Date, full = false) {
    let month = date.getMonth();
    let mnth = DateHelper.monthNames[month];
    if (full) return mnth;
    return mnth.substring(0, 3);
  }

  getDateFormat(date: Date, pattern: ValueOf<typeof DateHelper.patterns>) {
    if (pattern === DateHelper.patterns.dayDateFormat) {
      return date.getDate() + " " + this.getMonthOfDay(date) + ", " + date.getFullYear();
    }
    let dt: any = date.getDate();
    if (dt < 10) {
      dt = "0" + dt;
    }
    return dt + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  }

  getTimeFormat(date: Date) {
    let timeString = date.getHours();
    let postString = timeString >= 12 ? "PM" : "AM";
    if (timeString > 12) {
      timeString = timeString - 12;
    }
    let minutes: any = date.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;
    return timeString + ":" + minutes + " " + postString;
  }

  getDate(date: Date, pattern: ValueOf<typeof DateHelper.patterns>) {
    const today = new Date();
    if (today.getMonth() === date.getMonth() && today.getFullYear() === date.getFullYear()) {
      let diff = today.getDate() - date.getDate();
      if (diff === 0) {
        if (pattern === DateHelper.patterns.dayWeekDayDateTimeFormat) {
          return this.getTimeFormat(date);
        }
        return "Today";
      } else if (diff === 1) {
        return "Yesterday";
      } else if (diff < 7 && ([DateHelper.patterns.dayWeekDayDateTimeFormat,DateHelper.patterns.dayWeekDayDateFormat] as ValueOf<typeof DateHelper.patterns>[]).includes(pattern)) {
        return this.getWeekOfDay(date);
      } else {
        return this.getDateFormat(date, pattern);
      }
    } else {
      return this.getDateFormat(date, pattern);
    }
  }

  getFormattedDate(timestamp: number, pattern: ValueOf<typeof DateHelper.patterns>) {
    const date = new Date(timestamp);
    if (pattern && pattern != null) {
      let formattedDate = "";
      switch (pattern) {
        case DateHelper.patterns.timeFormat:
          formattedDate = this.getTimeFormat(date);
          break;
        case DateHelper.patterns.dayDateFormat:
        case DateHelper.patterns.dayWeekDayDateFormat:
        case DateHelper.patterns.dayWeekDayDateTimeFormat:
        case DateHelper.patterns.dayWeekDayDateTimeFormat:
          formattedDate = this.getDate(date, pattern);
          break;
        case DateHelper.patterns.callBubble:
          formattedDate = `${date.getDate()} ${this.getMonthOfDay(date)}, ${this.getTimeFormat(
            date
          )}`;
        case DateHelper.patterns.callLogs:
          formattedDate = `${date.getDate()} ${this.getMonthOfDay(
            date,
            true
          )}, ${this.getTimeFormat(date).toLowerCase()}`;
          break;
        default:
          break;
      }
      return formattedDate;
    }
    return null;
  }
}

export const dateHelperInstance = new DateHelper();
