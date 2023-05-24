var requestUrl = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=8ffa1475f3e5455893f1c20a6be73c5d';

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });