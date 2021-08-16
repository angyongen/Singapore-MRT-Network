
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
    if (typeof startUpdate !== 'undefined') startUpdate(timingCallback);
    setInterval (recomputeTimings,1000)
}
var rawDates = {}
function timingCallback(data) {
    for (var key in data) {
        var target = key.split(">")[1];
        var arrow = arrowLookup[target];
        var arrowKey = key.replace(">"+target, "."+arrow)
        var origin = key.replace(">"+target, "")
        if (wrapper) {wrapper.put(origin, target, data[key].join(","))}

        rawDates[".text." + arrowKey] = new Date(data[key]);
    }
}
function recomputeTimings() {
    for (dateSel in rawDates) {
        var element = document.querySelector(dateSel);
        if (element) {
            var nowDate = new Date();
            var targetDate = rawDates[dateSel][0];
            element.textContent = Math.round((targetDate.getTime() - nowDate.getTime())/1000/60) + " min"
        }
    }
}