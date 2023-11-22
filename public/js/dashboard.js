
// refresh page time
function dateTime() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var ampm = today.getHours() >= 12 ? 'PM' : 'AM';
    var dateTime = date + ' ' + time + ' ' + ampm;
    return dateTime;
}
document.getElementById('date').innerHTML = dateTime();
//====