import { Calendar } from '../calendar/calendar.utility';
import { range } from 'lodash';

export class WeeklyPeriodInstance {
  constructor(private calendar: Calendar) {}
  get(year?: number): any {
    const todayWeekNo = this.calendar.geCurrentWeek();
    const currentYear = year ?? this.calendar.getCurrentYear();

    return range(1, todayWeekNo + 1).map((weekNo) => {
      const periodItem = this.getWeekDates(weekNo, currentYear);
      console.log(periodItem);
      let startdate = new Date(currentYear, 0, 1 + (weekNo - 1 - 1) * 7);
      let enddate = new Date(startdate);
      enddate.setDate(enddate.getDate() + 6);
      return {
        id: `${currentYear}W${weekNo}`,
        week: weekNo,
        startdate: this.sanitizeDateString(startdate),
        enddate: this.sanitizeDateString(enddate),
        name: `Week ${weekNo} ${this.sanitizeDateString(
          startdate
        )} - ${this.sanitizeDateString(enddate)}`,
      };
    });
  }

  getWeekDates(weekNumber: number, year: number) {
    const firstDayOfYear = new Date(year, 0, 1);
    const daysToFirstDayOfWeek =
      (weekNumber - 1) * 7 - firstDayOfYear.getDay() + 1;
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
