const axios = require('axios');
const expect = require('expect.js');
const { ipcRenderer } = require('electron');
require('dotenv').config();

ipcRenderer.send('open-dev-tools');

document.addEventListener('DOMContentLoaded', function() {
    axios.get('https://swapi.dev/api/starships/')
        .then(response => {
          console.log(process.env.api_key);
          expect(response.status).to.be(200);
          console.log("\nAPI call was successful with status 200\n");

          const allStarshipData = response.data.results;
          const randomStarship = getRandomElement(allStarshipData);

          console.log(randomStarship);

          // in the future, we'll need to parse the response array and make subsequent GET calls for the pilot names
          let pilots = randomStarship.pilots;
          if(pilots.length === 0){
            pilots = 'no one of note'
          }

          document.getElementById('name').textContent = 'Name: ' + randomStarship.name;
          document.getElementById('model').textContent = 'Model: ' + randomStarship.model;
          document.getElementById('manufacturer').textContent = 'Manufactured by: ' + randomStarship.manufacturer;
          document.getElementById('cost').textContent = 'Suggested Cost (Credits): ' + randomStarship.cost_in_credits;
          document.getElementById('length').textContent = 'Length (Meters): ' + randomStarship.length;
          document.getElementById('speed').textContent = 'Max Atmosphering Speed: ' + randomStarship.max_atmosphering_speed;
          document.getElementById('crew').textContent = 'Suggested Crew Amount: ' + randomStarship.crew;
          document.getElementById('passengers').textContent = 'Max Passenger Capacity: ' + randomStarship.passengers;
          document.getElementById('cargo').textContent = 'Max Cargo Capacity: ' + randomStarship.cargo_capacity;
          document.getElementById('hyperdrive').textContent = 'Hyperdrive Rating: ' + randomStarship.hyperdrive_rating;
          document.getElementById('class').textContent = 'Class: ' + randomStarship.starship_class;
          document.getElementById('pilots').textContent = 'Pilots: ' + pilots;

          const starshipName = randomStarship.name;
          return axios.get(`https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(starshipName)}&api_key=${process.env.api_key}`);
        })
        .then(googleResponse => {
          expect(googleResponse.status).to.be(200);
          console.log("\nGoogle image search API call was successful with status 200\n");

          const imageUrl = googleResponse.data.inline_images[0].original;
          const imageElement = document.getElementById('starship-image');
          imageElement.src = imageUrl;
          imageElement.style.display = 'block';
      })
        .catch(error => {
            console.error("API call failed", error);
        });
});

function updateStarshipDetails(starship, pilots) {
  document.getElementById('name').textContent = 'Name: ' + starship.name;
  // Update other details similarly...
  document.getElementById('pilots').textContent = 'Pilots: ' + pilots;
}

function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}
