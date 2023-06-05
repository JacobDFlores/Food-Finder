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

// variable for bottom clear button
var btmResetBtn = document.getElementById("btmClear");

// variable to select the google map container
var googleMap = document.getElementById('map');

// variable for footer
var footerEl = document.getElementById('footerStarter');

// variable to store the favorite items.
var favoriteFoods = [];

//
var favDisplayer = document.querySelector('.favorites-list');

// get items from the local storage
var favoriteList = localStorage.getItem('Favorite Items: ');
favDisplayer.innerHTML = favoriteList;

// event listener for the serch button to then do everithing.
// it has a event preventDefault so the elements stays and dont refresh the website.
searchBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    //Show google map
    googleMap.style.display = "";
    //remove fixed footer
    footerEl.classList.remove("footerStarter");
    //Show bottom clear search button
    btmResetBtn.style.display = "";

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
  displayerElTwo.innerHTML = '';


  //hide google map
  googleMap.style.display = "none";
  //make footer fixed
  footerEl.classList.add('footerStarter');
  //hide the second clear button
  btmResetBtn.style.display = "none";

});

btmResetBtn.addEventListener('click', function() {
  document.querySelector('#text-inp').value = '';
  displayerEl.innerHTML = '';
  displayerElTwo.innerHTML = '';

  //hide google map
  googleMap.style.display = "none";
  //make footer fixed
  footerEl.classList.add('footerStarter');
  //hide the second clear button
  btmResetBtn.style.display = "none";

});


// selector for where the images and recipe names displays.
var displayerEl = document.querySelector('.column1');
var displayerElTwo = document.querySelector('.column2');


///////////////////////////////////////////////////////////////////////////////////////////
// function to search for recipes.
function checkRecipes(data, userResult) {
  // sets the display div to empty(no content)
  displayerEl.innerHTML = "";
  displayerElTwo.innerHTML = "";

  // stores the array of 10 results to the array var {totalData}.
  totalData = data.results;
  // for loop to dynamically create the <img> and names of the recipes to the 
  // div container (you can change it to whatever html section/div) look UP to displayerEl variable:)
  for (var i = 0; i < totalData.length; i++){
    let img = document.createElement('img');
    // sets the image src to the corresponding recipe
    img.src = data.results[i].image;
    let container = document.createElement('h3');
    container.setAttribute('class', 'title' + i);
    
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
    let imgContainer = document.createElement('div');

    imgContainer.appendChild(img);
    imgContainer.setAttribute('class', 'imgContainer');
    infoPlacer.appendChild(imgContainer);
    infoPlacer.appendChild(container);
    infoPlacer.setAttribute('class', 'info-placer');
  
   // create a button element to display the recipes details.
   let showInfo = document.createElement('button');
   showInfo.setAttribute('class', 'show-button' + i);
   showInfo.innerHTML = '<i class="fa-solid fa-book-open"></i> <p>More Info</p>';
   //

   // create a button element to display the recipes details.
   let showFavorite = document.createElement('button');
   showFavorite.setAttribute('class', 'fav-button' + i);
   showFavorite.innerHTML = '<i class="fa-regular fa-star"></i> <p>Favorite</p>';
   //

   ///////////////////////////////////////////////////////////////////////////
  

   //

   let minorRow = document.createElement("div");
   minorRow.setAttribute('class', 'minorRow');

    // appends the preview elements to the final container.
    minorRow.appendChild(infoPlacer);
    minorRow.appendChild(showInfo);

    containerFinal.appendChild(minorRow);
    containerFinal.appendChild(containerArticle);
    containerFinal.appendChild(showFavorite);
    
    
    // appends the final element to the final div wich is the .recipe class.
    if (i % 2 == 1){
      displayerEl.appendChild(containerFinal);
    }
    else{
      displayerElTwo.appendChild(containerFinal);
    }
    
  }
}

