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

function scrollToStationCode(stationCode) {
  updateSelectedStationCode(stationCode)
    var elements = document.getElementsByClassName(stationCode);
    if (elements.length > 0) {
      elements[0].scrollIntoView({behavior: "smooth", block: "center", inline: "center"})
    }
}