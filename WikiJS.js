function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function init_request() {
    document.getElementById("title").innerHTML = "My Wiki";
    document.getElementById("display_title").innerHTML = "";
    document.getElementById("ex").innerHTML = "";
    var title = document.getElementById("search_this").value;
    if (title == "") {
        document.getElementById("display_title").innerHTML = "Empty Query";
        return;
    }
    title = title.split(' ');
    title = title.join('%20');
    var data = "";
    console.log(title);
    var language = document.getElementById("lang").value;
    console.log(title + language);
    var url = "https://" + language + ".wikipedia.org/api/rest_v1/page/summary/" + title;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = this.responseText;
            console.log(data);
            obj = JSON.parse(data);
            console.log(obj["title"]);
            document.getElementById("title").innerHTML = "My Wiki: " + obj["title"];
            document.getElementById("display_title").innerHTML = obj["displaytitle"];
            document.getElementById("ex").innerHTML = obj["extract"];
        }
        else if (this.readyState == 4 && this.status != 200) {
            document.getElementById("display_title").innerHTML = "Error loading Page";
            document.getElementById("ex").innerHTML = "Possible Reasons <br> 1. Content not Found. <br> 2. Internet Connection Lost.";
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}