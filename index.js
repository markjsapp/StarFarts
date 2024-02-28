const axios = require('axios');
const expect = require('expect.js');

document.addEventListener('DOMContentLoaded', function() {
    axios.get('https://swapi.dev/api/starships/')
        .then(response => {
          const allStarshipData = response.data.results;
            const randomStarship = getRandomElement(allStarshipData);

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
            document.getElementById('pilots').textContent = 'Pilots: ' + randomStarship.pilots;

            expect(response.status).to.be(200);

            console.log("\nAPI call was successful with status 200");
        })
        .catch(error => {
            console.error("API call failed", error);
        });
});

function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}
