window.addEventListener("load", start, false);

function start() {
    let authority = sessionStorage.getItem("authority");
    let url;
    if (authority === "ADMIN") {
        url = "/html/adminUserMenu.html";
    } else if (authority === "ADVANCED") {
        url = "/html/advancedUserMenu.html";
    } else if (authority === "GENERAL") {
        url = "/html/generalUserMenu.html"
    }
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById('menu').innerHTML = data;
        });
}