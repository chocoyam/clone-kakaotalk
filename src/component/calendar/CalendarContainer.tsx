import React from 'react';

import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';

const headerStyle = {
    width: '100%'
}

function CalendarContainer() {
    return (
        <div>
            <table style={headerStyle}>
                <CalendarHeader />
                <CalendarBody />
                <CalendarBody />
                <CalendarBody />
                <CalendarBody />
            </table>
        </div>
    );
};

export default CalendarContainer;