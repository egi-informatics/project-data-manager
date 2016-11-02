function addProject(projects, data){
  if(hasAllProperties(data)){
    projects[key] = data;
  } else{
    console.error("Project not added. Missing required properties.");
  }
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
  invalid = invalid || data.body == undefined;
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
  clearProjectList();

  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      projects = JSON.parse(this.responseText);
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
  var p = projects[key];
  var title = document.getElementById('p-title');
  var id = document.getElementById('p-id');
  var contact = document.getElementById('p-contact');

  title.value = p.title;
  id.value = p.id;
  contact.value = p.contact;
  console.log(p.id + " " + p.title);
}

// {
//   id: "",
//   body: "",
//   contact: "",
//   lat: "",
//   lon: "",
//   pdf: "",
//   price: "",
//   small image: "",
//   sponsorship: "",
//   status: "",
//   title: "",
//   video: "",
// }
