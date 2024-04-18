let ipAddress = document.getElementById("ip-address");
let ipLocation = document.getElementById("location");
let timezone = document.getElementById("timezone");
let isp = document.getElementById("isp");

// Leaflet setup

let map = L.map('map').setView([-12.852, -38.278], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
            {attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'})
            .addTo(map);


//Ipify API call


async function fetchData(ip='') {
    try{
        let response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_iigVYtkyCX5tQBG3bdCRsCfFBjUMn&ipAddress=${ip}`);

        if(!response.ok) {
            throw new Error("Could not fetch data");
        }

        const data = await response.json();
        displayData(data);
        console.log(data)
    }

    catch(error) {
        console.error(error);
    }
}

fetchData();

function displayData(dataJson){
    ipAddress.innerHTML = dataJson.ip;
    ipLocation.innerHTML = dataJson.location.city
    timezone.innerHTML = "UTC " + dataJson.location.timezone
    isp.innerHTML = dataJson.isp
}

let searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", () => {
    let ipInput = document.getElementById("search-bar").value;
    console.log(ipInput);
    fetchData(ipInput);
})