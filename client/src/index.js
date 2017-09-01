import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import css from './index.css'

import { createGoogleSheetStorage } from './storage/googlesheets.js';

import App from './ui/App.js'



let googleSheetsConfig = {
    CLIENT_ID: "62033563399-g7v42rmhn4q63mdqh1mn0pppqmm0hu73.apps.googleusercontent.com",
    DISCOVERY_DOCS: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    SCOPES: "https://www.googleapis.com/auth/spreadsheets.readonly",
    DOC_ID: '1XfD84T20nHz1J7RPh0p-wT5bB_U19WkocyOiN8s8duQ'
}


export default function initApp({ baseurl }) {
    let storage = createGoogleSheetStorage(googleSheetsConfig);
    
    
    ReactDOM.render(
        <BrowserRouter basename={baseurl}>
            <App
                storage={storage}
            />
        </BrowserRouter>,
        document.getElementById("root")
    )
}
