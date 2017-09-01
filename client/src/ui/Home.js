import React from 'react'

import TimelogList from './TimelogList'
import Loader from './Loader'
import { Link } from 'react-router-dom'


export default function Home({ timelogs, fetchingTimelogs }) {
    return (
        <div className="home">
            <h1>Timelog</h1>
            <Loader isLoaded={!fetchingTimelogs}>
                <TimelogList timelogs={timelogs} />
            </Loader>
            <Link to="/new" className="create-btn">
                <svg viewBox="0 0 10 10">
                    <rect x="2" y="4.2" width="6" height="1.6" fill="white"/>
                    <rect x="4.2" y="2" width="1.6" height="6" fill="white"/>
                </svg>
            </Link>
        </div>
    )
}