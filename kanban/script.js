const UIElements = {
    toDo : {
        box : document.querySelector(".toDo"),
        tasks : document.querySelector(".toDo .tasks"),
        addTask: document.querySelector(".toDo .footer"),
        addTaskForm : document.querySelector(".toDo .add"),
        cancelAdding :document.querySelector(".toDo .add .cancel"),
        addingBtn :document.querySelector(".toDo .add .done-btn"),
        addTitle : document.querySelector(".toDo .add .title"),
        addDes : document.querySelector(".toDo .add .content"),
        tasksArray : [],
        tasksArrayTitle : [],
        tasksArrayDes : [],
        counter : 0,
        counterDisplay : document.querySelector(".toDo .head span"),
    },

    inProgress : {
        box : document.querySelector(".inProgress"),
        tasks : document.querySelector(".inProgress .tasks"),
        addTask : document.querySelector(".inProgress .footer"),
        addTaskForm : document.querySelector(".inProgress .add"),
        cancelAdding :document.querySelector(".inProgress .add .cancel"),
        addingBtn :document.querySelector(".inProgress .add .done-btn"),
        addTitle : document.querySelector(".inProgress .add .title"),
        addDes : document.querySelector(".inProgress .add .content"),
        tasksArray : [],
        tasksArrayTitle : [],
        tasksArrayDes : [],
        counter : 0,
        counterDisplay : document.querySelector(".inProgress .head span")
    },

    done : {
        box : document.querySelector(".done"),
        tasks : document.querySelector(".done .tasks"),
        addTask : document.querySelector(".done .footer"),
        addTaskForm : document.querySelector(".done .add"),
        cancelAdding :document.querySelector(".done .add .cancel"),
        addingBtn :document.querySelector(".done .add .done-btn"),
        addTitle : document.querySelector(".done .add .title"),
        addDes : document.querySelector(".done .add .content"),
        tasksArray : [],
        tasksArrayTitle : [],
        tasksArrayDes : [],
        counter : 0,
        counterDisplay : document.querySelector(".done .head span")
    },

};
// localStorage.clear();
let selected = null;
let selectedFrom ="";

function loadCounter(){
    let savedCounter = JSON.parse(window.localStorage.getItem("counter")) || 
        {
            toDo : 0,
            inProgress : 0,
            done : 0,
        }

        UIElements.toDo.counter = savedCounter.toDo;
        UIElements.inProgress.counter = savedCounter.inProgress;
        UIElements.done.counter = savedCounter.done;

        UIElements.toDo.counterDisplay.textContent = savedCounter.toDo;
        UIElements.inProgress.counterDisplay.textContent = savedCounter.inProgress;
        UIElements.done.counterDisplay.textContent = savedCounter.done;

}

function loadTasks(){
    let tasksToLoad = JSON.parse(window.localStorage.getItem("tasks")) || {
        toDo : {
            title : [],
            desc : [],
        },
        inProgress : {
            title :[],
            desc : [],
        },
        done : {
            title : [],
            desc : [],
        },
    };

    if(tasksToLoad){
        for(let i = 0; i < tasksToLoad.toDo.title.length; i++){
            UIElements.toDo.tasksArrayTitle.push(tasksToLoad.toDo.title[i]);
            UIElements.toDo.tasksArrayDes.push(tasksToLoad.toDo.desc[i]);
            createTask(UIElements.toDo, tasksToLoad.toDo.title[i], tasksToLoad.toDo.desc[i]);
        }
        for(let i = 0; i < tasksToLoad.done.title.length; i++){
            UIElements.done.tasksArrayTitle.push(tasksToLoad.done.title[i]);
            UIElements.done.tasksArrayDes.push(tasksToLoad.done.desc[i]);
            createTask(UIElements.done, tasksToLoad.done.title[i], tasksToLoad.done.desc[i]);
        }
        for(let i = 0; i < tasksToLoad.inProgress.title.length; i++){
            UIElements.inProgress.tasksArrayTitle.push(tasksToLoad.inProgress.title[i]);
            UIElements.inProgress.tasksArrayDes.push(tasksToLoad.inProgress.desc[i]);
            createTask(UIElements.inProgress, tasksToLoad.inProgress.title[i], tasksToLoad.inProgress.desc[i]);
        }
    }

}

