
export function getPeriodLength(ms) {
    let absMin = ms / (1000*60);
    let hours = Math.floor(absMin / 60);
    let relMin = absMin % 60;
    return { ms, absMin, hours, relMin };
}
