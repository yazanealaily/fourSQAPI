(function ($) {
	'use strict'

	$(document).ready(function(){

		var clientID = "SEH1OX4WQ5WXNFR3DWU25JGWMVZQPJ0GMLV1VMWRFBMHVCNO";
		var clientSecret = "SDBRIGEDRPC3XG2VQ4ZASGTX5G0QCCFJLEF4ARL5H5S2AJAS";
		var location = "Beirut, LB";
		var resultsLimit = 50;
		var urlAPI = "https://api.foursquare.com/v2/venues/search?";

		$("#userSubmit").on("click", function(event) {
			event.preventDefault();
			fourSquareAPI(userSearch());
		});

			

		function userSearch(){

				var query = $("#userQuery").val();
				return query;

			};

		function fourSquareAPI(query) {
	
			var results = $.ajax({
			url: "https://api.foursquare.com/v2/venues/search?query=" + query + "&near=" + location + "&client_id=" + clientID + "&client_secret=" + clientSecret + "&v=20151010" + "&intent=browse" + "&limit=" + resultsLimit,
			dataType: "jsonp",
			type: "GET"
			})
		}

	})

}(jQuery)) 