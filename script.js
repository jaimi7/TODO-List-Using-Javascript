let addtask = document.getElementById("addtask");
let add = document.getElementById("add");
let tasklist = document.getElementById("tasklist");
let save = document.getElementById("save");
let delet = document.getElementById("delete");
let taskindex = document.getElementById("taskindex");
let search = document.getElementById("search");

showtask();

//add
add.addEventListener("click", function () {
    addtaskvalue = addtask.value;
    if (addtaskvalue.trim() != 0) {
        let webtask = localStorage.getItem("localtask");
        if (webtask == null) {
            taskObj = [];
        }
        else {
            taskObj = JSON.parse(webtask);
        }
        taskObj.push(addtaskvalue);
        localStorage.setItem("localtask", JSON.stringify(taskObj));
    }
    showtask();
    addtask.value = '';
})

//show
function showtask() {
    let webtask = localStorage.getItem("localtask");
    if (webtask == null) {
        taskObj = [];
    }
    else {
        taskObj = JSON.parse(webtask);
    }
    html = '';
    taskObj.forEach((item, index) => {
        html += `<tr>
                    <th>${index + 1}</th>
                    <td>${item}</td>
                    <td class="edit"><button onclick="edittask(${index})"><i class="far fa-edit"></i>Edit</button></td>
                    <td class="delete"><button onclick="deletetask(${index})"><i class="far fa-trash-alt"></i>Delete</button></td>
                </tr>`;
    });
    tasklist.innerHTML = html;
}

//edit
function edittask(index) {
    taskindex.value = index;
    let webtask = localStorage.getItem("localtask");
    taskObj = JSON.parse(webtask);
    addtask.value = taskObj[index];
    add.style.display = "none";
    save.style.display = "inline-block";
}

//save
save.addEventListener("click", function () {
    let webtask = localStorage.getItem("localtask");
    taskObj = JSON.parse(webtask);
    let savetask = taskindex.value;
    taskObj[savetask] = addtask.value;
    save.style.display = "none";
    add.style.display = "inline-block";
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showtask();
    addtask.value = '';
})

//delete
function deletetask(index) {
    let webtask = localStorage.getItem("localtask");
    taskObj = JSON.parse(webtask);
    taskObj.splice(index, 1);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showtask();
}

//delete all
delet.addEventListener("click", function () {
    let webtask = localStorage.getItem("localtask");
    taskObj = JSON.parse(webtask);
    if (taskObj != 0) {
        taskObj = [];
    }
    save.style.display = "none";
    add.style.display = "inline-block";
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showtask();
})


//search
search.addEventListener("input", function () {
    let tasks = document.querySelectorAll('tr');
    Array.from(tasks).forEach(function (item) {
        let tasktext = item.getElementsByTagName('td')[0].innerHTML;
        let searchtext = search.value;
        let re = new RegExp(searchtext, 'gi');
        if (tasktext.match(re)) {
            item.style.display = 'table-row';
        }
        else {
            item.style.display = 'none';
        }
    })
})