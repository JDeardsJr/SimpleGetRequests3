'use strict';

function getDogImage(newUrlLink) {
  fetch(newUrlLink).then(function(response) {
      if (!response.ok) {
        throw error();
      } else {
        return response.json();
      }
    })
    .then(responseJson => 
      displayResults(responseJson))
    .catch(err => alert('We are currently unable to locate this breed. Try again!'));
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('.results-img').replaceWith(
      `<img src="${responseJson.message}" class="results-img" alt="This is a picture of an awesome dog">`
    )
    $('.results').removeClass('hidden');
  }

function determineNewUrl(newBreedInput) {
    const frontUrlLink = "https://dog.ceo/api/breed/";
    const backUrlLink = "/images/random";
    let newUrlLink = frontUrlLink + newBreedInput + backUrlLink;
    getDogImage(newUrlLink);
}

function convertSubmissionText() {
  const breedInput = $('#dog-breed').val();
  const newBreedInput = breedInput.split(' ').join('').toLowerCase();
  determineNewUrl(newBreedInput);
}

function watchForm() {
    $('form').submit(event => {
    event.preventDefault();
    convertSubmissionText();
  });
}

$(function() {
    console.log('App loaded! Waiting for submit!');
    watchForm();
});