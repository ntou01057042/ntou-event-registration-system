window.addEventListener("load", start, false);

function start(){
    fetch('/html/searchbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
            loadNavbarScript('/js/searchBar.js');
        });
}

function loadNavbarScript(src) {
    let script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);
}