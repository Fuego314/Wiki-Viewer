$(document).ready(function() {
  'use strict';

  let click = 0;

  // Bring in each wiki entry with fade and delay
  function bringIn(i) {
    setTimeout(() =>{
      $(`#topic${i}`).removeClass('hidden').addClass('fade-up-entries');
    }, 700 * i);
  }

  // Remove old wiki entries
	function removeOld() { $('.entries').remove(); }

  function success(data) {
    removeOld();
    // Add animation classes
    $('#top').addClass('top-lg');
    $('#wiki-logo').addClass('img-lg');
    $('#main-head').addClass('h1-lg');
    $('.h1-cap').addClass('h1-span-lg');
    $('#wiki-search').addClass('search-bar-lg');
    $('.results-holder').addClass('results-holder-lg');
    $('#results').addClass('results-lg');
    // Loop through JSON info from Wiki API
    setTimeout(() => {
      for(let i = 0; i < data[1].length; i++) {
        // Add data from API to 'results' div and give hidden class
        $('#results').append(`<div id='topic${i}' class='hidden entries'> <a href='${data[3][i]}' target='_blank'> <h2>${data[1][i]}</h2> <p>${data[2][i]}</p> </a></div>`);
        // Remove hidden class and add animations with delay between each
        bringIn(i);
      }
    }, 320);
  }

  // Enter pressed on search box calls search button click
  $('#wiki-search').keyup((e) => {
    if(e.which === 13){
      $('#search-btn').click();
    }
  });

  // On search button click add animations and get Wiki API data
  $('#search-btn').click(() => {
    // Save what user searches for
    let searchFor = $('#wiki-search').val();

    // Check input feild has text
    if(searchFor.length !== 0) {

      let url = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=${searchFor}&limit=10`;
      // Get data from Wiki API
      $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        success: (data) => {
          success(data);
        },
        error: (jqXHR,textStatus,errorThrown) => {
          $('#results').append(`<div id='topic0' class='hidden entries'><h2>There was an error connecting to wikipedia</h2><p>${errorThrown}</p></div>`);
        }
      });

    } else {
      const tryThis = ['list of common misconceptions', 'list of Kim Jong-il\'s titles', 'witch window', 'toast sandwich', 'the Matrix defense', 'fan death', 'Dusty the Klepto Kitty', 'Cigarettes and Valentines', 'McDonald\'s urban legends'];
      let rndmNum = Math.floor(Math.random() * ((tryThis.length - 1) - 0 + 1)) + 0;

      // Add search info and suggested search
      setTimeout(function(){
        $('.no-input').append(`<p>Type something and hit search</p><p>Try ${tryThis[rndmNum]} </p>`).removeClass('hidden');
      }, 350);
    }

    // Hide search info and suggested search if there
    if(searchFor.length === 0) {
      if(click > 0) {
        $('.no-input').addClass('hidden');
        $('#top').addClass('info-height');
        setTimeout(() => {
          $('.no-input').empty();
        }, 300);
      }
    } else {
      $('#top').removeClass('info-height');
      $('.no-input').addClass('hidden');
      setTimeout(() => {
        $('.no-input').css('height', '0');
      }, 300);
    }
    click++;
  });
});
