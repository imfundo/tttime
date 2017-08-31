import React from 'react'
import { Link } from 'react-router-dom'


export default function TimelogList({ timelogs }) {
    return (
        <div className="timelogs">
            <h1>Home</h1>
            {timelogs.map(timelog => (
                <p>{timelog.id}</p>
            ))}
            <Link to="/new">Create new log</Link>
        </div>
    )
}