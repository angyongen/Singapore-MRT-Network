var isDragging = false;
var x; var y;
var bx = 0; var by = 0;
var map;
var mapTransformer;
let scale = 1;
var mapWidth = 2099;
var mapHeight = 1174.8;
function getMapInitialScale() {
  return Math.max(mapWidth/map.clientWidth, mapHeight/map.clientHeight);
}
function updateBounds() {
  console.log(bx)
  mapTransformer.setAttribute("transform", `translate(${bx}, ${by}) scale(${scale})`);
}
function pressDownHandler(e) {
  x = e.offsetX;
  y = e.offsetY;
  isDragging = true;
}
function moveHandler(e) {
  if ((e.buttons & 1) == 0) isDragging = false
  if (isDragging === true) {
    var dx = e.offsetX - x;
    var dy = e.offsetY - y;
    var mapScale = getMapInitialScale();
    bx += dx*mapScale;
    by += dy*mapScale;
    x = e.offsetX;
    y = e.offsetY;
    updateBounds()
  }
}
function pressUpHandler(e) {
  isDragging = false;
}
function wheelHandler(e) {
  event.preventDefault();
  var mapInitialScale = getMapInitialScale();
  var oldViewboxWidth =  mapWidth / scale;
  var oldViewboxHeight =  mapHeight / scale;
  scale += event.deltaY * -0.01;
  scale = Math.min(Math.max(1, scale), 10);
  var newViewboxWidth =  mapWidth / scale;
  var newViewboxHeight =  mapHeight / scale;
  bx -= ((oldViewboxWidth - newViewboxWidth)/2)*scale
  by -= ((oldViewboxHeight - newViewboxHeight)/2)*scale
  updateBounds()
}
window.addEventListener('load', function(e) {
  map = document.getElementById("map")
  mapTransformer = map.getElementById("map_transformer")
  document.body.addEventListener('mousedown', pressDownHandler);
  document.body.addEventListener("mousemove", moveHandler);
  document.body.addEventListener('mouseup', pressUpHandler);
  document.body.addEventListener('wheel', wheelHandler, { passive: false });
});

function scrollToStationCode(stationCode) {
    var elements = document.getElementsByClassName(stationCode);
    if (elements.length > 0) {
      elements[0].scrollIntoView({behavior: "smooth", block: "center", inline: "center"})
    }
}