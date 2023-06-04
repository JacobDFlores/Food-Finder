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

// variable to select the google map container
var googleMap = document.getElementById('map');


// event listener for the serch button to then do everithing.
// it has a event preventDefault so the elements stays and dont refresh the website.
searchBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    //Show google map
    googleMap.style.display = "";

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

  //hide google map
  googleMap.style.display = "none";

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
    containerFinal.setAttribute('class', 'container2' );

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