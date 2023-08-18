import * as dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export abstract class DateFormatUtil {
  public static extractTime(date: string) {
    return dayjs(date).format("HH:mm");
  }

  public static extractDate(date: string) {
    return dayjs(date).format("YYYY-MM-DD");
  }

  public static getCurrentDate() {
    return dayjs().format("YYYY-MM-DD");
  }
}
