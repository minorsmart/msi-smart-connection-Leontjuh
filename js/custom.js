$(function () {
  $('a[href*=#]:not([href=#])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
fetch('https://api.covid19api.com/summary')// ophalen covid gegevens vanuit de api interface van de website

  .then(function (resp) { return resp.json() }) // Convert data to json

  .then(function (data) { //Gebruik de functie op de api interface om data op te halen

    console.log(data); //print de gehele data in de console

    console.log(data.Countries[122].Country);//print het land in de console

    console.log(data.Countries[122].TotalDeaths);// print het aantal doden in de console

    // Schrijf de geselecteerde data van de struct (samengesteld datatype) naar het element (bijvoorbeeld een div)
    document.getElementById("land").innerHTML = (data.Countries[122].Country); 
    document.getElementById("datum").innerHTML = (data.Countries[122].Date);
    document.getElementById("nieuweBesmettingen").innerHTML = (data.Countries[122].NewConfirmed);
    document.getElementById("nieuweDoden").innerHTML = (data.Countries[122].NewDeaths);
    document.getElementById("totaleBesmettingen").innerHTML = (data.Countries[122].TotalConfirmed);
    document.getElementById("totaleDoden").innerHTML = (data.Countries[122].TotalDeaths);
  })

  .catch(function () { // catch any errors

  });

jQuery(document).ready(function ($) {
  var $timeline_block = $('.cd-timeline-block');

  //hide timeline blocks which are outside the viewport
  $timeline_block.each(function () {
    if ($(this).offset().top > $(window).scrollTop() + $(window).height() * 0.75) {
      $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
    }
  });

  //on scolling, show/animate timeline blocks when enter the viewport
  $(window).on('scroll', function () {
    $timeline_block.each(function () {
      if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * 0.75 && $(this).find('.cd-timeline-img').hasClass('is-hidden')) {
        $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
      }
    });
  });
});

$(".navbar-collapse").css({ maxHeight: $(window).height() - $(".navbar-header").height() + "px" });

function weatherBalloon( cityID ) {// ophalen weer gegevens
	var key = 'f5223a2eb79ba814e0f0cda148ff2755';
	fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&appid=' + key)  
	.then(function(resp) { return resp.json() }) // Convert data to json
	.then(function(data) {
		drawWeather(data); // Call drawWeather
	})
	.catch(function() {
		// catch any errors
	});
}

function drawWeather( d ) {
	var celcius = Math.round(parseFloat(d.main.temp)-273.15);
	var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
	
	document.getElementById('description').innerHTML = d.weather[0].description;
	document.getElementById('temp').innerHTML = celcius + '&deg;';
	document.getElementById('location').innerHTML = d.name;
}

window.onload = function() {
  weatherBalloon( 2750053 );
}
