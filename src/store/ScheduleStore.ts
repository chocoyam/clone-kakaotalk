import { observable, action, computed } from 'mobx';

export interface DayModel {
    date: Date;
    schedules: ScheduleModel[];
}

interface ScheduleModel {
    subject: string;
    startDate: Date;
    endDate: Date;
    memo: string;
    get getSubject(): string;
    get getStartDate(): Date;
    get getEndDate(): Date;
    get getMemo(): string;
}

class ScheduleStore {
    public dayModels: DayModel[];

    constructor() {
        this.dayModels = [];

        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        const lastMonthDays = firstDay.getDay();
        const curMonthDays = lastDay.getDate() - firstDay.getDate();
        const nextMonthDays = 6 - lastDay.getDay();
        const days = lastMonthDays + curMonthDays + nextMonthDays;

        const curDay = new Date(today.getFullYear(), today.getMonth(), 1);  // 날짜 계산을 위한 Date 객체
        this.makeDayModel(new Date(curDay.setDate(curDay.getDate() - curDay.getDay())));

        for (let i = 0; i < days; i++) {
            this.makeDayModel(new Date(curDay.setDate(curDay.getDate() + 1)));
        }
    }

    public makeDayModel(date: Date) {
        const schedules: ScheduleModel[] = [];
        const newDay: DayModel = {date, schedules};
        this.dayModels.push(newDay);
    }

    public makeSchedule(dayID: number, subject: string, startDate: Date, endDate: Date, memo: string) {
        const newSchedule: ScheduleModel = observable(
            {
                subject, startDate, endDate, memo,
                get getSubject() {
                    return this.subject;
                },
                get getStartDate() {
                    return this.startDate;
                },
                get getEndDate() {
                    return this.endDate;
                },
                get getMemo() {
                    return this.memo;
                }
            }
        );
        this.dayModels[dayID].schedules.push(newSchedule);
    }
}

export default ScheduleStore;