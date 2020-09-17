initMap = () => {
	MAP = new google.maps.Map(document.getElementById('map'), {
		center: { // philippines
			lat: 50,
			lng: 6
				// lat: 10,
				// lng: 121
		},
		zoom: 6,
		disableDefaultUI: true,
		zoomControl: true,
		gestureHandling: 'greedy',
		styles: MapStyle
	});
	MAP.data.loadGeoJson('data/Franken.geo.json');
	MAP.data.loadGeoJson('data/Westfalen.geo.json');
	MAP.data.loadGeoJson('data/Bajuwarien.geo.json');
	MAP.data.loadGeoJson('data/Flandern.geo.json');
	MAP.data.loadGeoJson('data/Katalonien.geo.json');
	MAP.data.loadGeoJson('data/Schwaben.geo.json');
	MAP.data.loadGeoJson('data/Basque.geo.json');
	// MAP.data.loadGeoJson('data/NLD.geo.json');

	// MAP.data.setStyle({
	//   fillColor: 'lime',
	//   strokeWeight: 0.1
	// });
	MAP.data.setStyle(function(feature) {
      return /** @type {google.maps.Data.StyleOptions} */({
        fillColor: COLORS[feature.getProperty('NAME')],
        strokeWeight: 0.1
      });
    });	
	// for (var city in BOAT.cities) {
	// 	if (!BOAT.cities[city].destinations)
	// 		BOAT.cities[city].destinations = [];
	// 	for (var pier in BOAT.cities[city].piers) {
	// 		if(BOAT.cities[city].piers[pier].destinations)
	// 			for(var i=0; i<BOAT.cities[city].piers[pier].destinations.length;i++)
	// 		if(!BOAT.cities[city].destinations.includes)
	// 		BOAT.cities[city].destinations.push
	// 	}
	// }
	// HASH = new Hash();
	// PORTS = new Ports(MAP);
	// TIMES = new Times();
}



// sendMail = (operator, time) => {
// 	// alert(operator + time);
// 	var A = PORTS.ports[PORTS.A].city;
// 	var B = PORTS.ports[PORTS.B].city;
// 	document.location = `mailto:book@roam.asia?subject=boat&body=Dear roam.asia,%0A%0AI'd like to book a ferry %0A%0Afrom ${A} to ${B} %0A%0Awith ${operator} %0Aat ${time}`;
// }



// fetch('style/map.dark.json')
// .then((response) => response.json())
// .then((mapStyle) => {
// IFRAME = document.querySelector('iframe');
// IFRAME.hidden = true;

// MARKER = new Marker(MAP);
// });


// showFrame = (url) => {
//   IFRAME.hidden = false;
//   IFRAME.setAttribute('src', url);
// }
// hideFrame = () => {
//   IFRAME.hidden = true;
// }