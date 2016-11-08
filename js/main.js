var projects = {};
var backup = {};
var currentlyLoading = false;
var modified = false;
var current;

var loadFromWebButton = document.getElementById('load-web');
loadFromWebButton.addEventListener("click", loadFromWeb);

childScrollFix();

document.body.addEventListener("keydown", nextPrevious);

// Are you sure? warning if modified
window.onbeforeunload = s => modified ? "" : null;
