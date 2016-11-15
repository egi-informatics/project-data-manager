var projects = {};
var backup = {};
var currentlyLoading = false;
var modified = false;
var current;

var previousLat = "";
var previousLon = "";

var metaDown = false;

var loadFromWebButton = document.getElementById('load-web');
loadFromWebButton.addEventListener("click", loadFromWeb);

childScrollFix();

document.body.addEventListener("keydown", nextPrevious);
document.querySelector('#thematic').addEventListener('click', toggleThematic);

// Saving
document.body.addEventListener("keydown", saveShortcut);
document.body.addEventListener("keyup", saveShortcut);

// Are you sure? warning if modified
window.onbeforeunload = s => modified ? "" : null;
