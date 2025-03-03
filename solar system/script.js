const planets = document.querySelectorAll("a");
let planetName = "";

const choosePlanet = document.querySelector(".choose-planet");
const planetInfo = document.querySelector(".planet-info");

const facts = {
    sun :"Sun's core is insanely hot! The temperature at the core of the Sun reaches around 15 million°C (27 million°F). This is where nuclear fusion happens, converting hydrogen into helium and releasing the immense energy that powers our solar system.",
    mercury :"Mercury has no moons and is the fastest planet orbiting the Sun, completing an orbit in just 88 Earth days.",
    venus :"Venus has the hottest surface temperature of any planet in the Solar System, reaching about 475°C (900°F), hot enough to melt lead.",
    earth :"Earth is the only known planet to support life and has the highest density of any planet in our solar system.",
    mars :"Mars has the tallest volcano in the Solar System, Olympus Mons, which is about 13.6 miles (22 km) high and 370 miles (600 km) wide.",
    jupiter :"Jupiter has the strongest magnetic field of all the planets and at least 92 moons. Its Great Red Spot is a storm that has been raging for at least 400 years.",
    saturn :"Saturn's rings are made mostly of ice particles, with a small amount of rocky debris and dust. Despite their massive appearance, the rings are only about 10 meters thick in most places.",
    uranus :"Uranus rotates on its side, with its axis pointing nearly 90 degrees away from the Sun. This unique tilt causes extreme seasons that last about 20 years each.",
    neptune :"Neptune has the strongest winds in the Solar System, reaching speeds of 2,100 km/h (1,300 mph). It has a Great Dark Spot similar to Jupiter's Great Red Spot.",
}


planets.forEach((planet)=>{
    planet.onclick = ()=>{
        if(planet.className.includes("sun")){
            planetName = "sun";
        }
        else if(planet.className.includes("mercury")){
            planetName = "mercury";
        }
        else if(planet.className.includes("venus")){
            planetName = "venus";
        }
        else if(planet.className.includes("earth")){
            planetName = "earth";
        }
        else if(planet.className.includes("mars")){
            planetName = "mars";
        }
        else if(planet.className.includes("jupiter")){
            planetName = "jupiter";
        }
        else if(planet.className.includes("saturn")){
            planetName = "saturn";
        }
        else if(planet.className.includes("uranus")){
            planetName = "uranus";
        }
        else if(planet.className.includes("neptune")){
            planetName = "neptune";
        }
        console.log(planetName);
        choosePlanet.style.display="none";
        planetInfo.style.display="block";
        fetchData(planetName)
    }
})

const apiUrl = `https://api.le-systeme-solaire.net/rest/bodies/`;
function formatNumber(num){
    return num.toLocaleString();
}
function displayPlanetData(data){
    document.querySelector(".title").textContent=data.englishName;
    document.querySelector(".planet-info img").src=`images/${planetName}.png`;
    document.querySelector(".diameter span").textContent = `${formatNumber(data.meanRadius * 2)} km`;
    document.querySelector(".distanse span").textContent=`${formatNumber(data.semimajorAxis)} million km`;
    document.querySelector(".gravity span").textContent=`${data.gravity} m/s²`;
    document.querySelector(".type span").textContent = data.bodyType || "N/A";
    document.querySelector(".fun-fact span").textContent=facts[planetName];;
}

async function fetchData(planetName) {
    try{
        const response = await fetch(`${apiUrl}${planetName}`);
        if(!response.ok){
            throw new Error("failed to fetch");
        }
        const data = await response.json();
        displayPlanetData(data);
    } catch{
        console.error("Error fetching planet data");
    }
}
