import { observable, computed, action } from 'mobx';

export default class ScheduleModel {
    @observable
    private subject: string;

    @observable
    private startDate: Date;
    
    @observable
    private endDate: Date;
    
    @observable
    private memo: string;

    public constructor() {
        this.subject = "";
        this.startDate = new Date();
        this.endDate = new Date();
        this.memo = "";
    }

    @computed
    public getSubject(): string {
        return this.subject;
    }

    @computed
    public getStartDate(): Date {
        return this.startDate;
    }

    @computed
    public getEndDate(): Date {
        return this.endDate;
    }

    @computed
    public getMemo(): string {
        return this.memo;
    }
    
    @action
    public setSubject(subject: string) {
        this.subject = subject;
    }

    @action
    public setStartDate(startDate: Date) {
        this.startDate = startDate;
    }

    @action
    public setEndDate(endDate: Date) {
        this.endDate = endDate;
    }

    @action
    public setMemo(memo: string) {
        this.memo = memo;
    }
}