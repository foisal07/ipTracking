const API_KEY = "at_xk8bGjkoMSZqd9masOygBm2VaP32h";

const iptrackerForm = document.querySelector(".iptracker_form");
const submitBtn = document.querySelector(".iptracker_form_btn");
const iptracker_form_IP = document.querySelector(".iptracker_form_IP");
const iptrackerDisplay = document.querySelector(".iptracker_display");

let ip;
let ipInfo;

// 118.179.125.237

// Get IP JSON details
const getJSON = async function (ip) {
  try {
    const res = await fetch(
      `https://geo.ipify.org/api/v1?apiKey=${API_KEY}&ipAddress=${ip}`
    );
    if (!res.ok) throw new Error("Invalid IP Address");
    const data = await res.json();
    ipInfo = data;
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

iptrackerForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Get IP from form input
  ip = iptracker_form_IP.value;

  // Get ip details
  await getJSON(ip);

  // Display IP details
  displayTrackedInfo(ipInfo);
});

// Detect IP & display IP details on load
// window.addEventListener("load", async function (e) {
//   e.preventDefault();

//   // Get IP from form browser
//   const res = await fetch("https://api.ipify.org/?format=json");
//   const data = await res.json();
//   ip = data.ip;

//   // Get ip details
//   await getJSON(ip);

//   // Display IP details
//   displayTrackedInfo(ipInfo);
// });

// const controlIpTrack = async function (ip, ipInfo) {
//   await getJSON(ip);
//   displayTrackedInfo(ipInfo);
// };
