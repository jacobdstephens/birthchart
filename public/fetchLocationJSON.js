async function fetchLocationJSON(event) {
    event.preventDefault();
    const form = event.target;
    const url = form.action;

    //console.log(formData);
    try {
        const simpleForm = {};
        const simpleFormData = new FormData();

        const birthplace = document.getElementById('birthplace').value;
        const birthday = document.getElementById('birthday').value;
        const birthtime = document.getElementById('birthtime').value;

        //console.log(birthplace);

        const location_response = await fetch(`https://nominatim.openstreetmap.org/search/${birthplace}?format=json&limit=1`);

        const location_data = await location_response.json();
        const lat = location_data[0].lat;
        const lon = location_data[0].lon;

        const tz_response = await fetch(`https://secure.geonames.org/timezoneJSON?formatted=true&lat=${lat}&lng=${lon}&username=jacobdstephens&style=full`);
        const tz_data = await tz_response.json();

        const year = birthday.split("-")[0];
        const month = birthday.split("-")[1];
        const day = birthday.split("-")[2];
        const hour = birthtime.split(":")[0];
        const min = birthtime.split(":")[1];
        const tzId = tz_data.timezoneId;

        simpleForm['year'] = year;
        simpleForm['month'] = month;
        simpleForm['day'] = day;
        simpleForm['hour'] = hour;
        simpleForm['minute'] = min;
        simpleForm['timezone'] = tzId;
        simpleForm['latitude'] = lat;
        simpleForm['longitude'] = lon;

        console.log(simpleForm);
        const simpleJSON = JSON.stringify(simpleForm);

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: simpleJSON,
        };

        const response = await fetch(url, fetchOptions);
        const results = await response.json();

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
        //document.getElementById("chart").innerHTML = results.body['chart'];
        document.getElementById('chart').innerHTML = results.body['chart'];
        document.getElementById("sun_sign").innerHTML = results.body['sun'];
        document.getElementById("moon_sign").innerHTML = results.body['moon'];
        document.getElementById("sun_reading").innerHTML = results.body['reading']['sun'];
        document.getElementById("moon_reading").innerHTML = results.body['reading']['moon'];
        document.getElementById("jupiter_reading").innerHTML = results.body['reading']['jupiter'];
        document.getElementById("saturn_reading").innerHTML = results.body['reading']['saturn'];
        document.getElementById("venus_reading").innerHTML = results.body['reading']['venus'];
        document.getElementById("mars_reading").innerHTML = results.body['reading']['mars'];
        document.getElementById("mercury_reading").innerHTML = results.body['reading']['mercury'];
        console.log(results.body);
    } catch (error) {
        console.error(error);
    }
    return;
}
//const simple_form = document.getElementById("simple_form");
//simple_form.addEventListener("submit", fetchLocationJSON);
