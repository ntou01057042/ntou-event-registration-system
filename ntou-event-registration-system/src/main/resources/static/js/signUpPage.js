const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

$(document).ready(function () {
    fetch('/html/searchBar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;

            loadNavbarScript('/js/searchBar.js');

        });

    fetch('/html/menu.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('menu').innerHTML = data;

            loadNavbarScript('/js/menu.js');

        });

    $.ajax({
        url: "/events/" + id,
        type: "GET",
        success: function (data) {
            console.log(data);
            document.getElementById("title").value = data.title;
        }
    })

    document.getElementById("Form").addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const obj = Object.fromEntries(formData.entries());
        console.log(JSON.stringify(obj) + " " + id);

        $.ajax({
            contentType: "application/json",
            data: JSON.stringify(obj),
            headers: { "Authorization": 'Bearer ' + sessionStorage.getItem("accessToken") },
            type: "POST",
            url: "/registrations/" + id,
            success: function () {
                console.log("成功：" + id + " " + JSON.stringify(obj));
                window.alert("報名成功");
                window.location.href = "/html/homepage.html";
            }
        });


    });

});

function loadNavbarScript(src) {
    let script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);
}