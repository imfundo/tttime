
export function getPeriodLength(ms) {
    let absMin = ms / (1000*60);
    let hours = Math.floor(absMin / 60);
    let relMin = absMin % 60;
    return { ms, absMin, hours, relMin };
}


function zp(num) {
    return ("00" + num).slice(-2);
}

function getDateString(date) {
    return [date.getDate(), (date.getMonth()+1), date.getFullYear()].map(zp).join("-");
}

function getTimeString(date) {
    return [date.getHours(), date.getMinutes()].map(zp).join(":");
}

export function toViewModel(timelog) {
    const { start, end, description, id } = timelog;
    const { hours, relMin } = getPeriodLength(end - start);
    return {
        id,
        description,
        date: getDateString(start),
        startTime: getTimeString(start),
        endTime: getTimeString(end),
        duration: [hours, zp(relMin)].join(".")
    }
}