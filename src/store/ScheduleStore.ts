import { observable, action, computed } from 'mobx';

interface DayModel {
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
    private dayModels: DayModel[];

    constructor() {
        this.dayModels = [];
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