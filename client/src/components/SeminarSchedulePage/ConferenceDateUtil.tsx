import dayjs from "dayjs";
import { Seminar } from "../../models/Seminar";
import { DateFormatUtil } from "../Common/DateFormatUtil";
import { AddAlert } from "@mui/icons-material";

export abstract class ConferenceDateUtil {
  private static getSeminarsByDay(data: Seminar[]) {
    const dates = new Set(
      data.map((seminar: Seminar) =>
        DateFormatUtil.extractDate(seminar.startDateTime)
      )
    );
    const sortedByDate = Array.from(dates)
      .sort()
      .map((it, i) => {
        return {
          date: it,
          day: i + 1,
          seminarsOfDay: data.filter(
            (seminar: Seminar) =>
              DateFormatUtil.extractDate(seminar.startDateTime) === it
          ),
        };
      });
    return sortedByDate;
  }

  public static filterSeminarsByDay(data: Seminar[], dayOfSeminar: number) {
    return this.getSeminarsByDay(data)
      .filter((it) => {
        return it.day === dayOfSeminar;
      })
      .flatMap((it) => it.seminarsOfDay);
  }

  public static mapToDay(data: Seminar[]) {
    return ConferenceDateUtil.getSeminarsByDay(data).map((it) => {
      return { day: it.day };
    });
  }

  public static calculateDuration(start: string, end:string) {
    
        const s = new Date(start);
    const e = new Date(end);


    const diffMs = (e.getTime() - s.getTime());

    let diffMins = Math.round((diffMs / 1000) / 60); 
    //console.log(diffMins);
    return !isNaN(diffMins) ? diffMins : 0;

  } 

  public static calculateEndDateTime(start: string, duration:number) {
    const aa = dayjs(start).add(duration, 'minutes').toDate()
    const s = new Date(start).getHours()+duration;
    const x = new Date(start)
    x.setHours(s);
  // console.log(x.toString());

return  dayjs(aa).format('YYYY-MM-DDTHH:mm:ss') ;
} 
}
