var selectedStationCode = null;
var oldClassNames = {};
var id_counter = 0;

function updateSelectedStationCode(stationCode) {
  if (selectedStationCode != null) {
    var elements = document.getElementsByClassName(selectedStationCode);
    for (element of elements) {
      var id = element.getAttribute("id");
      element.setAttribute("class", oldClassNames[id])
    }
  }
  selectedStationCode = stationCode;
  oldClassNames = {};
  if (selectedStationCode != null) {
    var elements = document.getElementsByClassName(stationCode);
    for (element of elements) {
      var className = element.getAttribute("class");
      var id = element.getAttribute("id");
      if (!id) {
        id_counter += 1;
        element.setAttribute("id", "xid_" + id_counter)
        id = element.getAttribute("id");
      }
      oldClassNames[id] = className
      element.setAttribute("class", className + " selected")
    }
  }
}


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

//smooth scrolling
var isSmoothApplying = false; var smoothStartTime;
//the last applied bx by and scale. Modify only when actually applied.
var lbx = 0; var lby = 0; var lscale = 1;

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
  lbx = bx; lby = by; lscale = scale;
  mapTransformer.setAttribute("transform", `translate(${bx}, ${by}) scale(${scale})`);
}
function pressDownHandler(e) {
  if (e.touches) e = e.touches[0]
  cx = e.clientX;
  cy = e.clientY;
  isDragging = true;
}
function moveHandler(e) {
  if (e.touches) e = e.touches[0]
  if (e.buttons && (e.buttons & 1) == 0) isDragging = false
  if (isDragging === true && isSmoothApplying === false) {
    var dx = e.clientX - cx;
    var dy = e.clientY - cy;
    var mapScale = getMapInitialScale();
    bx += dx*mapScale;
    by += dy*mapScale;
    cx = e.clientX;
    cy = e.clientY;
    applyBounds()
  }
}
function pressUpHandler(e) {
  isDragging = false;
}
function centeredRescale(newScale) {
  var oldBounds = getCurrentBoundsMapCoordinates();
  var oldMidpointX = oldBounds.x + oldBounds.width/2;
  var oldMidpointY = oldBounds.y + oldBounds.height/2;
  scale = newScale
  scale = Math.min(Math.max(0.3, scale), 400);//15);
  var newBounds = getCurrentBoundsMapCoordinates();
  var newMidpointX = newBounds.x + newBounds.width/2;
  var newMidpointY = newBounds.y + newBounds.height/2;

  translateMapCoordinatesRelative(-newMidpointX+oldMidpointX, -newMidpointY+oldMidpointY)
}
//TODO: variable scale origin, overidden by selected MRT station
function wheelHandler(e) {
  event.preventDefault();
  if (isSmoothApplying === false) {
    centeredRescale(scale + scale*event.deltaY * -0.005)
    applyBounds()
    //smoothApplyBounds()
  }
}
window.addEventListener('load', function(e) {
  map = document.getElementById("map")
  mapTransformer = map.getElementById("map_transformer")

  map.addEventListener('pointerdown', pressDownHandler);
  map.addEventListener('pointermove', moveHandler);
  map.addEventListener('pointerup', pressUpHandler);
  /*
  map.addEventListener('touchstart', pressDownHandler);
  map.addEventListener('mousedown', pressDownHandler);
  map.addEventListener('touchmove', moveHandler);
  map.addEventListener("mousemove", moveHandler);
  map.addEventListener('mouseup', pressUpHandler);
  map.addEventListener('touchend', pressUpHandler);*/
  map.addEventListener('wheel', wheelHandler, { passive: false });
  map.addEventListener("click", function (e) {updateSelectedStationCode(null)})
});

function scrollToStationCode(stationCode) {
  console.log(stationCode)
  updateSelectedStationCode(stationCode)
  var element = document.querySelector(".station." + stationCode);
  if (element) {
    var mapScale = getMapInitialScale();
    var clientNewPoint = element.getBoundingClientRect()
    var clientNewMidpointX = clientNewPoint.x + clientNewPoint.width/2;
    var clientNewMidpointY = clientNewPoint.y + clientNewPoint.height/2;
    var clientMidpointX = map.clientWidth / 2;
    var clientMidpointY = map.clientHeight / 2;
    var clientdx = clientNewMidpointX - clientMidpointX;
    var clientdy = clientNewMidpointY - clientMidpointY;
    bx-=clientdx*mapScale
    by-=clientdy*mapScale

    var scaleAdjust = 30/clientNewPoint.width
    centeredRescale(scale*scaleAdjust)
    //scale = clientNewPoint.width*mapScale*0.1
    smoothApplyBounds()
    //elements[0].scrollIntoView({behavior: "smooth", block: "center", inline: "center"})
  }
}

function smoothLoop(timestamp) {
  if (!isSmoothApplying) { 
    smoothStartTime = timestamp; 
    isSmoothApplying = true;
  }
  time = timestamp - smoothStartTime;
  var multiplier = Math.max(Math.min(1,time/400),0.1)
  multiplier *= multiplier;
  var dbx = bx - lbx;
  var dby = by - lby;
  var dscale = scale - lscale;
  lbx += dbx*multiplier
  lby += dby*multiplier
  lscale += dscale*multiplier
  mapTransformer.setAttribute("transform", `translate(${lbx}, ${lby}) scale(${lscale})`);
  if (Math.abs(dbx)<1 && Math.abs(dby)<1 && Math.abs(dscale)<0.001) {
    bx = lbx; by = lby; scale = lscale;
    isSmoothApplying = false
    console.log({dbx,dby,dscale})
  } else {
    window.requestAnimationFrame(smoothLoop);
  }
}

function smoothApplyBounds() {
    window.requestAnimationFrame(smoothLoop);
}