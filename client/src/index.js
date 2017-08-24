import { createGoogleSheetStorage } from './storage/googlesheets.js';


// STORE INIT

let store = {
    appStarted: false,
    isSignedIn: false,
    buttonText: "Loading",
    dataLoading: false,
    data: false
};

let storeObservers = [];


function updateStore(setter) {
    setter(store);
    storeObservers.forEach(observer => observer(store));
}

function updateSigninStatus(isSignedIn) {
    return updateStore(s => {
        s.isSignedIn = isSignedIn;
        s.buttonText = isSignedIn ? "Signout" : "Signin";
    });
}


// STORAGE INIT

let googleSheetsConfig = {
    CLIENT_ID: "62033563399-aiq4cnt2o78desod4o69jkmgmcb5mi2a.apps.googleusercontent.com",
    CLIENT_SECRET: "BTEngpESBOWFtZ6fpSrh6Fol",
    DISCOVERY_DOCS: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    SCOPES: "https://www.googleapis.com/auth/spreadsheets.readonly",
    DOC_ID: '1XfD84T20nHz1J7RPh0p-wT5bB_U19WkocyOiN8s8duQ'
}

let storage = createGoogleSheetStorage(googleSheetsConfig);

storage.init().then(function () {
    storage.listen(updateSigninStatus);
    updateSigninStatus(storage.isSignedIn());
});


// UI

let btn;
let dataTable;
function render() {
    if (!btn) {
        btn = document.createElement("button");
        btn.addEventListener("click", () => {
            if (store.isSignedIn) {
                storage.signOut();
            } else {
                storage.signIn();
            }
        });
        document.body.appendChild(btn);
    }
    btn.innerText = store.buttonText;
    if (!dataTable && store.data) {
        dataTable = document.createElement("div");
        store.data.forEach(row => {
            let rowEl = document.createElement("div");
            Object.values(row).forEach(cell => {
                let cellEl = document.createElement("span");
                cellEl.innerText = cell;
                rowEl.appendChild(cellEl);
            });
            dataTable.appendChild(rowEl);
        });
        document.body.appendChild(dataTable);
    }
}


function dataLoader(store) {
    if (storage.isReady() && store.isSignedIn && !(store.dataLoading || store.data)) {
        updateStore(s => s.dataLoading = true);
        storage.getData().then(results => {
            updateStore(s => { s.data = results; s.dataLoading = false; });
        });
    }
}


// WIRE UP LISTENERS

storeObservers.push(s => console.log("Store updated", s));
storeObservers.push(dataLoader);

window.addEventListener("DOMContentLoaded", () => {

    render();
    storeObservers.push(render);

});