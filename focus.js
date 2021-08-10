var mx;
var my;

document.addEventListener('scroll', function(e) {
  mx = window.scrollX + window.innerWidth/2;
  my = window.scrollY + window.innerHeight/2;
});

window.onresize = function(event) {
    window.scrollTo(mx - window.innerWidth/2, my - window.innerHeight/2);
};