displayerEl.addEventListener('click', function(e) {
  e.preventDefault();
  e.stopPropagation();

  //Gets a property of the element
  var selection = e.target;

  var info1 = document.querySelector('.recipe-details1');
  var info3 = document.querySelector('.recipe-details3');
  var info5 = document.querySelector('.recipe-details5');
  var info7 = document.querySelector('.recipe-details7');
  var info9 = document.querySelector('.recipe-details9');

  var fav1 = document.querySelector('.fav-button1');
  var fav3 = document.querySelector('.fav-button3');
  var fav5 = document.querySelector('.fav-button5');
  var fav7 = document.querySelector('.fav-button7');
  var fav9 = document.querySelector('.fav-button9');
  
  if (selection.matches('.show-button1')) {
    if (info1.style.display == 'none') {
      info1.style.display = 'block';
    } 
    else {
      info1.style.display = 'none';
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
  
  if (selection.matches('.show-button5')) {
    if (info5.style.display == 'none') {
      info5.style.display = 'block';
    } 
    else {
      info5.style.display = 'none';
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
  
  if (selection.matches('.show-button9')) {
    if (info9.style.display == 'none') {
      info9.style.display = 'block';
    } 
    else {
      info9.style.display = 'none';
    }
    ////////////////////////////////
  }

  if (selection.matches('.fav-button1')) {
    if (fav1.innerHTML == '<i class="fa-regular fa-star"></i> <p>Favorite</p>') {
      fav1.innerHTML = '<i class="fa-solid fa-star"></i> <p>Favorites</p>';
      var t1 = document.querySelector('.title1');
      favoriteFoods[1] = t1.innerHTML;
      localStorage.setItem('Favorite Items: ', favoriteFoods);

      favDisplayer.innerHTML += '<li>' + favoriteFoods[1] + '</li>';
    } 
    else if (fav1.innerHTML == '<i class="fa-solid fa-star"></i> <p>Favorites</p>') {
      fav1.innerHTML = '<i class="fa-regular fa-star"></i> <p>Favorite</p>';
      favoriteFoods[1] = "";
      localStorage.setItem('Favorite Items: ', favoriteFoods);

      favDisplayer.innerHTML -= favoriteFoods[1];
    }
    ////////////////////////////////
  }

  if (selection.matches('.fav-button3')) {
    if (fav3.innerHTML == '<i class="fa-regular fa-star"></i> <p>Favorite</p>') {
      fav3.innerHTML = '<i class="fa-solid fa-star"></i> <p>Favorites</p>';
      var t3 = document.querySelector('.title3');
      favoriteFoods[3] = t3.innerHTML;
      localStorage.setItem('Favorite Items: ', favoriteFoods);
    } 
    else if (fav3.innerHTML == '<i class="fa-solid fa-star"></i> <p>Favorites</p>') {
      fav3.innerHTML = '<i class="fa-regular fa-star"></i> <p>Favorite</p>';
      favoriteFoods[3] = "";
      localStorage.setItem('Favorite Items: ', favoriteFoods);
    }
    ////////////////////////////////
  }

  if (selection.matches('.fav-button5')) {
    if (fav5.innerHTML == '<i class="fa-regular fa-star"></i> <p>Favorite</p>') {
      fav5.innerHTML = '<i class="fa-solid fa-star"></i> <p>Favorites</p>';
      var t5 = document.querySelector('.title5');
      favoriteFoods[5] = t5.innerHTML;
      localStorage.setItem('Favorite Items: ', favoriteFoods);
    } 
    else if (fav5.innerHTML == '<i class="fa-solid fa-star"></i> <p>Favorites</p>') {
      fav5.innerHTML = '<i class="fa-regular fa-star"></i> <p>Favorite</p>';
      favoriteFoods[5] = "";
      localStorage.setItem('Favorite Items: ', favoriteFoods);
    }
    ////////////////////////////////
  }

  if (selection.matches('.fav-button7')) {
    if (fav7.innerHTML == '<i class="fa-regular fa-star"></i> <p>Favorite</p>') {
      fav7.innerHTML = '<i class="fa-solid fa-star"></i> <p>Favorites</p>';
      var t7 = document.querySelector('.title7');
      favoriteFoods[7] = t7.innerHTML;
      localStorage.setItem('Favorite Items: ', favoriteFoods);
    } 
    else if (fav7.innerHTML == '<i class="fa-solid fa-star"></i> <p>Favorites</p>') {
      fav7.innerHTML = '<i class="fa-regular fa-star"></i> <p>Favorite</p>';
      favoriteFoods[7] = "";
      localStorage.setItem('Favorite Items: ', favoriteFoods);
    }
    ////////////////////////////////
  }

  if (selection.matches('.fav-button9')) {
    if (fav9.innerHTML == '<i class="fa-regular fa-star"></i> <p>Favorite</p>') {
      fav9.innerHTML = '<i class="fa-solid fa-star"></i> <p>Favorites</p>';
      var t9 = document.querySelector('.title9');
      favoriteFoods[9] = t9.innerHTML;
      localStorage.setItem('Favorite Items: ', favoriteFoods);
    } 
    else if (fav9.innerHTML == '<i class="fa-solid fa-star"></i> <p>Favorites</p>') {
      fav9.innerHTML = '<i class="fa-regular fa-star"></i> <p>Favorite</p>';
      favoriteFoods[9] = "";
      localStorage.setItem('Favorite Items: ', favoriteFoods);
    }
    ////////////////////////////////
  }
  
 })

 displayerElTwo.addEventListener('click', function(e) {
  e.preventDefault();
  e.stopPropagation();

  //Gets a property of the element
  var selection = e.target;

  var info0 = document.querySelector('.recipe-details0');
  var info2 = document.querySelector('.recipe-details2');
  var info4 = document.querySelector('.recipe-details4');
  var info6 = document.querySelector('.recipe-details6');
  var info8 = document.querySelector('.recipe-details8');

  var fav0 = document.querySelector('.fav-button0');
  var fav2 = document.querySelector('.fav-button2');
  var fav4 = document.querySelector('.fav-button4');
  var fav6 = document.querySelector('.fav-button6');
  var fav8 = document.querySelector('.fav-button8');

  if (selection.matches('.show-button0')) {
    if (info0.style.display == 'none') {
      info0.style.display = 'block';
    } 
    else {
      info0.style.display = 'none';
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
  
  if (selection.matches('.show-button4')) {
    if (info4.style.display == 'none') {
      info4.style.display = 'block';
    } 
    else {
      info4.style.display = 'none';
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
  
  if (selection.matches('.show-button8')) {
    if (info8.style.display == 'none') {
      info8.style.display = 'block';
    } 
    else {
      info8.style.display = 'none';
    }
    ////////////////////////////////
  }

  if (selection.matches('.fav-button0')) {
    if (fav0.innerHTML == '<i class="fa-regular fa-star"></i> <p>Favorite</p>') {
      fav0.innerHTML = '<i class="fa-solid fa-star"></i> <p>Favorites</p>';
      var t0 = document.querySelector('.title0');
      favoriteFoods[0] = t0.innerHTML;
      localStorage.setItem('Favorite Items: ', favoriteFoods);
    } 
    else if (fav0.innerHTML == '<i class="fa-solid fa-star"></i> <p>Favorites</p>') {
      fav0.innerHTML = '<i class="fa-regular fa-star"></i> <p>Favorite</p>';
      favoriteFoods[0] = "";
      localStorage.setItem('Favorite Items: ', favoriteFoods);
    }
    ////////////////////////////////
  }

  if (selection.matches('.fav-button2')) {
    if (fav2.innerHTML == '<i class="fa-regular fa-star"></i> <p>Favorite</p>') {
      fav2.innerHTML = '<i class="fa-solid fa-star"></i> <p>Favorites</p>';
      var t2 = document.querySelector('.title2');
      favoriteFoods[2] = t2.innerHTML;
      localStorage.setItem('Favorite Items: ', favoriteFoods);
    } 
    else if (fav2.innerHTML == '<i class="fa-solid fa-star"></i> <p>Favorites</p>') {
      fav2.innerHTML = '<i class="fa-regular fa-star"></i> <p>Favorite</p>';
      favoriteFoods[2] = "";
      localStorage.setItem('Favorite Items: ', favoriteFoods);
    }
    ////////////////////////////////
  }

  if (selection.matches('.fav-button4')) {
    if (fav4.innerHTML == '<i class="fa-regular fa-star"></i> <p>Favorite</p>') {
      fav4.innerHTML = '<i class="fa-solid fa-star"></i> <p>Favorites</p>';
      var t4 = document.querySelector('.title4');
      favoriteFoods[4] = t4.innerHTML;
      localStorage.setItem('Favorite Items: ', favoriteFoods);
    } 
    else if (fav4.innerHTML == '<i class="fa-solid fa-star"></i> <p>Favorites</p>') {
      fav4.innerHTML = '<i class="fa-regular fa-star"></i> <p>Favorite</p>';
      favoriteFoods[4] = "";
      localStorage.setItem('Favorite Items: ', favoriteFoods);
    }
    ////////////////////////////////
  }

  if (selection.matches('.fav-button6')) {
    if (fav6.innerHTML == '<i class="fa-regular fa-star"></i> <p>Favorite</p>') {
      fav6.innerHTML = '<i class="fa-solid fa-star"></i> <p>Favorites</p>';
      var t6 = document.querySelector('.title6');
      favoriteFoods[6] = t6.innerHTML;
      localStorage.setItem('Favorite Items: ', favoriteFoods);
    } 
    else if (fav6.innerHTML == '<i class="fa-solid fa-star"></i> <p>Favorites</p>') {
      fav6.innerHTML = '<i class="fa-regular fa-star"></i> <p>Favorite</p>';
      favoriteFoods[6] = "";
      localStorage.setItem('Favorite Items: ', favoriteFoods);
    }
    ////////////////////////////////
  }

  if (selection.matches('.fav-button8')) {
    if (fav8.innerHTML == '<i class="fa-regular fa-star"></i> <p>Favorite</p>') {
      fav8.innerHTML = '<i class="fa-solid fa-star"></i> <p>Favorites</p>';
      var t8 = document.querySelector('.title8');
      favoriteFoods[8] = t8.innerHTML;
      localStorage.setItem('Favorite Items: ', favoriteFoods);
    } 
    else if (fav8.innerHTML == '<i class="fa-solid fa-star"></i> <p>Favorites</p>') {
      fav8.innerHTML = '<i class="fa-regular fa-star"></i> <p>Favorite</p>';
      favoriteFoods[8] = "";
      localStorage.setItem('Favorite Items: ', favoriteFoods);
    }
    ////////////////////////////////
  }

 })



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



/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
////                                                              ///
////                Very Precious Code for the Google             ///
////                maps API, and its places library              ///
////                                                              ///
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
let map;
let service;
let infoWindow;

//Creating the map with San Antonio as its starting location
function initMap() {
  const sanAntonio = new google.maps.LatLng(29.425, -98.494);

  map = new google.maps.Map(document.getElementById("map"), {
    center: sanAntonio,  
    zoom: 12,
  });

  infoWindow = new google.maps.InfoWindow();

  //Make button for getting user location, and searching for markets at the same time.
  const locationButton = document.createElement("button");

  locationButton.textContent = "Search for Markets near You!";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("You are here.");
          infoWindow.open(map);
          map.setCenter(pos);

          const request = {
            location: pos,
            radius: '5000',
            keyword: ['groceries']
          };

          //this service is what lets us call specific methods for retrieving data
          service = new google.maps.places.PlacesService(map);
          service.nearbySearch(request, callback);
          //the nearby search will take our request and return the data in the callback function

        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });

}

//if browser doesnt have geolocation or permission denied, then this handles error.
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

//gets response from a call using the place service
//uses the data to create markers on the map
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

//creates markers based off the data from the nearby search
function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;

  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });

  //adds a listener to the marker for when its clicked
  google.maps.event.addListener(marker, "click", () => {

    //when the marker is clicked it creates a request object that contains the markers place id, and the fields of data
    //we want to retrieve
    const request = {
      placeId: place.place_id, 
      fields: ["name", "formatted_address", "place_id", "geometry", "formatted_phone_number", "url", "photos", "opening_hours"],
    };

    //the get details service takes our request and returns the data with the fields we specified in our request
    service.getDetails(request, (place, status) => {

      //this is creating our container for the information we are getting
      const content = document.createElement("div");

          //name of store
          const nameElement = document.createElement("h3");
          nameElement.textContent = place.name;
          content.appendChild(nameElement);

          //photo of store
          var photos = place.photos;
          if (photos){
            console.log(photos);
            const placePhotoEl = document.createElement("img");
            placePhotoEl.src = photos[0].getUrl({maxWidth: 300, maxHeight: 300});
            placePhotoEl.setAttribute("style", "margin-bottom:10px; border-bottom:solid black 2px; padding-bottom:15px;")
            content.appendChild(placePhotoEl);
          }

          var lineBreak = document.createElement("br");
          content.appendChild(lineBreak);

          //opeing and closing hours of store
          if (place.opening_hours){

            const dayHoursListEl = document.createElement("ul");
            content.appendChild(dayHoursListEl);
            
            const placeOpenHours = place.opening_hours.weekday_text;
            for (i = 0; i < placeOpenHours.length; i++){
              const dayHoursEl = document.createElement("li");
              dayHoursEl.innerHTML = placeOpenHours[i];
              dayHoursListEl.appendChild(dayHoursEl);
            }
          }

          lineBreak = document.createElement("br");
          content.appendChild(lineBreak);

          //store phone number
          const placePhoneNumEl = document.createElement("p");
          placePhoneNumEl.textContent = place.formatted_phone_number;
          content.appendChild(placePhoneNumEl);

          //store address
          const placeAddressElement = document.createElement("p");
          placeAddressElement.textContent = place.formatted_address;
          content.appendChild(placeAddressElement);

          lineBreak = document.createElement("br");
          content.appendChild(lineBreak);

          //a link to Googles homepage for the place clicked
          const placeUrlElement = document.createElement("a");
          placeUrlElement.innerHTML = "Link to Google maps homepage for this location";
          placeUrlElement.href = place.url;
          content.appendChild(placeUrlElement);

          //uses googles infowindow to display our collected information in our content container
          infoWindow.setContent(content);
          infoWindow.open(map, marker);
    });
  });
}

//I dont know what the f*** this does.
//Ive deleted this and it still works so i really dont know
window.initMap = initMap;