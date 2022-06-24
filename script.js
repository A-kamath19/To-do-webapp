const dotenv = require("dotenv")
const api_url = process.env.HER_URL

function loadData(records = []) {
	var table_data = "";
	for(let i=0; i<records.length; i++) {
		table_data += `<tr id=${records[i]._id}>`;
		table_data += `<td>${records[i].task}</td>`;
		table_data += `<td>${records[i].description}</td>`;
		table_data += `<td>`;
		table_data += `<a href="edit.html?id=${records[i]._id}"><button class="btn btn-primary">Edit</button></a>`;
		table_data += '&nbsp;&nbsp;';
		table_data += `<button class="btn btn-success" onclick=completed('${records[i]._id}')>Completed</button>`;
		table_data += `</td>`;
		table_data += `</tr>`;
	}
	//console.log(table_data);
	document.getElementById("tableBody").innerHTML = table_data;
}

function completed(id){
    document.getElementById(`${id}`).innerHTML = "";
    var table_data = "";
    fetch(`${api_url}/${id}`)
	.then((response) => response.json())
	.then((data) => {
        console.log(data);
	    table_data += `<tr>`;
	    table_data += `<td>${data.task}</td>`;
	    table_data += `<td>${data.description}</td>`;
	    table_data += `<td>`;
	    table_data += `<button class="btn btn-danger" onclick=deleteData('${data._id}')>Delete</button>`;
	    table_data += `</td>`;
	    table_data += `</tr>`;

        console.log(table_data);
	    document.getElementById("tableBody2").innerHTML = table_data;
    })   
	
}

function getData() {
	fetch(api_url)
	.then((response) => response.json())
	.then((data) => { 
		console.table(data); 
		loadData(data);
	});
}

function getDataById(id) {
	fetch(`${api_url}/${id}`)
	.then((response) => response.json())
	.then((data) => { 
	
		console.log(data);
		document.getElementById("id").value = data._id;
		document.getElementById("task").value = data.task;
        document.getElementById("description").value = data.description;
	})
}


function postData() {
	var task = document.getElementById("task").value;
    var description = document.getElementById("description").value;
	
	data = {task: task, description: description};
	
	fetch(api_url, {
		method: "POST",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.log(data); 
		window.location.href = "index.html";
	})
}	


function putData() {
	
	var _id = document.getElementById("id").value;
	var task = document.getElementById("task").value;
    var description = document.getElementById("description").value;
	
	data = {_id: _id, task: task, description: description};
	
	fetch(api_url, {
		method: "PUT",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.table(data);
		window.location.href = "index.html";
	})
}


function deleteData(id) {
	user_input = confirm("Are you sure you want to delete this record?");
	if(user_input) {
		fetch(api_url, {
			method: "DELETE",
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({"_id": id})
		})
		.then((response) => response.json())
		.then((data) => { 
			console.log(data); 
			window.location.reload();
		})
	}
}