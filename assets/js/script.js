// API for recipes.
var requestUrl = 'https://api.spoonacular.com/recipes/complexSearch?';
// API for ingredients.
var requestUrlFoods = 'https://api.spoonacular.com/food/search?';

// API key.
var apiKey = 'apiKey=1a4b9968c31240dbaf9b48e10ead08ce';

// variables to get the data from html
var totalData = [];

// getter for the magnifying glass (search button).
var searchBtn = document.querySelector('.btn');



// event listener for the serch button to then do everithing.
// it has a event preventDefault so the elements stays and dont refresh the website.
searchBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Gets the input from user.
    var userInput = document.querySelector('#text-inp');
    var userResult = userInput.value;
    console.log(userResult);
    // variables to mix the user input and apiKey to the requestUrls.
    var fetchUrl = requestUrl + apiKey + '&query=' + userResult + '&addRecipeInformation=true';

    fetch(fetchUrl)
    .then(function (response) {
      return response.json();

    })
    .then(function (data) {
      console.log(data);

      // calls the checkRecipes function to then get and render all elements.
      checkRecipes(data, userResult);

    });
})

// selector for where the images and recipe names displays.
var displayerEl = document.querySelector('.recipe');

///////////////////////////////////////////////////////////////////////////////////////////
// function to search for recipes.
function checkRecipes(data, userResult) {
  // sets the display div to empty(no content)
  displayerEl.innerHTML = "";
  // stores the array of 10 results to the array var {totalData}.
  totalData = data.results;
  // for loop to dynamically create the <img> and names of the recipes to the 
  // div container (you can change it to whatever html section/div) look UP to displayerEl variable:)
  for (var i = 0; i < totalData.length; i++){
    let img = document.createElement('img');
    // sets the image src to the corresponding recipe
    img.src = data.results[i].image;
    let container = document.createElement('h3');
    
    // displays the recipe name
    container.innerHTML = data.results[i].title;
   
    // create a div element which is the container where everything is displayed. 
    let containerFinal = document.createElement('div');
    containerFinal.setAttribute('class', 'container2');

    // create the article section.
    let containerArticle = document.createElement('article');

    // sets a class to change the ingredients class name. and then the link for the
    // recipe url. ***(CURRENTLY WORKING ON MAKING IT AN ANCHOR)***
    containerArticle.innerHTML = '<section>' + '<div class = "ingredients" >' + 'Ingredients: ' + '</div>' + '<br>' + data.results[i].sourceUrl + '<br><br>' + '</section>';
    // 
    containerArticle.setAttribute('class', 'recipe-details');

    // for loop to display the steps to make the recipe.
    for (var z = 0; z < (data.results[i].analyzedInstructions[0].steps).length; z++) {
      containerArticle.innerHTML += (z+1) + '. ' + data.results[i].analyzedInstructions[0].steps[z].step + '<br><br>';
    }
    

    // create a div element to store the recipe img and title.
    let infoPlacer = document.createElement('div');
    infoPlacer.appendChild(img);
    infoPlacer.appendChild(container);
    infoPlacer.setAttribute('class', 'info-placer');
  
   

    // appends the preview elements to the final container.
    containerFinal.appendChild(infoPlacer);
    containerFinal.appendChild(containerArticle);
    
    
    // appends the final element to the final div wich is the .recipe class.
    displayerEl.appendChild(containerFinal);
  }
}

// MODAL Trigger//
$(document).ready(function(){
  $('.modal').modal();
});
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////

// //getter for the reset button on HTML.
// var resetBtn = document.querySelector('#reset');

// //event listener to reset and delete all the elements of the displayerEl variable/element.
// resetBtn.addEventListener('click', function(e) {
//   e.preventDefault();
  
//   // wipes the dynamically created elements before.
//   displayerEl.innerHTML = "";

// }) 