
const cityForm = document.querySelector('form.city');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
    const {cityDets, weather} = data;
    
    //update details template
    details.innerHTML = `<h5 class="my-3">${cityDets.LocalizedName}</h5>
    <h6 class="my-3">${cityDets.Country.LocalizedName}</h6>
<div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>`;

//update the night and day images
//setting icons
const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
icon.setAttribute('src', iconSrc);

//setting  the time of day
//more concise method using a tenary operator
let timeSRC = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
time.setAttribute('src', timeSRC);

  //remove the d-none class if present
  if(card.classList.contains('d-none')){
    card.classList.remove('d-none');
}
        
};

const updateCity = async (city) => {
    const cityDets = await getCity(city); //await ensures the function call is complete before the next instruction is executed
    const weather = await getWeather(cityDets.Key);

    //return data from both functions in forecast.js
    return {
        cityDets,
        weather
    };
 
};

cityForm.addEventListener('submit', (e) => {
    //prevent default action
    e.preventDefault();
    //taking the value from the user input (city name)
    const city = cityForm.city.value.trim(); //form.nameofinput.valueofinput
    cityForm.reset();

    //update the ui with the city name and display the data obtained
    updateCity(city)
        .then(data => {            
            updateUI(data);
        })
        .catch(err => {
            console.log(err);
        });


        //set Local Storage
        localStorage.setItem('city', city);
});
//render page using the object in local storage
if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => {
        console.log(err);
    });
}
