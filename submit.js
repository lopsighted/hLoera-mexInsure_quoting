function submitForm() {
    axios.defaults.withCredentials = true
    var fromDate = null, toDate = null, tmp = document.getElementById("fromDate");
    var url = "https://cors-anywhere.herokuapp.com/https://mexicocrossborder.com/dnis/qualitas/cotiza2_online.php";
    //validate and set fromdate
    if (!validateDate(tmp, new Date()))
        return false;
    fromDate = new Date(tmp.value);
    fromDate.setTime(new Date().getTime());

    //validate and set todate
    tmp = document.getElementById("toDate");
    if (!validateDate(tmp, fromDate))
        return false;
    toDate = new Date(tmp.value)
    toDate.setTime(fromDate.getTime());

    //validate and set vehicleType
    var vehicleType = document.getElementById("vehicleType").value;
    if (vehicleType === 0) {
        alert('choose a vehicle type');
        return false;
    }
    //parse timezone
    tmzString = (tmz) => {
        tmz = tmz.toString().match(/\(([A-Za-z\s].*)\)/)[1].split(' ');
        return ('' + tmz[0][0] + '' + '' + tmz[1][0] + '' + tmz[2][0] + '');
    }
    const date_diff_indays = (a, b) => (new Date(b) - new Date(a)) / (24 * 60 * 60 * 1000);
    const options = {
        url: url,
        method: 'POST',
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": " application / x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
            "Access-Control-Allow-Credentials": "true",
            
        },
        data: $.param({
            back: 1,
            companiaId: 2,
            fromFecha: document.getElementById("fromDate").value,
            fromHora: fromDate.getHours(),
            fromMinuto: fromDate.getMinutes(),
            tmz: tmzString(fromDate),
            toFecha: document.getElementById("toDate").value,
            toHora: toDate.getHours(),
            toMinuto: toDate.getMinutes(),
            vehicleTypeId: document.getElementById("vehicleType").value,
            vehicleValue: 1000, //document.getElementById("vehicleValue").value,
            days: date_diff_indays(document.getElementById("fromDate").value, document.getElementById("toDate").value)
        })
    };
    console.log(options.data)
    axios(options).then(response => {
        console.log(response);
    });

    function validateDate(date, before) {
        if (date.value.length === 10 && date.value[2] === '/' && date.value[5] === '/') {
            var tmp = new Date(date.value);
            if (tmp.getTime() - before.getTime() > 0)
                return true;
            alert('date for \'' + date.id + '\' is earlier than possible')
        }
        else if (date.value === '')
            alert('date for \'' + date.id + '\' was not filled out')
        else
            alert('format for \'' + date.id + '\' date is incorrect. Make sure MM/DD/YYYY');
        return false;
    }
}