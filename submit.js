function submitForm() {
    var fromDate = null, toDate = null, tmp = document.getElementById("fromDate");
    var url = "https://mexicocrossborder.com/dnis/qualitas/cotizandoOnline.php"

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
    tmzString = (tmz) => {
        tmz = tmz.toString().match(/\(([A-Za-z\s].*)\)/)[1].split(' ');
        return ('' + tmz[0][0] + '' + '' + tmz[1][0] + '' + tmz[2][0] + '');
    }
    const date_diff_indays = (a, b) => (new Date(b) - new Date(a)) / (24 * 60 * 60 * 1000);
    const options = {
        url: url,
        method: 'POST',
        headers: {
            "Sec-Fetch-Dest": "empty",
            "X-Requested-With": "XMLHttpRequest",
            "User-Agent": "Mozilla / 5.0(Windows NT 10.0; Win64; x64) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 80.0.3987.122 Safari / 537.36",
            "Content-Type": " application / x-www-form-urlencoded",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-Mode": "cors"
        },
        data: {
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
            vehicleValue: 1200, //document.getElementById("vehicleValue").value,
            days: date_diff_indays(document.getElementById("fromDate").value, document.getElementById("toDate").value)
        }
    };
    var response;
    axios(options).then(response => {
        console.log(response.status);
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