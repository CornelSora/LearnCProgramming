function createMenu() {
    var divSelectat = document.getElementById("wrapper");
    var div = document.createElement('div');
    div.id = "sidebar-wrapper";
    var ul = document.createElement("ul");
    ul.class = "sidebar-nav";
    var li = document.createElement("li");
    li.class = "sidebar-brand";
    li.innerHTML = "Learn C Programming";
    ul.appendChild(li);
    li = document.createElement("li");
    li.class = "sidebar-brand";
    li.innerHTML = "<a href='tests.jsp'>Go to Tests</a>";
    ul.appendChild(li);
    li = document.createElement("li");
    li.class = "sidebar-brand";
    li.innerHTML = "<a href='console.jsp'>Go to Console</a>";
    ul.appendChild(li);
    li = document.createElement("li");
    li.class = "sidebar-brand";
    li.innerHTML = "<a href='../UploadFile/SelectFile.html'>Verify my files</a>";
    ul.appendChild(li);
    li = document.createElement("li");
    li.class = "sidebar-brand";
    li.innerHTML = "<a href='logout.jsp'>Log out</a>";
    ul.appendChild(li);
    div.appendChild(ul);
    divSelectat.appendChild(div);
     $("#menu-toggle").click(function (e) {
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
            });
}