function toMap(obj){
  var projects = {};
  for(index in obj){
    projects[obj[index].id] = obj[index];
  }
  return projects;
}

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
