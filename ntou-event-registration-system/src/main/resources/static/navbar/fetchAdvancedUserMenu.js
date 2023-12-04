window.addEventListener("load", start, false);

function start(){
    fetch('../navbar/advancedUserMenu.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('menu').innerHTML = data;

        });
}