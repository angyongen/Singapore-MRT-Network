window.onload = function () {
	startUpdate(function (data) {
		for (var key in data) {
			var element = document.querySelector(".text." + key);
			if (element) {
				element.textContent = Math.round(data[key][0]) + " min"
			}
		}
	})
}