
function recorder1() {
	this.data = {};
	this.put = function (origin, target, data) {
		if (!this.data[origin]) this.data[origin] = {};
		this.data[origin][target] = data.split(",");
	}
}
if (typeof wrapper === 'undefined') wrapper = new recorder1();

var arrowLookup = {
	"NS1":"a2", "NS28":"a1",
	"EW33": "a2", "EW1": "a1",
	"TE1": "a1", "TE3": "a2",
	"CC1": "a1", "CC29": "a2",
	"NE1": "a1", "NE17": "a2",
	"DT1": "a2", "DT35": "a1",
	"CG2": "a2", "CG": "a1",
}
window.onload = function () {
    var timingScript = document.createElement("script");
    timingScript.src = "timing.js"
    timingScript.onload = function() {
        startUpdate(function (data) {
            for (var key in data) {
                var target = key.split(">")[1];
                var arrow = arrowLookup[target];
                var arrowKey = key.replace(">"+target, "."+arrow)
                var origin = key.replace(">"+target, "")
                if (wrapper) {wrapper.put(origin, target, data[key].join(","))}

                var element = document.querySelector(".text." + arrowKey);
                if (element) {
                    element.textContent = Math.round(data[key][0]) + " min"
                }
            }
        })
	}
    document.head.appendChild(timingScript)
}