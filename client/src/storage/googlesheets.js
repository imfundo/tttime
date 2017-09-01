import gapi from '../vendor/gapi';


let zp = num => ("00" + num).slice(-2);

let str = x => x;
let parseDateTime = dt => {
    const [date, time] = dt.split(" ");
    const [year, month, day] = date.split("-").map(x => parseInt(x, 10));
    const [hour, minute] = time.split(":").slice(0, 2).map(x => parseInt(x, 10));

    return new Date(year, month - 1, day, hour, minute);
};

let dateTimeToString = dt => {
    let date = `${dt.getFullYear()}-${zp(dt.getMonth() + 1)}-${zp(dt.getDate())}`;
    let time = `${zp(dt.getHours())}:${zp(dt.getMinutes())}`
    return `${date} ${time}`;
}

var googleSheetSchema = [
    {
        label: "id",
        sheetToModel: str,
        modelToSheet: str
    },
    {
        label: "start",
        sheetToModel: parseDateTime,
        modelToSheet: dateTimeToString
    },
    {
        label: "end",
        sheetToModel: parseDateTime,
        modelToSheet: dateTimeToString
    },
    {
        label: "description",
        sheetToModel: str,
        modelToSheet: str
    },
    {
        label: "category",
        sheetToModel: str,
        modelToSheet: str
    }
];


export function createGoogleSheetStorage({ CLIENT_ID, DISCOVERY_DOCS, SCOPES, DOC_ID, SHEET_NAME }) {

    let gapiLoaded = false;
    let signinObservers = [];
    function notify(signedIn) {
        signinObservers.forEach(obs => obs(signedIn));
    }

    return {
        init() {
            return new Promise(function (resolve, reject) {
                gapi.load("client:auth2", () => {
                    resolve(gapi.client.init({
                        discoveryDocs: DISCOVERY_DOCS,
                        clientId: CLIENT_ID,
                        scope: SCOPES
                    }).then(() => {
                        gapi.auth2.getAuthInstance().isSignedIn.listen(notify);
                        gapiLoaded = true;
                    }));
                });
            });
        },

        listen(observer) {
            signinObservers.push(observer);
        },

        signIn() {
            console.log("Signing in to google sheets");
            if (gapiLoaded) {
                gapi.auth2.getAuthInstance().signIn();
            }
        },

        signOut() {
            if (gapiLoaded) {
                gapi.auth2.getAuthInstance().signOut();
            }
        },

        isSignedIn() {
            return gapi.auth2.getAuthInstance().isSignedIn.get();
        },

        isReady() {
            return gapiLoaded;
        },

        getTimeLogs() {
            return gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: DOC_ID,
                range: 'tttime!A:E',
            }).then(function (response) {
                let rows = response.result.values;
                return rows.map(row => {
                    let rowObj = {};
                    googleSheetSchema.forEach(({ label, sheetToModel }, i) => {
                        rowObj[label] = sheetToModel(row[i]);
                    });
                    return rowObj;
                });
                return results;
            }, function (response) {
                console.log("Got error when reading sheet");
            });
        },

        saveTimeLog(timelog) {
            timelog = googleSheetSchema.map(({ label, modelToSheet }) => {
                return modelToSheet(timelog[label]);
            })
            console.log("About to save ", timelog)
            return gapi.client.sheets.spreadsheets.values.append({
                spreadsheetId: DOC_ID,
                range: 'tttime!A:E',
                valueInputOption: 'RAW',
                resource: {
                    values: [timelog]
                }
            });
        }
    }
}
