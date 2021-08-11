
var map;
var mapTransformer;
//cx, cy are in client coordinates
var isDragging = false; var cx, cy;
//bx, by are in scaled coordinates
var bx = 0; var by = 0; var scale = 1;
//mapWidth, mapHeight are in map coordinates
const mapWidth = 2099; const mapHeight = 1174.8;
//client coordinates * mapInitialScale = scaled coordinates
//scaled coordinates / scale = map coordinates

var lastClientWidth, lastClientHeight, lastInitialScale;
function getMapInitialScale() {
  if (map.clientWidth != lastClientWidth || map.clientHeight != lastClientHeight) {
    lastInitialScale = Math.min(mapWidth/map.clientWidth, mapHeight/map.clientHeight);
  }
  return lastInitialScale;
}
function getCurrentBoundsMapCoordinates() {
  var iscale = getMapInitialScale()
  return {x:-bx/scale,y:-by/scale,width:map.clientWidth*iscale/scale,height:map.clientHeight*iscale/scale}
}
function translateMapCoordinatesRelative(dx, dy) {
  bx -= dx*scale;
  by -= dy*scale;
}
function applyBounds() {
  //var b = getCurrentBoundsMapCoordinates();
  //console.log(b.x + "->" + (b.x + b.width) + ", " + b.y + "->" +(b.y + b.height))
  mapTransformer.setAttribute("transform", `translate(${bx}, ${by}) scale(${scale})`);
}
function pressDownHandler(e) {
  cx = e.offsetX;
  cy = e.offsetY;
  isDragging = true;
}
function moveHandler(e) {
  if ((e.buttons & 1) == 0) isDragging = false
  if (isDragging === true) {
    var dx = e.offsetX - cx;
    var dy = e.offsetY - cy;
    var mapScale = getMapInitialScale();
    bx += dx*mapScale;
    by += dy*mapScale;
    cx = e.offsetX;
    cy = e.offsetY;
    applyBounds()
  }
}
function pressUpHandler(e) {
  isDragging = false;
}
//TODO: variable scale origin, overidden by selected MRT station
function wheelHandler(e) {
  event.preventDefault();
  var oldBounds = getCurrentBoundsMapCoordinates();
  var oldMidpointX = oldBounds.x + oldBounds.width/2;
  var oldMidpointY = oldBounds.y + oldBounds.height/2;
  scale += scale*event.deltaY * -0.005;
  scale = Math.min(Math.max(0.01, scale), 500);//15);
  var newBounds = getCurrentBoundsMapCoordinates();
  var newMidpointX = newBounds.x + newBounds.width/2;
  var newMidpointY = newBounds.y + newBounds.height/2;

  translateMapCoordinatesRelative(-newMidpointX+oldMidpointX, -newMidpointY+oldMidpointY)

  applyBounds()
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

      var mapScale = getMapInitialScale();
      var clientNewPoint = elements[0].getBoundingClientRect()
      var clientNewMidpointX = clientNewPoint.x + clientNewPoint.width/2;
      var clientNewMidpointY = clientNewPoint.y + clientNewPoint.height/2;
      var clientMidpointX = map.clientWidth / 2;
      var clientMidpointY = map.clientHeight / 2;
      var clientdx = clientNewMidpointX - clientMidpointX;
      var clientdy = clientNewMidpointY - clientMidpointY;
      bx -= clientdx * mapScale;
      by -= clientdy * mapScale;
      applyBounds()
      //elements[0].scrollIntoView({behavior: "smooth", block: "center", inline: "center"})
    }
}