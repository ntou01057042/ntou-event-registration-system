window.addEventListener("load", start, false);

function start(){
    fetch('generalUserMenu.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('menu').innerHTML = data;

            loadNavbarScript('../navbar/searchBar.js');
        });
}