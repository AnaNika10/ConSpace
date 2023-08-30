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

  public static getCurrentDateTimeOffset() {
    return dayjs();
  }

  public static getUpdatedTime(time: string) {
    let hh = Number(time.split(':')[0])
    let mm = Number(time.split(':')[1])
    return dayjs(this.getCurrentDate()).set('hour', hh).set('minute', mm).set('second', 0)
  }
}
