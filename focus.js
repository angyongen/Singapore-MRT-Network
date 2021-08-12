/*
var mx;
var my;

document.addEventListener('scroll', function(e) {
  mx = window.scrollX + window.innerWidth/2;
  my = window.scrollY + window.innerHeight/2;
});

window.onresize = function(event) {
    window.scrollTo(mx - window.innerWidth/2, my - window.innerHeight/2);
};
*/
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

window.addEventListener("click", function (e) {
  updateSelectedStationCode(null)
})

var cbd;
window.addEventListener("load", function(e) {
  cbd = document.getElementById("cbd")
})


function scrollToStationCode(stationCode) {
  updateSelectedStationCode(stationCode)
  var element = document.querySelector(".station." + stationCode);
  if (element) {
    element.scrollIntoView({behavior: "smooth", block: "center", inline: "center"})
  }
  //object area
  var rect = element.getBoundingClientRect();
  let webViewScale = window.visualViewport.scale;
  let chromeZoom = window.devicePixelRatio;
  console.log(rect)
  return ((rect.width + rect.height)/2 * webViewScale);
}