function saveTasksArrays(type,title,des){
    type.tasksArrayTitle.push(title);
    type.tasksArrayDes.push(des);
    saveTasks();
}

function adding(type){
    let title = type.addTitle.value.trim();
    let des = type.addDes.value.trim();

    if(title){
        saveTasksArrays(type,title,des);

        createTask(type, title, des);
        type.addTaskForm.style.display = "none";
        type.addTask.style.display = "block";
        type.counter++;
        type.counterDisplay.textContent = type.counter;
        saveCounter();

        saveTasks();
    }
    type.addTitle.value = "";
    type.addDes.value = "";

}

function saveTasks(){
    const tasksToSave = {
        toDo : {
            title : UIElements.toDo.tasksArrayTitle,
            desc : UIElements.toDo.tasksArrayDes,
        },
        inProgress : {
            title : UIElements.inProgress.tasksArrayTitle,
            desc : UIElements.inProgress.tasksArrayDes,
        },
        done : {
            title : UIElements.done.tasksArrayTitle,
            desc : UIElements.done.tasksArrayDes,
        },
    };

    window.localStorage.setItem("tasks",JSON.stringify(tasksToSave));
}

function saveCounter(){
const tasksCounter = {
    toDo : UIElements.toDo.counter,
    inProgress : UIElements.inProgress.counter,
    done : UIElements.done.counter,
}
    window.localStorage.setItem("counter",JSON.stringify(tasksCounter));
}

function btns(taskContainer, type) {
    let editBtn = taskContainer.querySelector(".fa-pen-to-square"); 
    let deleteBtn = taskContainer.querySelector(".fa-trash");

    editBtn.addEventListener("click", () => {
        Array.from(type.tasks.children).forEach((child) => {
            child.style.display = "none"; 
        });
        editTask(taskContainer, type);
    });

    deleteBtn.addEventListener("click", () => {
        console.log(type)
        console.log(type.counter)
        console.log(type.tasksArrayTitle)
        let currentTitle = taskContainer.querySelector("h3").textContent;
        let currentDes = taskContainer.querySelector(".the-task").textContent;

        deleteTasks(type, currentTitle, currentDes);
        taskContainer.remove();
    });
}

function deleteTasks(type, currentTitle, currentDes) {
    let titIndex = type.tasksArrayTitle.indexOf(currentTitle);
    let desIndex = type.tasksArrayDes.indexOf(currentDes);
    

    if(titIndex !== -1 ){
        type.tasksArrayTitle.splice(titIndex ,1);
        type.tasksArrayDes.splice(desIndex ,1);

        if (type.counter > 0){
            type.counter--;
            type.counterDisplay.textContent = type.counter;
        }
            
        saveCounter();
        saveTasks();
    }
}

function saveDragged(type, selectedFrom, selected) {
    let title = selected.querySelector("h3").textContent;
    let des = selected.querySelector(".the-task").textContent;

    let newType = UIElements[type];
    let oldType = UIElements[selectedFrom];


    newType.counter++;
    newType.counterDisplay.textContent = newType.counter;


    saveTasksArrays(newType, title, des);
    deleteTasks(oldType, title, des);


    const oldEditBtn = selected.querySelector(".fa-pen-to-square");
    const oldDeleteBtn = selected.querySelector(".fa-trash");
    oldEditBtn.replaceWith(oldEditBtn.cloneNode(true)); 
    oldDeleteBtn.replaceWith(oldDeleteBtn.cloneNode(true)); 


    newType.tasks.appendChild(selected);


    btns(selected, newType);
    dragAndDrop(selected);

    saveCounter();
    saveTasks();
}

function allowDrag(){
    let boxes = document.querySelectorAll(".box .tasks");

    boxes.forEach((box)=>{
        box.addEventListener("dragover", (e)=>{
            e.preventDefault();
            box.style.border= "solid 1px";
        });
        box.addEventListener("dragleave", (e)=>{
            e.preventDefault();
            box.style.border= "none";
        });
        box.addEventListener("drop", (e)=>{
            // box.appendChild(selected);
            box.style.border= "none";
            setTimeout(() => {
                saveDragged(box.parentElement.classList[1], selectedFrom, selected);
            }, 100);
            
        });
    });
}

function dragAndDrop(task){
    task.addEventListener("dragstart", (e)=>{
        selected = e.target;
        selectedFrom = selected.parentElement.parentElement.classList[1];
        task.style.opacity = "0.2";
    });
    task.addEventListener("dragend", ()=>{
        // selected = null;
        task.style.opacity = "1";
    });

}

