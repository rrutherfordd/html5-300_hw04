/*global $*/

$(document).ready(function () {
  //jQuery loaded?
  'use strict';
  //alert("Assignment 4");
});

/* Helper functions */

/* http://stackoverflow.com/questions/4813219/testing-if-a-checkbox-is-checked-with-jquery */
$.fn.realVal = function () {
  'use strict';
  var $obj = $(this), val = $obj.val(), type = $obj.attr('type'), un_val = $obj.attr('data-unchecked');
  if (type && type === 'checkbox') {
    if (typeof un_val === 'undefined') {
      un_val = '';
      return $obj.prop('checked') ? val : un_val;
    }
  } else {
    return val;
  }
};
/* http://stackoverflow.com/questions/4813219/testing-if-a-checkbox-is-checked-with-jquery */

/* Variables */

var map, maxZoomService, infoWindow, locationSelection, newLatLng;

/* Main functions */

/** https://developers.google.com/maps/documentation/javascript/maxzoom **/
function showMaxZoom(e) {
  'use strict';
  maxZoomService.getMaxZoomAtLatLng(e.latLng, function (response) {
    if (response.status !== 'OK') {
      infoWindow.setContent('Error in MaxZoomService');
    } else {
      infoWindow.setContent(
        'The maximum zoom at this location is: ' + response.zoom
      );
    }
    infoWindow.setPosition(e.latLng);
    infoWindow.open(map);
  });
}
/** https://developers.google.com/maps/documentation/javascript/maxzoom **/

function initMap() {
  'use strict';
  // Create a map object and specify the DOM element for display.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.606209, lng: -122.332017},
    scrollwheel: false,
    zoom: 8
  });
  infoWindow = new google.maps.InfoWindow();
  maxZoomService = new google.maps.MaxZoomService();
  map.addListener('click', showMaxZoom);
}

function rangeChanged() {
  'use strict';
  /* window.alert('Range changed'); */
  window.console.log($('#rangeInput').val());
  map.setZoom(parseInt($('#rangeInput').val(), 10));
}

/*
  Seattle lat: 47.606209, lng: -122.332017
  Baltra lat:-0.448724, lng: -90.268494
  Paris lat: 48.856482, lng: 2.351333
  Sondestrom lat:67.198192, lng: -50.968233
  Tokyo lat:35.726854, lng:139.725493
*/
function selectChosen() {
  'use strict';
  /* window.alert('Select chosen'); */
  window.console.log($('#selectInput').val());
  locationSelection = $('#selectInput').val();
  if (locationSelection === 'seattle') {
    newLatLng = new google.maps.LatLng(47.606209, -122.332017);
    map.setCenter(newLatLng);
  } else if (locationSelection === 'baltra') {
    newLatLng = new google.maps.LatLng(-0.448724, -90.268494);
    map.setCenter(newLatLng);
  } else if (locationSelection === 'paris') {
    newLatLng = new google.maps.LatLng(48.856482, 2.351333);
    map.setCenter(newLatLng);
  } else if (locationSelection === 'sondrestrom') {
    newLatLng = new google.maps.LatLng(67.198192, -50.968233);
    map.setCenter(newLatLng);
  } else if (locationSelection === 'tokyo') {
    newLatLng = new google.maps.LatLng(35.726854, 139.725493);
    map.setCenter(newLatLng);
  } else if (locationSelection === 'random') {
    newLatLng = new google.maps.LatLng(-90 + (180 * Math.random()), -180 + (360 * Math.random()));
    map.setCenter(newLatLng);
  } else {
    newLatLng = new google.maps.LatLng(47.606209, -122.332017);
    map.setCenter(newLatLng);
  }
}

/* Event listeners */

$('#rangeInput').on('change', rangeChanged);

$('#selectInput').on('change', selectChosen);