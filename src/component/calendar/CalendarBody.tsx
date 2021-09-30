import React from 'react';
import { Card } from '@material-ui/core';
import { Typography } from '@material-ui/core';

interface DayProps {
    dayNumber? : number,
    schedules? : string[]
}

const Day: React.FC<DayProps> = ({dayNumber, schedules}: DayProps) => {
    return (
        <Card>
        <Typography variant="h6">{dayNumber}</Typography>
        <Typography variant="body1">{schedules}</Typography>
        </Card>
    );
};

function CalendarBody() {
    return (
        <tr>
            <td><Day dayNumber={1} schedules={[]}></Day></td>
            <td><Day dayNumber={2} schedules={[]}></Day></td>
            <td><Day dayNumber={3} schedules={[]}></Day></td>
            <td><Day dayNumber={4} schedules={[]}></Day></td>
            <td><Day dayNumber={5} schedules={[]}></Day></td>
            <td><Day dayNumber={6} schedules={[]}></Day></td>
            <td><Day dayNumber={7} schedules={[]}></Day></td>
        </tr>
    );
};

export default CalendarBody;