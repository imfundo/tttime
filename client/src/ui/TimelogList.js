import React from 'react'


export default function TimelogList({ timelogs }) {
    return (
        <div className="timelogs">
            {timelogs.map(timelog => (
                <div key={timelog.id} className="timelog">
                    <div className="timelog-duration">{timelog.duration}</div>
                    <div className="timelog-row">
                        <div className="timelog-date">{timelog.date}</div>
                        <div className="timelog-description">{timelog.description}</div>
                        <div className="timelog-period">{timelog.startTime} - {timelog.endTime}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}