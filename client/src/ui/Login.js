import React from 'react'


export default function Login({ onSignin }) {
    return (
        <div className="login">
            <h1>Login</h1>
            <button onClick={onSignin}>Login to Google Sheets</button>
        </div>
    )
}