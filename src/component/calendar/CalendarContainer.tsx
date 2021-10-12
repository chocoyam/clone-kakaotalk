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
                <colgroup>
                    <col style={{width:'14%'}}/>
                    <col style={{width:'14%'}}/>
                    <col style={{width:'14%'}}/>
                    <col style={{width:'14%'}}/>
                    <col style={{width:'14%'}}/>
                    <col style={{width:'14%'}}/>
                    <col style={{width:'14%'}}/>
                </colgroup>
                <CalendarHeader />
                <CalendarBody />
            </table>
        </div>
    );
};

export default CalendarContainer;