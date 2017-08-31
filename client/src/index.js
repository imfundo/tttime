import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { createGoogleSheetStorage } from './storage/googlesheets.js';
import gapi from './vendor/gapi';

import App from './ui/App.js'

window.gapi = gapi;

// STORE INIT
/* 
let store = {
    appStarted: false,
    isSignedIn: false,
    buttonText: "Loading",
    dataLoading: false,
    data: false
}; */


// STORAGE INIT

let googleSheetsConfig = {
    CLIENT_ID: "62033563399-g7v42rmhn4q63mdqh1mn0pppqmm0hu73.apps.googleusercontent.com",
    DISCOVERY_DOCS: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    SCOPES: "https://www.googleapis.com/auth/spreadsheets.readonly",
    DOC_ID: '1XfD84T20nHz1J7RPh0p-wT5bB_U19WkocyOiN8s8duQ'
}


let storage = createGoogleSheetStorage(googleSheetsConfig);


ReactDOM.render(
    <BrowserRouter>
        <App
            storage={storage}
        />
    </BrowserRouter>,
    document.getElementById("root")
)
