(function ($) {
	'use strict'

	$(document).ready(function(){

		var clientID = "SEH1OX4WQ5WXNFR3DWU25JGWMVZQPJ0GMLV1VMWRFBMHVCNO";
		var clientSecret = "SDBRIGEDRPC3XG2VQ4ZASGTX5G0QCCFJLEF4ARL5H5S2AJAS";
		var location = "Beirut, LB";
		var resultsLimit = 50;
		var urlAPI = "https://api.foursquare.com/v2/venues/search?";
		var map;

		mapInit();

		$("#userSubmit").on("click", function(event) {
			event.preventDefault();
			$("#noResult").html("");
			fourSquareAPI(userSearch());
		});

		//Initialize Beirut Map

		function mapInit() {

		 	map = L.map('map').setView([33.8869, 35.5131], 13);	

			L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    		maxZoom: 18,
    		id: 'yazane.nmm78g7o',
    		accessToken: 'pk.eyJ1IjoieWF6YW5lIiwiYSI6IjM1Y2E1NGJjZWQ3ZmVmOWRjYzAxODdjYzA3ZjdmNWU2In0.NkpjIbCDddYfY0Ddvdy_9A'
			}).addTo(map);	
		}

		//Retrieve User Query

		function userSearch(){

				var query = $("#userQuery").val();
				$("#userQuery").val("");
				return query;
			}

		//Search the FourSquare API for User Query and Display Results on Map	

		function fourSquareAPI(query) {
	
			var results = $.ajax({
			url: "https://api.foursquare.com/v2/venues/search?query=" + query + "&near=" + location + "&client_id=" + clientID + "&client_secret=" + clientSecret + "&v=20151010" + "&intent=browse" + "&limit=" + resultsLimit,
			dataType: "jsonp",
			type: "GET"
			}).done(function(results){

			if(results.response.venues.length === 0) {
				$("#noResult").html("Sorry, no results correspond to this query.");
			}	

			else {

				$.each(results.response.venues, function(i, venue) {

					var latitude = parseFloat(venue.location.lat);
					var longitude = parseFloat(venue.location.lng);
					L.marker([latitude, longitude]).addTo(map).bindPopup("<b>" + venue.name + "</b>").openPopup();
				})
			}

			})
			
			.fail(function(){console.log("Failed!");});
		}

	})

}(jQuery)) 