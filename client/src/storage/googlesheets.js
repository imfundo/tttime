import gapi from '../vendor/gapi';


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

        getData() {
            let colHeaders = ["date", "description", "start", "end", "length", "category"];
            return gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: DOC_ID,
                range: 'Aug. 17!A2:F17',
            }).then(function (response) {
                var range = response.result;
                var results = [];
                if (range.values.length > 0) {
                    for (var i = 0; i < range.values.length; i++) {
                        var row = range.values[i];
                        var rowObj = {};
                        results.push(rowObj);
                        colHeaders.forEach((header, i) => {
                            rowObj[header] = row[i];
                        });
                    }
                }
                return results;
            }, function (response) {
                console.log("Got error when reading sheet");
            });
        }
    }
}
