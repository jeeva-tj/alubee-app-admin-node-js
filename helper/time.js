
function timeFormat(){
    const utcDate = new Date();
    const utcYear = utcDate.getFullYear();
    const utcMonth = utcDate.getMonth() + 1; // Months are 0-indexed
    const utcDay = utcDate.getDate();
    const utcHours = utcDate.getHours();
    const utcMinutes = utcDate.getMinutes();
    const utcSeconds = utcDate.getSeconds();

    const format = `${utcYear}-${utcMonth}-${utcDay} ${utcHours}:${utcMinutes}:${utcSeconds}`;

    return format;
}

export default timeFormat;