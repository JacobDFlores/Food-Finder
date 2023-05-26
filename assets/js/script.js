// API for recipes.
var requestUrl = 'https://api.spoonacular.com/recipes/complexSearch?';
// API for ingredients.
var requestUrlFoods = 'https://api.spoonacular.com/food/search?';

// API key.
var apiKey = 'apiKey=1a4b9968c31240dbaf9b48e10ead08ce';

// variables to get the data from html
var totalData = [];

var searchBtn = document.querySelector('.inp');

 // Gets the input from user.
 var userInput = document.querySelector('#searchResults');
 var userResult = userInput.value;
 console.log(userResult);
 // variables to mix the user input and apiKey to the requestUrls.
 var fetchUrl = requestUrl + apiKey + '&query=' + userResult;

 fetch(fetchUrl)
 .then(function (response) {
   return response.json();

 })
 .then(function (data) {
   console.log(data);
   console.log(userResult);

  checkRecipes(data, userResult);

 });


searchBtn.addEventListener('click', function() {
 
})

var displayerEl = document.querySelector('.fisplay');

///////////////////////////////////////////////////////////////////////////////////////////
// function to search for recipes.
function checkRecipes(data, userResult) {
  displayerEl.innerHTML = userResult;
  totalData = data.results;
  for (var i = 0; i < totalData.length; i++){
    // let img = document.createElement('img');
    let container = document.createElement('div');
    container.setAttribute('class', 'container2');
    displayerEl.appendChild(container);
  }
}
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////