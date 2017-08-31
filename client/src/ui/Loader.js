import React from 'react'

export default function Loader({ isLoaded, children }) {
    return isLoaded 
        ? (
            children
        )
        : (
            <p>Loading</p>
        )
}