import { Calendar } from '../calendar/calendar.utility';
import { range } from 'lodash';
import * as moment from 'moment';
import { getWeek } from 'date-fns';

export class WeeklyPeriodInstance {
  constructor(private calendar: Calendar) {}
  get(year?: number): any {
    let periods: any[] = [];
    const startingWeek = this.getStartingWeek(year);
    for (let weekNo = startingWeek; weekNo > 0; weekNo--) {
      const offset = (startingWeek - weekNo) * 7;
      const date: any = this.getDate(year);

      const weekDate = date.subtract(offset, 'days');
      const startDate = weekDate.startOf('isoWeek').format('YYYY-MM-DD');
      const endDate = weekDate.endOf('isoWeek').format('YYYY-MM-DD');

      periods = [
        ...periods,
        {
          id: `${year ?? weekDate.format('YYYY')}W${weekNo}`,
          week: weekNo,
          startDate,
          endDate,
          name: `Week ${weekNo} - ${startDate} - ${endDate}`,
        },
      ];
    }

    console.log(JSON.stringify(periods));

    return periods;
  }

  getDate(year?: number) {
    const date = moment(
      new Date(
        year ?? this.calendar.getCurrentYear(),
        this.calendar.getCurrentMonth() - 1,
        this.calendar.getCurrentDay()
      )
    );
    if (year) {
      if (year === this.calendar.getCurrentYear()) {
        return date;
      }

      return moment(new Date(year, 11, 31));
    }
    return date;
  }

  getStartingWeek(year?: number) {
    if (year) {
      if (year === this.calendar.getCurrentYear()) {
        return this.calendar.geCurrentWeek();
      }

      return 52;
    }

    return this.calendar.geCurrentWeek();
  }
}
