var projects = {};
var currentlyLoading = false;

var loadFromWebButton = document.getElementById('load-web');
loadFromWebButton.addEventListener("click", loadFromWeb);