function createTask(type, tit, des){
    let taskContainer = document.createElement("div");
    taskContainer.classList.add("task");
    taskContainer.setAttribute("draggable", "true");

    let title = document.createElement("div");
    title.classList.add("title");

    let h3 = document.createElement("h3");
    h3.textContent = `${tit}`;

    let icons = document.createElement("div");
    icons.classList.add("icons");

    let editBtn = document.createElement("i");
    editBtn.classList.add("fa-solid");
    editBtn.classList.add("fa-pen-to-square");

    let deleteBtn = document.createElement("i");
    deleteBtn.classList.add("fa-solid");
    deleteBtn.classList.add("fa-trash");

    let theTask = document.createElement("div");
    theTask.classList.add("the-task");
    theTask.textContent = `${des}`;

    icons.appendChild(editBtn);
    icons.appendChild(deleteBtn);

    title.appendChild(h3);
    title.appendChild(icons);

    taskContainer.appendChild(title);
    taskContainer.appendChild(theTask);

    type.tasks.appendChild(taskContainer);

    btns(taskContainer, type);
    dragAndDrop(taskContainer);
}


function addTask(type){
    type.addTask.style.display = "none"
    type.addTaskForm.style.display = "block"
}

function cancelAddTask(type){
    type.addTask.style.display = "block"
    type.addTaskForm.style.display = "none"
}

function editTask(task,type){
    let tit = task.querySelector("h3").textContent;
    let des = task.querySelector(".the-task").textContent;

    let editContainer = document.createElement("div");
    editContainer.classList.add("edit");

    let title = document.createElement("input");
    title.classList.add("title");
    title.value =`${tit}`;

    let content = document.createElement("textarea");
    content.classList.add("content");
    content.value = `${des}`;

    let btns = document.createElement("div");
    btns.classList.add("btns");

    let cancel = document.createElement("i");
    cancel.classList.add("fa-solid");
    cancel.classList.add("fa-x");

    let done = document.createElement("i");
    done.classList.add("fa-solid");
    done.classList.add("fa-check");

    btns.appendChild(cancel);
    btns.appendChild(done);

    editContainer.appendChild(title);
    editContainer.appendChild(content);
    editContainer.appendChild(btns);

    task.style.display = "none";
    type.tasks.appendChild(editContainer);

    done.onclick = ()=>{
        let newTit = title.value.trim();
        let newDes = content.value.trim();
        if(newTit){
            // console.log(type.counter)
            let index = type.tasksArrayTitle.indexOf(tit);
            if(index !== -1){
                type.tasksArrayTitle[index]=newTit;
                type.tasksArrayDes[index]=newDes;
            }

            task.querySelector("h3").textContent = `${newTit}`;
            task.querySelector(".the-task").textContent = `${newDes}`;
        }
        saveTasks();
        editContainer.remove();
        // task.style.display = "block";
        Array.from(type.tasks.children).forEach((child)=>{
            child.style.display="block";
            type.addTaskForm.style.display="none";
        });

    };
    cancel.onclick=()=>{
        editContainer.remove();
        Array.from(type.tasks.children).forEach((child)=>{
            child.style.display="block";
        });
        type.addTaskForm.style.display="none";
    };
}

loadTasks();
loadCounter();
allowDrag();
document.addEventListener("click", (e)=>{
    if(e.target.closest(".toDo .footer")){
        addTask(UIElements.toDo);
    }
    if(e.target.closest(".done .footer")){
        addTask(UIElements.done);
    }
    if(e.target.closest(".inProgress .footer")){
        addTask(UIElements.inProgress);
    }

    if(e.target===UIElements.toDo.cancelAdding){
        cancelAddTask(UIElements.toDo);
    }
    if(e.target===UIElements.done.cancelAdding){
        cancelAddTask(UIElements.done);
    }
    if(e.target===UIElements.inProgress.cancelAdding){
        cancelAddTask(UIElements.inProgress);
    }

    if(e.target===UIElements.toDo.addingBtn){
        adding(UIElements.toDo);
    }
    if(e.target===UIElements.inProgress.addingBtn){
        adding(UIElements.inProgress);
    }
    if(e.target===UIElements.done.addingBtn){
        adding(UIElements.done);
    }
});



