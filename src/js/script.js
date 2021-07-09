const API_KEY = "at_xk8bGjkoMSZqd9masOygBm2VaP32h";

const iptrackerForm = document.querySelector(".iptracker_form");
const submitBtn = document.querySelector(".iptracker_form_btn");
const iptracker_form_IP = document.querySelector(".iptracker_form_IP");
const iptrackerDisplay = document.querySelector(".iptracker_display");
const map = document.querySelector(".map");

let ip, ipInfo, lat, lng, mapView;

// 118.179.125.237
// lat: 24.374, lng: 88.60114

// Get IP JSON details
const getJSON = async function (ip) {
  try {
    const res = await fetch(
      `https://geo.ipify.org/api/v1?apiKey=${API_KEY}&ipAddress=${ip}`
    );
    if (!res.ok) throw new Error("Invalid IP Address");
    const data = await res.json();
    console.log(data);
    ipInfo = data;
    lat = ipInfo.location.lat;
    lng = ipInfo.location.lng;
  } catch (err) {
    alert(err);
  }
};

// Generate Display IP Details Markup
const displayTrackedInfo = function (ipInfo) {
  const displayMarkup = `
        <div class="iptracker_display_box">
          <p class="iptracker_display_title">IP ADDRESS</p>
          <p class="iptracker_display_info">${ipInfo.ip}</p>
        </div>
        <div class="iptracker_display_box">
          <p class="iptracker_display_title">LOCATION</p>
          <p class="iptracker_display_info">${ipInfo.location.city}, ${ipInfo.location.country}</p>
        </div>
        <div class="iptracker_display_box">
          <p class="iptracker_display_title">TIMEZONE</p>
          <p class="iptracker_display_info">UTC 05:00</p>
        </div>
        <div class="iptracker_display_box">
          <p class="iptracker_display_title">ISP</p>
          <p class="iptracker_display_info">${ipInfo.isp}</p>
          </div>
          </div>
          `;
  iptrackerDisplay.insertAdjacentHTML("beforeend", displayMarkup);
};

// Display map
const displayMap = function (lat, lng) {
  // Create leaflet map
  mapView = L.map("map").setView([lat, lng], 15);

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZm9pc2FsMDciLCJhIjoiY2txdnNxazRhMGhsMTJvbWg2OWlyODN6NyJ9.Tf_hHhpLFTpQPmbMl_wbSQ",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoiZm9pc2FsMDciLCJhIjoiY2txdnNxazRhMGhsMTJvbWg2OWlyODN6NyJ9.Tf_hHhpLFTpQPmbMl_wbSQ",
    }
  ).addTo(mapView);

  // Leaflet map marker
  L.popup()
    .setLatLng([lat, lng])
    .setContent("Gtocha! The IP Located Around Here")
    .openOn(mapView);
};

// Display IP details on form submit
iptrackerForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Get IP from form input
  ip = iptracker_form_IP.value;

  // Get ip details
  await getJSON(ip);

  // Clear search form & previous IP details
  iptracker_form_IP.value = "";
  iptrackerDisplay.textContent = "";

  // Display IP details
  displayTrackedInfo(ipInfo);

  // Remove old map
  mapView.remove();

  // Display Map
  displayMap(lat, lng);
});

// Detect & display IP details on load
window.addEventListener("load", async function (e) {
  e.preventDefault();

  // Get IP from form browser
  const res = await fetch("https://api.ipify.org/?format=json");
  const data = await res.json();
  ip = data.ip;

  // Get ip details
  await getJSON(ip);

  // Clear previous details
  iptrackerDisplay.textContent = "";

  // Display IP details
  displayTrackedInfo(ipInfo);

  // Display Map
  displayMap(lat, lng);
});

// const controlIpTrack = async function (ip, ipInfo) {
//   await getJSON(ip);
//   displayTrackedInfo(ipInfo);
// };
