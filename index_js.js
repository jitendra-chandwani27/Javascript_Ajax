function Form() {
    document.getElementById("form").style.display = "block";
    document.getElementById("View").style.display = "none";
}
function validation(form) {
    var e = document.getElementById("priority");
    var prior = e.options[e.selectedIndex].value;
    var due_date = document.myform.date.value;
    var name = document.myform.name.value;
    var des = document.myform.dis.value;
    if (name == null || name == "" || prior == "Please select" || due_date == null || due_date == "" || des == null || des == "") {
        if (name == null || name == "") {
            document.getElementById("emp").textContent = "Field can't be empty";
        }
        if (prior == "Please select") {
            document.getElementById("emptyemail").textContent = "Select value";

        }
        if (due_date == null || due_date == "") {
            document.getElementById("emptydob").textContent = "Field can't be empty";
        }
        if (des == null || des == "") {
            document.getElementById("emptyadd").textContent = "Field can't be empty";
        }
        return false;
    } else {
        var jsonvalue =
            {
                "name": name,
                "description": des,
                "dueDate": due_date,
                "priority": prior
            };
        var xmlhttp = new XMLHttpRequest();
        var url = "https://todo-app-apis.herokuapp.com/task";
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                alert(this.responseText);
            }
        };
        alert(url);
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.send(JSON.stringify(jsonvalue));
    }
}
function Table() {
    document.getElementById("form").style.display = "none";
    document.getElementById("View").style.display = "block";

    var book, x, txt = "";

    var xmlhttp = new XMLHttpRequest();
    var url = "https://todo-app-apis.herokuapp.com/task";
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            book = JSON.parse(this.responseText);
            txt += '<table border="1">';
            txt += " <tr>  <th>Name</th> <th>Description</th>  <th>Due-Date</th> <th>Priority</th>  </tr>"
            for (x in book) {

                txt += "<tr><td>" + book[x].name + "</td><td>" + book[x].description + "</td><td>" + book[x].dueDate + "</td><td>" + book[x].priority + "</td></tr>";
            }
            txt += "</table>";
            document.getElementById("View").innerHTML = txt;
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send();
}
Table();