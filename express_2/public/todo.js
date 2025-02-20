let ul = document.getElementById("myUL");

fetch("http://localhost:3000/todos")
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        
        // Get data from server
        let listData = data.data.map((e, i) => {
            return `<li ${e.status ? "class='checked'" : ""} id="${e.id}">${e.content}
            <span class="close">&#10005;</span>
            </li>`;
        });

        for (let li of listData) {
            ul.innerHTML += li;
        };

        // Click on a close button to hide the current list item
        var close = document.getElementsByClassName("close");
        var i;
        for (i = 0; i < close.length; i++) {
          close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
            console.log(div);
            let id = div.id;
            console.log(id);
            fetch(`http://localhost:3000/todos/${id}`, {
                method: "DELETE",
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
          }
        }
    })
    .catch((err) => {
        console.log(err);
    });

var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
    let status = ev.target.className === "checked" ? true : false;
    let id = ev.target.id;

    fetch(`http://localhost:3000/todos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            status: status,
        }),
    })
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
    // lay thong tin tu input va gui len server
    //thong qua post request 
    fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            content: inputValue,
        }),
    })
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log(data);
        document.getElementById("myInput").value = "";

        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);
        li.id = data.data.id;

        for (i = 0; i < close.length; i++) {
          close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
            let deleteId = div.id;
            fetch(`http://localhost:3000/todos/${deleteId}`, {
                method: "DELETE",
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
          }
        }
    })
    .catch((err) => {
        console.log(err);
    });
  }
}