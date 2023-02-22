const BASE_URL_FOR_BIKES =
  "https://tfl.gov.uk/tfl/syndication/feeds/cycle-hire/livecyclehireupdates.xml";
const BASE_URL_FOR_WEATHER =
  "http://api.weatherapi.com/v1/current.json?key=70342b35aa7a42e0bd2201015232202&q=EC2A 3QA&aqi=no";

axios.get(BASE_URL_FOR_WEATHER).then((response) => {
  const wind = response.data.current.wind_mph;
  const rain = response.data.current.precip_mm;
  const temp = response.data.current.temp_c;
  const borisStats = document.querySelector(".boris__stats");
  const borisText = document.querySelector(".boris__text");

  console.log(wind);
  console.log(rain);
  console.log(temp);

  const howsTheWeather = () => {
    const tempElement = document.createElement("li");
    const windElement = document.createElement("li");
    const rainElement = document.createElement("li");
    tempElement.classList.add("boris__temp");

    if (wind <= 25 && rain <= 2 && 16 <= temp && temp <= 25) {
      borisText.innerText = "It's an absolutely MARVELOUS day to go cycling!!!";
    } else if (wind <= 25 && rain <= 2 && 25 <= temp) {
      borisText.innerText =
        "Its awfully hot!!  Remember to drink lots of water if you want to go cycling!";
    } else if (wind <= 25 && rain <= 2 && 5 <= temp && temp <= 16) {
      borisText.innerText = "It's a Jolly good day to go cycling";
    } else if (wind <= 25 && rain <= 2 && temp <= 5) {
      borisText.innerText =
        "It's awfully cold!  Remember to wrap up warmly if you want to go cycling!";
    } else if (wind <= 25 && 4 <= rain && rain <= 8) {
      borisText.innerText =
        "It's rather rainy indeed!  You'd better wear a rain coat if you want to go cycling, and watch out for puddles!!";
    } else if (wind <= 25 && 8 <= rain) {
      borisText.innerText =
        "Its far too rainy to go cycling on one of my bikes!  You had better go to the gym and use one of those blasted machines instead!";
    } else if (25 <= wind && wind <= 30) {
      borisText.innerText =
        "It's quite windy! You had better be very careful if you want to cycle!";
    } else {
      borisText.innerText =
        "It's FAAAAR too windy to cycle!  You had better go to the gym and use one of those blasted machines instead!";
    }
  };

  howsTheWeather();
});

// axios.get(BASE_URL_FOR_BIKES).then((response) => {
//   const  = response.data;
// });
