var projects = {};

xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
  if(this.readyState == 4 && this.status == 200){
    projects = JSON.parse(this.responseText);
    listAllProjects(projects);
  }
};

xhr.open('GET', './api/research.json');
xhr.send();
