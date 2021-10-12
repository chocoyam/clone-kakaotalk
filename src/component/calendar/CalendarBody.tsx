import React from 'react';
import { Card } from '@material-ui/core';
import { Typography } from '@material-ui/core';

interface DayProps {
    dayNumber : number,
    schedules? : string[]
}

const Day: React.FC<DayProps> = ({dayNumber, schedules}: DayProps) => {
    if (dayNumber == undefined) {
        return (
            <Card>
            <Typography variant="h6"></Typography>
            <Typography variant="body1"></Typography>
            </Card>
        );
    } else {
        return (
            <Card>
            <Typography variant="h6">{dayNumber}</Typography>
            <Typography variant="body1">{schedules}</Typography>
            </Card>
        );
    }
};

function getWeek(arr: Date[]) {
    return (
        <tr>
            {
                arr.map((day, i) => {
                    return <td><Day dayNumber={day.getDate()} schedules={[]}></Day></td>;
                })
            }
        </tr>
    );
}

function CalendarBody() {
    const today = new Date();
    const year = today.getFullYear()
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const curDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const days = lastDay.getDate() - firstDay.getDate() + 1;
    const dayModel: Date[] = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
        dayModel.push(new Date(curDay.setDate(curDay.getDate() - curDay.getDay() + i)));
    }
    for (let i = 0; i < days; i++) {
        dayModel.push(new Date(curDay.setDate(curDay.getDate() + 1)));
    }

    return (
        <tbody>
            {
                dayModel.map((item, i) => {
                    if (i % 7 == 0) {
                        return getWeek(dayModel.slice(i, i + 7));
                    }
                })
            }
        </tbody>
    );
};

export default CalendarBody;