//jshint esversion:7
//jshint esversion:8

const key = 'BZILdw2DG014oV5AQK1t3a5kaQ4iGtxI';


//get current conditions
const getWeather = async (id) => {
  const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${id}?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];  
};

//get city information
const getCity = async(city) =>{

    const base = 'https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;
    
    const response = await fetch(base + query);
    const data = await response.json();
  
return data[0]; 


};
/* 
getCity('kokkola')
.then(data => {
return getWeather(data.Key);
})
.then(data => {console.log(data);
})
.catch(errr=> console.log(err)); */
