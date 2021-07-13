let currentValue;
let allTasks;

// toda vez ao carregar
onload = () => {
  let datas = JSON.parse(localStorage.getItem("tasks"));
  allTasks = datas;
  let savePage = "";

  for(data of datas) {
    savePage += `<div class='tasksContent'>${data.taskName} <input type='button' value='Delete' class='deleteTask'> </div><br>`;
  }

  // Insere no html
  let divTasks = document.getElementById("tasks");
  divTasks.innerHTML = savePage;
}

// pegando o valor digitado no input
function inputValue(e) {
  currentValue = e.value;
}

// Pegando o ENTER no input
document.getElementById("text").addEventListener("keyup", (e) => {
  e.preventDefault();
  
  if(e.key == "Enter") {
    cadastrar();
  }
});

// Limpando valor do input ao cadastrar
function clearInput() {
  let input = document.getElementById("text");
  input.value = "";
}

// Cadastrar task
function cadastrar() {
  let ls = localStorage.getItem("tasks");

  if(ls) {
    allTasks.push({
      "taskName": currentValue
    });
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    clearInput();
  }else {
    // Se o localStorage estiver vazio

    // alimento meu vetor com a primeira task
    allTasks = [{
      "taskName": currentValue
    }];
    // alimento o LS com a primeira task, convertendo o OBJ para String
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    clearInput();
  }

  // puxa os dados agora atualizados
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  let htmlData = "";

  for(task of tasks) {
    htmlData += `<div class='tasksContent'>${task.taskName} <input type='button' value='Delete' class='deleteTask'> </div><br>`;
  }

  // Insere no html
  let divTasks = document.getElementById("tasks");
  divTasks.innerHTML = htmlData;
}

// Limpar geral!
function clearAll() {
  let res = prompt("Você tem certeza que quer fazer isso? Ok para continuar ou Não para cancelar.");
  if(res == "Ok" || res == "ok") {
    localStorage.clear();
    allTasks = "";
    let divTasks = document.getElementById("tasks");
    divTasks.innerHTML = "";
    alert("Tudo foi apagado");
  } else if(res == "Não" || res == "Nao" || res == "nao" || res == "não") {
    alert("Operação cancelada");
  } else {
    alert("Digita certo ai cabeção!");
  }
}