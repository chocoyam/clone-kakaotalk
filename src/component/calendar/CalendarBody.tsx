import React from 'react';
import { Card } from '@material-ui/core';
import { Typography } from '@material-ui/core';

import useStore from '../../store/UseStore';
import { DayModel } from '../../store/ScheduleStore';

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

function getWeek(arr: DayModel[]) {
    return (
        <tr>
            {
                arr.map((day, i) => {
                    return <td><Day dayNumber={day.date.getDate()} schedules={[]}></Day></td>;
                })
            }
        </tr>
    );
}

function CalendarBody() {
    const { scheduleStore } = useStore();
    const dayModel = scheduleStore.dayModels;

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