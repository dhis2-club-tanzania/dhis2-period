import { Calendar } from '../calendar/calendar.utility';
import { range } from 'lodash';
import * as moment from 'moment';

export class WeeklyPeriodInstance {
  constructor(private calendar: Calendar) {}
  get(year?: number): any {
    const todayWeek = {
      weekNo: this.calendar.geCurrentWeek(),
      startDate: moment().startOf('isoWeek').format('YYYY-MM-DD'),
      endDate: moment().endOf('isoWeek').format('YYYY-MM-DD'),
    };

    let periods: any[] = [];
    for (let weekNo = todayWeek.weekNo; weekNo > 0; weekNo--) {
      const offset = (todayWeek.weekNo - weekNo) * 7;
      const date: any = moment(
        new Date(
          year ?? this.calendar.getCurrentYear(),
          this.calendar.getCurrentMonth() - 1,
          this.calendar.getCurrentDay()
        )
      );

      const weekDate = date.subtract(offset, 'days');
      const startDate = weekDate.startOf('isoWeek').format('YYYY-MM-DD');
      const endDate = weekDate.endOf('isoWeek').format('YYYY-MM-DD');

      periods = [
        ...periods,
        {
          id: `${weekDate.format('YYYY')}W${weekNo}`,
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

  getWeekDates(weekNumber: number, year: number) {
    const firstDayOfYear = new Date(year, 0, 1 + (weekNumber - 2) * 7);
    // const daysToFirstDayOfWeek =
    //   (weekNumber - 1) * 7 - firstDayOfYear.getDay() + 1;
    const daysToFirstDayOfWeek =
      (weekNumber - 1) * 7 - ((firstDayOfYear.getDay() + 6) % 7) + 1;
    // console.log(firstDayOfYear);
    const startDate = new Date(year, 0, daysToFirstDayOfWeek);

    const endDate = new Date(startDate);

    endDate.setDate(startDate.getDate() + 6);

    return {
      start: startDate,
      end: endDate,
    };
  }
  getDateOfWeek(weekNo: any, year: any) {
    let startdate = new Date(year, 0, 1 + (weekNo - 1 - 1) * 7);
    startdate.setDate(startdate.getDate() + (1 - startdate.getDay()));
    let enddate = new Date(startdate);
    enddate.setDate(enddate.getDate() + 6); // plus more 6 days
    return {
      id: `${year}W${weekNo}`,
      week: weekNo,
      name: `Week ${weekNo} ${this.sanitizeDateString(
        startdate
      )} - ${this.sanitizeDateString(enddate)}`,
      startdate: this.sanitizeDateString(startdate),
      enddate: this.sanitizeDateString(enddate),
    };
  }

  sanitizeDateString(dateString: any) {
    const currentDateValue = new Date(dateString);
    const day = currentDateValue.getDate();
    const month = currentDateValue.getMonth() + 1;
    const formattedDate =
      currentDateValue.getFullYear() +
      '-' +
      ((month < 10 ? '0' : '') + month) +
      '-' +
      ((day < 10 ? '0' : '') + day);
    return formattedDate;
  }
  //   weeksInYear(year: any) {
  //     const d = new Date(year, 11, 31);
  //     const week = this.getWeekNumber(d)[1];
  //     const currentYear = new Date().getFullYear();
  //     const todayWeekNo = this.getWeekNumber(new Date())[1];
  //     const totalWeeks = week == 1 ? 52 : week;
  //     const lastyear = year - 1;
  //     const lastYeard = new Date(lastyear, 11, 31);
  //     let periods = [];
  //     if (currentYear === year) {
  //       for (let week = 1; week <= todayWeekNo; week++) {
  //         const periodItem = this.getDateOfWeek(week, year);
  //         periods.push({
  //           ...periodItem,
  //           id: `${year}W${week - 1}`,
  //           week: week - 1,
  //           name: `Week ${week - 1} ${periodItem.startdate} - ${
  //             periodItem.enddate
  //           }`,
  //         });
  //       }
  //     }

  //     if (currentYear !== year) {
  //       for (let week = 1; week <= totalWeeks + 1; week++) {
  //         const periodItem = this.getDateOfWeek(week, year);
  //         periods.push({
  //           ...periodItem,
  //           id: `${year}W${week - 1}`,
  //           week: week - 1,
  //           name: `Week ${week - 1} ${periodItem.startdate} - ${
  //             periodItem.enddate
  //           }`,
  //         });
  //       }
  //     }

  //     return periods.filter((item) => item.week).sort((a, b) => b.week - a.week);
  //   }
}
