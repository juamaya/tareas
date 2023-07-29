document.getElementById("formTask").addEventListener("submit", saveTask);

function saveTask(e) {
  let avion = document.getElementById("avion").value;
  let side = document.getElementById("side").value;
  let operaciones = document.getElementById("operaciones").value;
  let fecha = new Date().toLocaleString();
  console.log(fecha)

  const task = {
    avion,
    side,
    operaciones,
    fecha,
  };

  if (localStorage.getItem("tasks") === null) {
    let tasks = [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } else {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  console.log(task)

  getTasks();
  document.getElementById("formTask").reset();
  e.preventDefault();
}

function getTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  let tasksView = document.getElementById("tasks");

  tasksView.innerHTML = " <h3 class='text-white'>LISTAS DE TAREAS </h3>";

  for (let i = 0; i < tasks.length; i++) {
    let avion = tasks[i].avion;
    let side = tasks[i].side;
    let operaciones = tasks[i].operaciones;
    let fecha = tasks[i].fecha;

   

    tasksView.innerHTML += `<div class="card mb-2">
    <div class="card-body">
      
        <p> AV: ${avion}   ${side}--- Fecha:  ${fecha} </p>
        <p> OP: ${operaciones}</p>

        <a class="btn btn-danger delete" onclick="deleteTask('${avion}')">
        Delete
        </a>     
    </div>
    </div>`  
  }
}

function deleteTask(avion) {
 

  let tasks = JSON.parse(localStorage.getItem("tasks"));
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].avion == avion) {
      tasks.splice(i, 1);
    }
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
  getTasks();
}

getTasks();
