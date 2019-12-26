gps = (resolve = console.log, reject = console.error, precision = 5) => {
    // .watchPosition     .getCurrentPosition
    var out = {};
    navigator.geolocation.watchPosition((pos) => {
        var tmp = {
            lat: pos.coords.latitude.toFixed(precision) * 1,
            lon: pos.coords.longitude.toFixed(precision) * 1,
            acc: pos.coords.accuracy
        }
        if (tmp.lat == out.lat && tmp.lon == out.lon) return;
        out = tmp;
        resolve(out);
    }, reject);
}