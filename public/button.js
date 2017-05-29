document.addEventListener('DOMContentLoaded', loadInitialTable);
document.addEventListener('DOMContentLoaded', submitButton);

function submitButton(){
    document.getElementById('inputSubmit').addEventListener('click', function(event){
        var req = new XMLHttpRequest();

        var fname=document.getElementById('first_name').value;
        var lname=document.getElementById('last_name').value;
        var job_title=document.getElementById('job_title').value;
        var depart=document.getElementById('department').value;
        var salary=document.getElementById('salary').value;
        var office=document.getElementById('office').value;

        req.open('GET','/insert?first_name=' +fname+'&last_name='+lname+ '&job_title='+job_title+ '&department='+depart+
            '&salary='+salary+'&office='+office, true);
        req.addEventListener("load", function(){
            if(req.status>=200 && req.status < 400){
                var response = JSON.parse(req.responseText);
                createTable(response);
            } else {
                console.log("Error in network request: " + req.statusText);
            }
        });
        req.send(null);
        event.preventDefault();
    });
}

function loadInitialTable(){
    var req = new XMLHttpRequest();
    req.open('GET', '/loadTable', true);
    req.addEventListener("load", function(){
        if(req.status >=200 && req.status < 400){
            var response = JSON.parse(req.responseText);
            if(response.length)
                createTable(response);
        } else{
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(null);
    event.preventDefault();
}

//creates a table with SQL Data
function createTable(data){
    var tableDiv = document.getElementById("tableDiv");
    var tableExists = document.getElementById("workTable");
    if(tableExists){
        tableDiv.removeChild(document.getElementById("workTable"));
    }
    //build header
    console.log("header");
    var wTable = document.createElement("table");
    wTable.setAttribute("id","workTable");
    var tHead = document.createElement("thead");
    tHead.setAttribute("id", "tableHeader");
    
    var row=document.createElement("tr");
    var cell = document.createElement("th");
    var cellText = document.createTextNode("First Name");
    cell.appendChild(cellText);
    row.appendChild(cell);

    cell=document.createElement("th");
    cellText= document.createTextNode("Last Name");
    cell.appendChild(cellText);
    row.appendChild(cell);
    
    cell=document.createElement("th");
    cellText= document.createTextNode("Job Title");
    cell.appendChild(cellText);
    row.appendChild(cell);

    cell=document.createElement("th");
    cellText= document.createTextNode("Department");
    cell.appendChild(cellText);
    row.appendChild(cell);
    
    cell=document.createElement("th");
    cellText= document.createTextNode("Salary");
    cell.appendChild(cellText);
    row.appendChild(cell);
    
    cell=document.createElement("th");
    cellText= document.createTextNode("Office");
    cell.appendChild(cellText);
    row.appendChild(cell);

    tHead.appendChild(row);
    wTable.appendChild(tHead);

//Create the body
    var tBody =document.createElement("tbody");
    tBody.setAttribute("id","tableBody");
    console.log(data);
    for(var prop in data){
        //ID
        console.log(data[prop].first_name);
        row = document.createElement("tr");
        cell = document.createElement("td");
        cell.textContent = data[prop].first_name;
        row.appendChild(cell);

        //first name
        console.log(data[prop].last_name);
        cell = document.createElement("td");
        cell.textContent = data[prop].last_name;
        row.appendChild(cell);

        //last name
        console.log(data[prop].job_title);
        cell = document.createElement("td");
        cell.textContent = data[prop].job_title;
        row.appendChild(cell);

        //last updated
        console.log(data[prop].department);
        cell = document.createElement("td");
        cell.textContent = data[prop].department;
        row.appendChild(cell);

        console.log(data[prop].salary);
        cell = document.createElement("td");
        cell.textContent = data[prop].salary;
        row.appendChild(cell);

        console.log(data[prop].office);
        cell = document.createElement("td");
        cell.textContent = data[prop].city;
        row.appendChild(cell);

        tBody.appendChild(row);
    }
    wTable.appendChild(tBody);  
    tableDiv.appendChild(wTable);

    //style the table
    tBody.style.textAlign = "center";
    tHead.style.backgroundColor = "lightGrey";
    wTable.setAttribute("border", "1pix");

}