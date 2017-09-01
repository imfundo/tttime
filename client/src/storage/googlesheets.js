import gapi from '../vendor/gapi';



let str = x => x;
let parseDateTime = dt => new Date(dt);

var googleSheetSchema = [
    ["id", str],
    ["start", parseDateTime],
    ["end", parseDateTime],
    ["description", str],
    ["category", str]
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
                    googleSheetSchema.forEach(([name, parse], i) => {
                        rowObj[name] = parse(row[i]);
                    });
                    return rowObj;
                });
                return results;
            }, function (response) {
                console.log("Got error when reading sheet");
            });
        }
    }
}
