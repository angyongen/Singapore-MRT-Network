//mode:simple random
//todo: more complex mode
console.log("timing.js running")
function startUpdate(callback) {
	console.log("timing.js startUpdate")
	simpleStartUpdate(callback)
}





function simpleStartUpdate(callback) {
    callback(simpleGenerate());
	setInterval(function() {callback(simpleGenerate())}, 60000);
}
function simpleGenerate() {
	var data = {}
	for (stations of simpleStationsList) {
		var target1 = stations[0];
		var target2 = stations[stations.length-1]
		for (station of stations) {
			data[station+">"+target1] = [];
			var time = new Date();
			for (var i = 0; i < 5; i++) {
			    time.setSeconds ( time.getSeconds() + Math.random()*600 + 60 );
				data[station+">"+target1].push(time.toJSON());
			}
		}
		for (station of stations) {
			data[station+">"+target2] = [];
			var time = new Date();
			for (var i = 0; i < 5; i++) {
			    time.setSeconds ( time.getSeconds() + Math.random()*600 + 60 );
				data[station+">"+target2].push(time.toJSON());
			}
		}
	}
	return data;
}