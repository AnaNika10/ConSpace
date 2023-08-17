import { Seminar } from "../../models/Seminar";
import { DateFormatUtil } from "../Common/DateFormatUtil";

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
}
