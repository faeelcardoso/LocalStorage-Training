let currentValue;
let allTasks;

// toda vez ao carregar
onload = () => {
  let datas = JSON.parse(localStorage.getItem("tasks"));
  allTasks = datas;
  let savePage = "";

  for(data of datas) {
    savePage += `<div class='tasksContent' id='${data.id}'>${data.taskName} <input type='button' value='Delete' class='deleteTask' onclick='deleteTask(this)'> </div>`;
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

// Gerando o ID aleatório
function generateId() {
  let letters = "abcdefghijklmnopqrstuvwxyz";
  let randomId = letters.charAt(Math.floor(Math.random() * letters.length)) + (Math.random() + 1).toString(36).substr(2, 9);
  // Gero um número de 0 até o tamanho de letters e arredondo pra baixo, por fim retorno a letra no índice random que gerei
  // Depois gero um número random entre 1 e 2, converto em string na base 36 e pego 9 caracteres começando do 3º
  // Por fim concateno essa brincadeira e fica um random de 10 caracteres
  return randomId;      
}

// Cadastrar task
function cadastrar() {
  let ls = localStorage.getItem("tasks");

  if(ls) {
    allTasks.push({
      "id": generateId(),
      "taskName": currentValue
    });
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    clearInput();
  }else {
    // Se o localStorage estiver vazio
    // alimento meu vetor com a primeira task
    allTasks = [{
      "id": generateId(),
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
    htmlData += `<div class='tasksContent' id='${task.id}'>${task.taskName} <input type='button' value='Delete' class='deleteTask' onclick='deleteTask(this)'> </div>`;
  }

  // Insere no html
  let divTasks = document.getElementById("tasks");
  divTasks.innerHTML = htmlData;
}

function deleteTask(e) {
  let div = e.parentElement;
  let idElement = div.getAttribute("id");
  
  // Removendo do vetor
  for(task of allTasks) {
    if(task.id === idElement) {
      allTasks.splice(allTasks.indexOf(task), 1); // Encontre a posição de task no array de objs allTasks e remova
    }
  }

  // Atualizando o localStorage
  localStorage.setItem("tasks", JSON.stringify(allTasks));

  // Removando do HTML
  div.remove();
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