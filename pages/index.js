import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  return (
    <div className="container">
     <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA==" crossorigin="anonymous" />
    <link rel="stylesheet" href="assets/css/utilities.css">
    <link rel="stylesheet" href="assets/css/lstyle.css">
    <link href="assets/css/style.css" rel="stylesheet" type="text/css" media="all" />
    <title>Astro Craft</title>
</head>

<body>
<!--Navbar-->
<div class="navbar">
    <div class="container flex">
        <h1 align="center">Astro Lab</h1>
        <h2 align="center">Readings</h2>
    </div>
</div>

<!-- Cloud -->
<section class="cloud py-2">
  <div class="container flex">
  <!-- div class="showcase-form card">
   
          <form id='simple_form'
            method='POST'
            action='https://fia9c0dv5c.execute-api.us-west-1.amazonaws.com/default/simpleReading'
            align='center'>
            <div style="float:center;">
                <label for="birthday">Birthday:</label>
                <input type="date" id="birthday" name="birthday">
            </div>
            <div style="float:center;">
                <label for="birthtime">Birthtime:</label>
                <input type="time" id="birthtime" name="birthtime">
            </div>
            <div style="float:center;">
                <label for="birthplace">Birth Place</label>
                <input type="text" id="birthplace" name="birthplace"><br><br>
            </div>
            <input type="submit" value="Submit"/>
        </form>
      
      </div-->
      <div class="chart-card" id='chart'>
      
      <div class="showcase-form">
   
          <form id='simple_form'
            method='POST'
            action='https://fia9c0dv5c.execute-api.us-west-1.amazonaws.com/default/simpleReading'
            align='center'>
            <div class="form-control">
                <label for="birthday">Birth Date: Year-Month-Day</label>
                <input type="text" id="birthday" name="birthday" placeholder="2021-02-01" required>
                
            </div>
            <div class="form-control">
                <label for="birthtime">Birth Time: 24H:MM</label>
                <input type="text" id="birthtime" name="birthtime" placeholder="14:51" required>
            </div>
            <div class="form-control">
                <label for="birthplace">Birth Place: City, State</label>
                <input type="text" id="birthplace" name="birthplace"><br><br>
            </div>
            <input type="submit" value="Submit"/>
        </form>
      
      </div>
      
      </div>
  </div>
</section>

<!-- Stats >
<section>
  <div class="container">
  <h3 class="stats-heading text-center my-1">
                Signs
          </h3>
      <div class="cloud grid">
          <div class="card" id='sun_sign'>
          </div>
          <div class="card" id='moon_sign'>
          </div>
      </div>
  </div>
</section-->

<section>
    <!--Reading-->
    <h3 class="stats-heading text-center my-1">
                Planets
    </h3>
    <div class="container cloud grid">
        <div class="card" >
            <img src="assets/svg/src/sun.svg" width="50" height="50" class="glyph" />
            <div id='sun_sign'></div>
            <div id='sun_reading'></div>
        </div>

        <div class="card">
            <img src="assets/svg/src/moon.svg" width="50" height="50" class="glyph" />
            <div id='moon_sign'></div>
            <div id='moon_reading'></div>
        </div>
       
        <div class="card">
            <img src="assets/svg/src/jupiter.svg" width="50" height="50" class="glyph" />
            <div id='jupiter_reading'></div>
        </div>

        <div class="card" >
            <img src="assets/svg/src/saturn.svg" width="50" height="50" class="glyph" />
            <div id='saturn_reading'></div>
        </div>
    </div>
</section>
<section>
    <div class="container cloud grid-3">

        <div class="card" >
            <img src="assets/svg/src/venus.svg" width="50" height="50" class="glyph" />
            <div id='venus_reading'></div>
        </div>
  
        <div class="card">
            <img src="assets/svg/src/mars.svg" width="50" height="50" class="glyph" />
            <div id='mars_reading'></div>
        </div>

        <div class="card">
            <img src="assets/svg/src/mercury.svg" width="50" height="50" class="glyph" />
            <div id='mercury_reading'></div>
        </div>
    </div>
</section>


<script>    
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
    const simple_form = document.getElementById("simple_form");
    simple_form.addEventListener("submit", fetchLocationJSON);
    </script>
    <script>
      function showReading() {
            var x = document.getElementById("myDIV");
            if (x.style.display === "none") {
                  x.style.display = "block";
            } else {
                  x.style.display = "none";
            }
      }
    </script>
</body>
    </div>
  )
}
