let city = "";
const cityDisplay = document.querySelector(".cityName");


const searchCity = document.querySelector(".searchCity");
const submitCity = document.querySelector(".searchCity button");
const inputCity = document.querySelector(".searchCity input");
let lat = 0; 
let lon = 0; 

window.onload = ()=>{
    currentLocation();
}

function currentLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            fetchWeather(lat, lon);
        });
        } else { 
        window.alert("Geolocation is not supported by this browser.");
        fetchWeather(30.013056, 31.208853);
        }
}


let degree = document.querySelector(".degree span");


let condition = document.querySelector(".condition span");
let icon = document.querySelector(".condition i");


let feelsLike = 0;
let humidity = 0;
let speed = 0;
let pressure = 0;

const feelsLikeDisplay = document.querySelector(".lookLike .degree");
const humidityDisplay = document.querySelector(".humidity .degree");
const speedDisplay = document.querySelector(".speed .degree");
const pressureDisplay = document.querySelector(".pressure .degree");

feelsLikeDisplay.textContent = feelsLike;
humidityDisplay.textContent = humidity;
speedDisplay.textContent = speed;
pressureDisplay.textContent = pressure;


const apiKey = "eb8ce4852f14a27930506576d2172c6a";
fetchWeather(lat, lon);
async function fetchWeather(lat, lon){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        console.log(data)
        console.log(data.coord)
        updateWeather(data)
        console.log(`name : ${data.name}`)
        console.log(`temp : ${Math.round(data.main.temp)}`)
        console.log(`feels_like : ${Math.round(data.main.feels_like)}`)
        console.log(`wind speed : ${Math.round(data.wind.speed)}`)
        console.log(`humidity : ${Math.round(data.main.humidity)}`)
        console.log(`pressure: ${Math.round(data.main.pressure)}`)
        console.log(`country : ${data.sys.country}`)
        console.log(`main : ${data.weather[0].main}`)
        console.log(`description : ${data.weather[0].description}`)
    } catch(error){
        console.error("cannot fetch");
    }
}
function updateWeather(data){
    let weather = data.weather[0].main.toLowerCase();
    let description = data.weather[0].description;
    if(weather.includes("clear")){
        document.querySelector("body").style.backgroundImage = `url('../images/sunny.jpg')`;
        condition.textContent = description;
        icon.className = "fa-regular fa-sun";
    }
    else if(weather.includes("cloud")){
        document.querySelector("body").style.backgroundImage = `url('../images/cloudy.png')`;
        condition.textContent = description;
        icon.className = "fa-solid fa-cloud";
    }
    else if(weather.includes("rain")){
        document.querySelector("body").style.backgroundImage = `url('../images/rainy.jpg')`;
        condition.textContent=description;
        icon.className = "fa-solid fa-cloud-rain";
    }
    else if(weather.includes("wind")){
        document.querySelector("body").style.backgroundImage = `url('../images/windy.jpg')`;
        condition.textContent = description;
        icon.className = "fa-solid fa-wind";
    }
    else if(weather.includes("fog")){
        document.querySelector("body").style.backgroundImage = `url('../images/foggy.jpg')`;
        condition.textContent = description;
        icon.className = "fa-solid fa-smog";
    }
    else if(weather.includes("storm")){
        document.querySelector("body").style.backgroundImage = `url('../images/storm.jpg')`;
        condition.textContent=description;
        icon.className = "fa-solid fa-poo-storm";
    }
    else if(weather.includes("snow")){
        document.querySelector("body").style.backgroundImage = `url('../images/snowy.jpg')`;
        condition.textContent = description;
        icon.className = "fa-solid fa-snowflake";
    }

    city = data.name;
    country = data.sys.country;
    cityDisplay.textContent = `${city}, ${country}`;

    condition.textContent=description;

    degree.textContent= Math.round(data.main.temp);
    feelsLikeDisplay.textContent = Math.round(data.main.feels_like);
    speedDisplay.textContent = Math.round(data.wind.speed);
    humidityDisplay.textContent = Math.round(data.main.humidity);
    pressureDisplay.textContent = Math.round(data.main.pressure);

}

searchCity.addEventListener("submit", (e)=>{
    e.preventDefault();
    city = inputCity.value;
    console.log("search");
    async function cityWeather(city) {
        try{
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            const data = await response.json();
            updateWeather(data);
        } catch(error){
            alert("City not found. Please enter a valid city name.");
        }
    }
    cityWeather(city);
})
document.addEventListener("click", (e)=>{
    if(e.target.closest(".access")){
        console.log("access Location")
        currentLocation();
    }
})