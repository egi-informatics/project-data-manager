function checkProject(projects, data){
  if(alreadyInList(projects, data)){
    alert("Project not added. " + data.id + " is already is in the list.");
    throw "Exception: Project not added. Already in list.";
  }
  if(!hasAllProperties(data)){
    alert("Project not added. Missing required properties.");
    throw "Exception: Missing required properties.";
  }
}

function alreadyInList(projects, data){
  return projects[data.id] != null;
}

// {
//   id: "",
//   title: "",
//   body: "",
//   contact: "",
//   lat: "",
//   lon: "",
//   pdf: "",
//   price: "",
//   status: ""
// }
function hasAllProperties(data){
  var invalid = false;
  invalid = invalid || data.id == undefined;
  invalid = invalid || data.title == undefined;
  //invalid = invalid || data.body == undefined;
  invalid = invalid || data.contact == undefined;
  invalid = invalid || data.lat == undefined;
  invalid = invalid || data.lon == undefined;
  invalid = invalid || data.pdf == undefined;
  invalid = invalid || data.price == undefined;
  invalid = invalid || data.status == undefined;
  return !invalid;
}

function listAllProjects(projects){
  var list = document.getElementsByClassName('list')[0];
  var ul = list.getElementsByTagName('ul')[0];

  for(key in projects){
    var p = projects[key];
    var li = document.createElement('li');
    li.setAttribute("onclick", "showProject('" + key + "');");
    li.setAttribute("id", key);
    li.setAttribute("tabindex", "0");

    var title = document.createElement('div');
    title.className = "title";
    title.innerText = p.title;
    li.appendChild(title);

    var id = document.createElement('div');
    id.className = "id";
    id.innerText = p.id;
    li.appendChild(id);

    ul.appendChild(li);
  }
}

function loadFromWeb(){
  if(currentlyLoading){
    return;
  }

  currentlyLoading = true;
  modified = false;
  clearProjectList();
  clearDetails();

  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      projects = JSON.parse(this.responseText);
      backup = JSON.parse(this.responseText);
      listAllProjects(projects);
      currentlyLoading = false;
    }
  };
  xhr.open('GET', './api/research.json');
  xhr.send();
}

function clearProjectList(){
  var list = document.getElementsByClassName('list')[0];
  var ul = list.getElementsByTagName('ul')[0];
  ul.innerHTML = "";
}

function showProject(key){
  if(isCurrent(key)){
    clearDetails();
    return;
  }

  setCurrent(key);
  var p = projects[key];
  var d = getDetailFields();
  for (var field in d) {
    if(p[field] != undefined){
      d[field].value = p[field];
    }
  }
  showButtons("edit");
}

function setCurrent(key){
  if(current != null){
    current.removeAttribute('class');
  }
  current = document.getElementById(key);
  current.setAttribute("class", "current");
}

function isCurrent(key){
  var element = document.getElementById(key);
  if(element == null || element.className.indexOf("current") == -1){
    return false;
  }
  return true;
}

function clearDetails(){
  var d = getDetailFields();
  for (var key in d) {
    d[key].value = "";
  }
  if(current != null){
    current.removeAttribute('class');
  }
  showButtons("new");
}

function showButtons(group){
  var hide = "none";
  var show = "block";

  if(group == "new"){
    document.querySelector(".control-buttons .new").style.display = show;
    document.querySelector(".control-buttons .edit").style.display = hide;
    return;
  }

  if(group == "edit"){
    document.querySelector(".control-buttons .new").style.display = hide;
    document.querySelector(".control-buttons .edit").style.display = show;
  }
}

function getDetailFields(){
  var d = {
    title: document.getElementById('p-title'),
    id: document.getElementById('p-id'),
    contact: document.getElementById('p-contact'),
    price: document.getElementById('p-price'),
    status: document.getElementById('p-status'),
    pdf: document.getElementById('p-pdf'),
    lat: document.getElementById('p-lat'),
    lon: document.getElementById('p-lon'),
    //layover: document.getElementById('p-layover')
  }
  return d;
}

function nextPrevious(e){
  switch(e.which){
    case 40:
      e.preventDefault();
      loadNextProject();
      break;
    case 38:
      e.preventDefault();
      loadPreviousProject();
      break;
  }
}

function loadNextProject(){

  if(current == null || current.nextSibling == null){
    return;
  }
  var next = current.nextSibling;
  next.click();
  next.focus();
  //location.hash = current.getAttribute("id");
  //next.scrollIntoView();
}

function loadPreviousProject(){
  if(current == null || current.previousSibling == null){
    return;
  }
  var prev = current.previousSibling;
  prev.click();
  prev.focus();
}

function childScrollFix(){
  var areas = document.getElementsByTagName('textarea');
  for(var i = 0; i < areas.length; i++){
    areas[i].addEventListener("mouseover", function(){
      document.body.style.overflow='hidden';
    });
    areas[i].addEventListener("mouseout", function(){
      document.body.style.overflow='auto';
    })
  }
}

function refreshList(){
  clearProjectList();
  listAllProjects(projects);
}

function saveProjectFromDetails(){
  var details = getDetailFields();
  var id = details.id.value;

  if(!projectExists(id)){
    projects[id] = {};
  }

  // If previously modified, stays modified. Otherwise checks if modified.
  var different = differentThanData(details);
  modified = modified || different;

  if(!different){
    console.log('Same as data. Not add/saved.');
    return;
  }

  for (var field in details) {
    var value = details[field].value;
    if(value != ""){
      projects[id][field] = value;
    }
  }

  refreshList();
  showProject(details.id.value);
  console.log('Project modified.');
}

function differentThanData(d){
  var id = d.id.value;
  for (var field in d) {
    if(projects[id][field] != d[field].value){
      return true;
    }
  }
}

function projectExists(id){
  return projects[id] != undefined;
}

function download(text, filename){
  var blob = new Blob([text], {type: "application/json"}); // Types list: https://goo.gl/3EkJSx
  var url = window.URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
}

function downloadJSON(){
  var text = JSON.stringify(projects, null, 2);
  download(text, "research.json");
}

function removeSelectedProject(){
  delete projects[current.id];
  clearDetails();
  refreshList();
}
