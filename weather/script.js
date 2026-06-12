const inputFeild = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const locationName = document.getElementById("location-name");
const icon = document.querySelector(".custom-icon-placeholder");
const mainTemp = document.getElementById("main-temp");
const weatherCond = document.getElementById("weather-desc");
const humidityVal = document.getElementById("humidity-val");
const windVal = document.getElementById("wind-val");
const pressureVal = document.getElementById("pressure-val");
const dateTime = document.getElementById("cyber-timestamp");

// code to  country
const getCuntryName = (code) => {
    return new Intl.DisplayNames([code], { type: "region" }).of(code);
};

// second to date and time 
const getCurntDateTime = (dt) => {
    let curntDate = new Date(dt * 1000);
    // console.log(curntDate);

    let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    };

    return new Intl.DateTimeFormat("en-US", options).format(curntDate);
};

//Kelvin to Celsius
const getCuruntCel = (cel) => {
    return cel - 273.15;
}

// Input function 
searchBtn.addEventListener('click', () => {
    city = inputFeild.value.toLowerCase();
    // console.log(city);
    getWeatherData();
});

inputFeild.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        searchBtn.click();
    }
})



city = 'Hanswar, ambedkar nagar';
const getWeatherData = async () => {

    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${CONFIG.WEATHER_API_KEY}`;

    try {
        let apiResponse = await fetch(api);
        let data = await apiResponse.json();
        // console.log(data);
        // error 
        if (data.cod == 404 || data.cod == "404") {
            alert(`🔴 Node Location Not Found! Please enter a valid city name ${city}`);
            return;
        }


        const { main, name, weather, wind, sys, dt } = data;

        const getCuntryNameFixed = (countryCode) => {
            return new Intl.DisplayNames(["en"], { type: "region" }).of(countryCode);
        };

        locationName.innerHTML = `${name}, ${getCuntryNameFixed(sys.country)}`;
        dateTime.innerHTML = getCurntDateTime(dt);

        let iconCode = weather[0].icon;
        icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather Icon" style="width: 50px; height: 50px;">`;


        mainTemp.innerHTML = `${(getCuruntCel(main.temp)).toFixed(1)}°C`;

        humidityVal.innerHTML = `${main.humidity}%`;
        windVal.innerHTML = `${(wind.speed * 3.6).toFixed(1)} km/h`;
        pressureVal.innerHTML = `${main.pressure} hPa`;
        weatherCond.innerHTML = weather[0].description.toUpperCase();



    } catch (error) {
        console.log(error);
    }

}


window.addEventListener('load', getWeatherData);
