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

// variable to select the reset button
var resetBtn = document.querySelector('.clear-btn');



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

resetBtn.addEventListener('click', function() {
  document.querySelector('#text-inp').value = '';
  displayerEl.innerHTML = '';

});


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
    containerArticle.setAttribute('class', 'recipe-details' + i);

    // for loop to display the steps to make the recipe.
    for (var z = 0; z < (data.results[i].analyzedInstructions[0].steps).length; z++) {
      containerArticle.innerHTML += (z+1) + '. ' + data.results[i].analyzedInstructions[0].steps[z].step + '<br><br>';
    }
    

    // create a div element to store the recipe img and title.
    let infoPlacer = document.createElement('div');
    infoPlacer.appendChild(img);
    infoPlacer.appendChild(container);
    infoPlacer.setAttribute('class', 'info-placer');
  
   // create a button element to display the recipes details.
   let showInfo = document.createElement('button');
   showInfo.setAttribute('class', 'show-button' + i);
   showInfo.innerHTML = '<i class="fa-solid fa-book-open"></i> <p>More Info</p>';
   //

   //

   
   displayerEl.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    //Gets a property of the element
    var selection = e.target;

    var info0 = document.querySelector('.recipe-details0');
    var info1 = document.querySelector('.recipe-details1');
    var info2 = document.querySelector('.recipe-details2');
    var info3 = document.querySelector('.recipe-details3');
    var info4 = document.querySelector('.recipe-details4');
    var info5 = document.querySelector('.recipe-details5');
    var info6 = document.querySelector('.recipe-details6');
    var info7 = document.querySelector('.recipe-details7');
    var info8 = document.querySelector('.recipe-details8');
    var info9 = document.querySelector('.recipe-details9');
    
    if (selection.matches('.show-button0')) {
      if (info0.style.display == 'none') {
        info0.style.display = 'block';
      } 
      else {
        info0.style.display = 'none';
      }
      ////////////////////////////////
    }
    
    if (selection.matches('.show-button1')) {
      if (info1.style.display == 'none') {
        info1.style.display = 'block';
      } 
      else {
        info1.style.display = 'none';
      }
      ////////////////////////////////
    }
    
    if (selection.matches('.show-button2')) {
      if (info2.style.display == 'none') {
        info2.style.display = 'block';
      } 
      else {
        info2.style.display = 'none';
      }
      ////////////////////////////////
    }
    
    if (selection.matches('.show-button3')) {
      if (info3.style.display == 'none') {
        info3.style.display = 'block';
      } 
      else {
        info3.style.display = 'none';
      }
      ////////////////////////////////
    }
    
    if (selection.matches('.show-button4')) {
      if (info4.style.display == 'none') {
        info4.style.display = 'block';
      } 
      else {
        info4.style.display = 'none';
      }
      ////////////////////////////////
    }
    
    if (selection.matches('.show-button5')) {
      if (info5.style.display == 'none') {
        info5.style.display = 'block';
      } 
      else {
        info5.style.display = 'none';
      }
      ////////////////////////////////
    }
    
    if (selection.matches('.show-button6')) {
      if (info6.style.display == 'none') {
        info6.style.display = 'block';
      } 
      else {
        info6.style.display = 'none';
      }
      ////////////////////////////////
    }
    
    if (selection.matches('.show-button7')) {
      if (info7.style.display == 'none') {
        info7.style.display = 'block';
      } 
      else {
        info7.style.display = 'none';
      }
      ////////////////////////////////
    }
    
    if (selection.matches('.show-button8')) {
      if (info8.style.display == 'none') {
        info8.style.display = 'block';
      } 
      else {
        info8.style.display = 'none';
      }
      ////////////////////////////////
    }
    
    if (selection.matches('.show-button9')) {
      if (info9.style.display == 'none') {
        info9.style.display = 'block';
      } 
      else {
        info9.style.display = 'none';
      }
      ////////////////////////////////
    }
    

   })
   //

    // appends the preview elements to the final container.
    containerFinal.appendChild(infoPlacer);
    containerFinal.appendChild(containerArticle);
    containerFinal.appendChild(showInfo);
    
    
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