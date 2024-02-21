// Function to extract the time zone offset from the given time zone string
function extractTimeZoneOffset(timeZone) {
  // Split the time zone string to extract hours and minutes
  let parts = timeZone.split("UTC")[1].split(":");
  // Parse hours and minutes into integers
  let hours = parseInt(parts[0], 10);
  let minutes = parseInt(parts[1], 10);
  // Calculate the offset in hours
  let offset = hours + minutes / 60;
  return offset;
}

// Asynchronous function to fetch data of countries from an API
async function getCountriesData() {
  try {
    const response = await fetch("https://restcountries.com/v2/all");
    const countries = await response.json();
    let countriesArray = [];
    for (const country of countries) {
      const countryData = {
        country: country.name,
        capital: country.capital,
        flag: country.flags.png,
        utcOffset: extractTimeZoneOffset(country.timezones[0]),
      };
      countriesArray.push(countryData);
    }
    return countriesArray;
  } catch (error) {
    console.error("Error when retrieving country data:", error);
    return [];
  }
}
// Function to calculate local time based on UTC offset
function getLocalTime(utcOffset) {
  const now = new Date();
  // Calculate local time using the UTC offset
  const offsetHours = Math.floor(utcOffset);
  const offsetMinutes = (utcOffset - offsetHours) * 60;
  let localHours = now.getUTCHours() + offsetHours;
  let localMinutes = now.getMinutes() + offsetMinutes;
  const localSeconds = now.getSeconds();
  // Adjust hours and minutes if necessary
  if (localMinutes < 0) {
    localHours--;
    localMinutes += 60;
  } else if (localMinutes >= 60) {
    localHours++;
    localMinutes -= 60;
  }
  if (localHours < 0) {
    localHours += 24;
  } else if (localHours >= 24) {
    localHours -= 24;
  }
  // Format minutes and seconds with leading zeros if needed
  const formattedMinutes =
    localMinutes < 10 ? "0" + localMinutes : localMinutes;
  const formattedSeconds =
    localSeconds < 10 ? "0" + localSeconds : localSeconds;
  return `${localHours}:${formattedMinutes}:${formattedSeconds}`;
}

// Asynchronous function to display country data in HTML
async function displayCountries() {
  const countriesArray = await getCountriesData();
  const countriesContainer = document.getElementById("countries-container");
  countriesArray.forEach((country) => {
    const countryDiv = document.createElement("div");
    // Get the current local date
    const localDate = new Date();
    const formattedDate = localDate.toLocaleDateString();
    setInterval(() => {
      countryDiv.innerHTML = `
        <img src="${country.flag}" alt="${
        country.country
      } Flag" style="width: 100px;">
        <h3>${country.country}</h3>
        <h4>${country.capital}</h4>
        <p>Local Date: ${formattedDate}</p>
        <p>Local Time: ${getLocalTime(country.utcOffset)}</p>
      `;
    }, 1000);
    countriesContainer.appendChild(countryDiv);
    countryDiv.className = "countryDiv";
  });
}
displayCountries().catch((error) => {
  console.error("Error:", error);
});

// Get the search input element
const searchBar = document.getElementById("searchBar");

// Event listener for keyup events on the search input
searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  const countryDivs = document.querySelectorAll(".countryDiv");
  countryDivs.forEach((countryDiv) => {
    const countryName = countryDiv
      .querySelector("h3")
      .textContent.toLowerCase();
    const capitalName = countryDiv
      .querySelector("h4")
      .textContent.toLowerCase();
    if (
      countryName.includes(searchString) ||
      capitalName.includes(searchString)
    ) {
      // Show the country div
      countryDiv.style.display = "block";
    } else {
      // Hide the country div
      countryDiv.style.display = "none";
    }
  });
});
