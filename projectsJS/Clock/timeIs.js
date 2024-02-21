// Function to fetch the flag of Israel and display the current time
function fetchFlagAndDisplayTime() {
  fetch("https://restcountries.com/v2/name/israel?fields=flags")
    .then((response) => response.json())
    .then((data) => {
      const flagUrl = data[0].flags.svg;
      const clockIsrael = document.querySelector(".clockIsrael");
      clockIsrael.style.backgroundImage = `url(${flagUrl})`;
    })
    .catch((error) => {
      console.error("Error fetching flag:", error);
    });

  setInterval(() => {
    displayTime();
  }, 1000);
}
// Function to display the current time
function displayTime() {
  const clock = new Date();
  const hours = clock.getHours();
  const minutes = clock.getMinutes().toString().padStart(2, "0");
  const seconds = clock.getSeconds().toString().padStart(2, "0");
  // Arrays for month names and day names
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = days[clock.getDay()];
  const monthName = months[clock.getMonth()];
  const day = clock.getDate();
  const year = clock.getFullYear();
  const formattedDateString = `${monthName} ${dayName} ${day} ${year}`;
  const timeString = `${hours}:${minutes}:${seconds}`;
  document.getElementById("dateIsrael").innerHTML = formattedDateString;
  document.getElementById("timeIsrael").innerHTML = timeString;
}
fetchFlagAndDisplayTime();
