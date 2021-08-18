function createHandler(station) {
	return function(e) {
		scrollToStationCode(station)
		e.stopPropagation();
	}
}

window.addEventListener("load", function() {
	var attachedElements = [];
	for (stations of simpleStationsList) {
		for (station of stations) {
			var elements = document.getElementsByClassName(station);
			for (element of elements) {
				if (!attachedElements.includes(element)) {
					attachedElements.push(element)
					element.addEventListener("click", createHandler(station))
				}
			}
		}
	}
})