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
        const curDay = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        const days = lastDay.getDate() - firstDay.getDate() + 1;
    
        for (let i = 0; i < firstDay.getDay(); i++) {
            this.makeDayModel(new Date(curDay.setDate(curDay.getDate() - curDay.getDay() + i)));
        }
        for (let i = 0; i < days; i++) {
            this.makeDayModel(new Date(curDay.setDate(curDay.getDate() - curDay.getDay() + i)));
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