const axios = require('axios');
const expect = require('expect.js');

axios.get('https://swapi.dev/api/starships/')
  .then(response => {
    // Log the response data to see the API response
    const allStarshipData = response.data.results;

    const randomStarship = getRandomElement(allStarshipData); 
    
    console.log(randomStarship);
    console.log('name:' + randomStarship.name);

    // Use expect.js to assert the status code
    expect(response.status).to.be(200);

    // Let the user know that the call was successful
    console.log("\nAPI call was successful with status 200");
  })
  .catch(error => {
    // Let the user know some bad stuff just happened
    console.error("API call failed", error);
  });



function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}