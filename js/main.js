var projects = {};
var currentlyLoading = false;
var current;

var loadFromWebButton = document.getElementById('load-web');
loadFromWebButton.addEventListener("click", loadFromWeb);

childScrollFix();

document.body.addEventListener("keydown", nextPrevious);
