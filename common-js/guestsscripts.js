

(function ($) {
	"use strict";

	// Your web app's Firebase configuration
	var firebaseConfig = {
		apiKey: "AIzaSyBfd6NqIwwnZr114tIGeVIRYub_C8wNWeU",
		authDomain: "nikhilwedspooja-1219b.firebaseapp.com",
		databaseURL: "https://nikhilwedspooja-1219b.firebaseio.com/",
		projectId: "nikhilwedspooja-1219b",
		storageBucket: "",
		messagingSenderId: "137282612337",
		appId: "1:137282612337:web:c192b4ce0ff4191d"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	$('.guest-template').hide()
	firebase.database().ref('Guests').once('value').then(function (snapshot) {
		var arr = snapshotToArray(snapshot)
		console.log(arr)
		arr.forEach(item => {
			var guest = $('.guest-template').clone()
			$('#fname', guest)[0].innerHTML = item.fname
			$('#lname', guest)[0].innerHTML = item.lname
			$('#email', guest)[0].innerHTML = item.email
			$('#plusone', guest)[0].innerHTML = item.plusone ? "Yes" : "No"
			$(guest).removeClass('guest-template')
			$(guest).show()
			$('.guest-list').append(guest)
		})
	});
})(jQuery);

function snapshotToArray(snapshot) {
	var returnArr = [];

	snapshot.forEach(function (childSnapshot) {
		var item = childSnapshot.val();
		item.key = childSnapshot.key;

		returnArr.push(item);
	});

	return returnArr;
};

function countdownTime() {

	if (isExists('#clock')) {
		$('#clock').countdown('2018/01/01', function (event) {
			var $this = $(this).html(event.strftime(''
				+ '<div class="time-sec"><span class="title">%D</span> days </div>'
				+ '<div class="time-sec"><span class="title">%H</span> hours </div>'
				+ '<div class="time-sec"><span class="title">%M</span> minutes </div>'
				+ '<div class="time-sec"><span class="title">%S</span> seconds </div>'));
		});
	}
}
function dropdownMenu(winWidth) {

	if (winWidth > 767) {

		$('.main-menu li.drop-down').on('mouseover', function () {
			var $this = $(this),
				menuAnchor = $this.children('a');

			menuAnchor.addClass('mouseover');

		}).on('mouseleave', function () {
			var $this = $(this),
				menuAnchor = $this.children('a');

			menuAnchor.removeClass('mouseover');
		});

	} else {

		$('.main-menu li.drop-down > a').on('click', function () {

			if ($(this).attr('href') == '#') return false;
			if ($(this).hasClass('mouseover')) { $(this).removeClass('mouseover'); }
			else { $(this).addClass('mouseover'); }
			return false;
		});
	}

}

function isExists(elem) {
	if ($(elem).length > 0) {
		return true;
	}
	return false;
}

function initMap() {

	// Create a new StyledMapType object, passing it an array of styles,
	// and the name to be displayed on the map type control.
	var styledMapType = new google.maps.StyledMapType(
		[
			{
				"featureType": "administrative",
				"elementType": "all",
				"stylers": [
					{
						"saturation": "-100"
					}
				]
			},
			{
				"featureType": "administrative.province",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "landscape",
				"elementType": "all",
				"stylers": [
					{
						"saturation": -100
					},
					{
						"lightness": 65
					},
					{
						"visibility": "on"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "all",
				"stylers": [
					{
						"saturation": -100
					},
					{
						"lightness": "50"
					},
					{
						"visibility": "simplified"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "all",
				"stylers": [
					{
						"saturation": "-100"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "simplified"
					}
				]
			},
			{
				"featureType": "road.arterial",
				"elementType": "all",
				"stylers": [
					{
						"lightness": "30"
					}
				]
			},
			{
				"featureType": "road.local",
				"elementType": "all",
				"stylers": [
					{
						"lightness": "40"
					}
				]
			},
			{
				"featureType": "transit",
				"elementType": "all",
				"stylers": [
					{
						"saturation": -100
					},
					{
						"visibility": "simplified"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [
					{
						"hue": "#ffff00"
					},
					{
						"lightness": -25
					},
					{
						"saturation": -97
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "labels",
				"stylers": [
					{
						"lightness": -25
					},
					{
						"saturation": -100
					}
				]
			}
		],
		{ name: 'Styled Map' });

	// Create a map object, and include the MapTypeId to add
	// to the map type control.

	var uluru = { lat: 56.946285, lng: 24.105078 };
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: uluru
	});

	var image = 'images/google-marker.png';
	var marker = new google.maps.Marker({
		position: uluru,
		map: map,
		icon: image
	});
	//Associate the styled map with the MapTypeId and set it to display.
	map.mapTypes.set('styled_map', styledMapType);
	map.setMapTypeId('styled_map');
}