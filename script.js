const BASE_URL_FOR_BIKES =
  "https://tfl.gov.uk/tfl/syndication/feeds/cycle-hire/livecyclehireupdates.xml";
const BASE_URL_FOR_WEATHER =
  "http://api.weatherapi.com/v1/current.json?key=70342b35aa7a42e0bd2201015232202&q=EC2A3QA&aqi=no";

const getWeather = () => {};
axios.get(BASE_URL_FOR_WEATHER).then((response) => {
  const wind = response.data.current.wind_mph;
  const rain = response.data.current.precip_mm;
  const temp = response.data.current.temp_c;
  const boris = document.querySelector(".boris");
  const borisStats = document.querySelector(".boris__stats");
  const borisText = document.querySelector(".boris__text");
  const borisPic = document.querySelector(".boris__pic");
  const borisButton = document.querySelector(".boris__button-group");
  const borisIconWrapper = document.querySelector(".boris__icon-wrapper");

  console.log(wind);
  console.log(rain);
  console.log(temp);

  const howsTheWeather = () => {
    const tempElement = document.createElement("li");
    const windElement = document.createElement("li");
    const rainElement = document.createElement("li");
    const iconElement = document.createElement("img");
    tempElement.innerText = `Temp: ${temp} °C`;
    windElement.innerText = `Wind: ${wind} mph`;
    rainElement.innerText = `Rain: ${rain}mm`;
    borisStats.appendChild(tempElement);
    borisStats.appendChild(windElement);
    borisStats.appendChild(rainElement);
    boris.appendChild(borisStats);
    boris.appendChild(iconElement);
    borisIconWrapper.appendChild(iconElement);
    tempElement.classList.add("boris__temp");
    windElement.classList.add("boris__wind");
    rainElement.classList.add("boris__rain");

    if (wind >= 40) {
      iconElement.src = "./assets/weather-icons/very-windy-icon.png";
    } else if (wind >= 25 && wind <= 40) {
      iconElement.src = "./assets/weather-icons/wind-icon.png";
    } else if (rain >= 8) {
      iconElement.src = "./assets/weather-icons/heavy-rain.png";
    } else if (rain <= 8 && rain >= 4) {
      iconElement.src = "./assets/weather-icons/rain-icon.jpeg";
    } else if (temp >= 25) {
      iconElement.src = "./assets/weather-icons/hot-icon.png";
    } else if (temp <= 5) {
      iconElement.src = "./assets/weather-icons/cold-icon.png";
    } else if (temp <= 25 && temp >= 16) {
      iconElement.src = "./assets/weather-icons/sun-icon.png";
    } else {
      iconElement.src = "./assets/weather-icons/okay-icon.webp";
    }

    if (wind <= 25 && rain <= 2 && 16 <= temp && temp <= 25) {
      borisPic.src = "./assets/Boris-Pics/Marbelous-Boris.jpeg";
      borisText.innerText = "It's an absolutely MARVELOUS day to go cycling!!!";
    } else if (wind <= 25 && rain <= 2 && 25 <= temp) {
      borisPic.src = "./assets/Boris-Pics/Very-Hot-Boris.avif";
      borisText.innerText =
        "Its awfully hot!!  Remember to drink lots of water if you want to go cycling!";
    } else if (wind <= 25 && rain <= 2 && 5 <= temp && temp <= 16) {
      borisPic.src = "./assets/Boris-Pics/Good-Boris.webp";
      borisText.innerText = "It's a Jolly good day to go cycling";
    } else if (wind <= 25 && rain <= 2 && temp <= 5) {
      borisPic.src = "./assets/Boris-Pics/cold-boris.avif";
      borisText.innerText =
        "It's awfully cold!  Remember to wrap up warmly if you want to go cycling!";
    } else if (wind <= 25 && 4 <= rain && rain <= 8) {
      borisPic.src = "./assets/Boris-Pics/Wet-boris.avif";
      borisText.innerText =
        "It's rather rainy indeed!  You'd better wear a rain coat if you want to go cycling, and watch out for puddles!!";
    } else if (wind <= 25 && 8 <= rain) {
      borisPic.src = "./assets/Boris-Pics/too-Rainy-Boris.jpeg";
      borisText.innerText =
        "Its far too rainy to go cycling on one of my bikes!  You had better go to the gym and use one of those blasted machines instead!";
    } else if (25 <= wind && wind <= 40) {
      borisPic.src = "./assets/Boris-Pics/struggling-boris.webp";
      borisText.innerText =
        "It's quite windy! You had better be very careful if you want to cycle!";
    } else {
      borisPic.src = "./assets/Boris-Pics/windy-boris.jpeg";
      borisText.innerText =
        "It's FAAAAR too windy to cycle!  You had better go to the gym and use one of those blasted machines instead!";
    }
  };

  borisButton.addEventListener("click", () => {
    borisStats.innerHTML = "";
    borisIconWrapper.innerHTML = "";
    howsTheWeather();
    getBikes();
    borisButton.classList.add("boris__button-group--disappear");
  });
});

const getBikes = () => {
  axios.get(BASE_URL_FOR_BIKES).then((response) => {
    const xml = response.data;
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(xml, "text/xml");
    console.log(xmlDoc);
    highstreetString =
      xmlDoc.getElementsByTagName("station")[37].childNodes[10].textContent;
    highstreet = Number(highstreetString);
    console.log(highstreet);
    worshipString =
      xmlDoc.getElementsByTagName("station")[169].childNodes[10].textContent;
    worship = Number(worshipString);
    console.log(worship);
    columbiaString =
      xmlDoc.getElementsByTagName("station")[379].childNodes[10].textContent;
    columbia = Number(columbiaString);
    console.log(columbia);

    const bikeText = document.querySelector(".bike__text");

    if (highstreet >= 10) {
      bikeText.innerText = `You're in luck, there are plenty of bikes available! (${highstreet} bikes left.)`;
    } else if (highstreet <= 10 && highstreet >= 1) {
      bikeText.innerText = `QUICK! There are only ${highstreet}
             bikes left, get one fast!! (if you don't make it you can go to Worship Street (${worship} bikes left)  or Columbia Street (${columbia} bikes left))`;
    } else {
      `TOO SLOW! There are no Bikes left! Instead you can go to Worship Street (${worship} bikes left) or Columbia Street (${columbia} bikes left)`;
    }
  });
};
