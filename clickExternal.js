window.addEventListener("load", function() {
	for (stations of simpleStationsList) {
		for (station of stations) {
			var elements = document.getElementsByClassName(station);
			for (element of elements) {
				element.addEventListener("click", function(e) {
					scrollToStationCode(station)
					e.stopPropagation();
				})
			}
		}
	}
})