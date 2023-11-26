const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

$(document).ready(function () {
    fetch('../navbar/searchBar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;

            loadNavbarScript('../navbar/searchBar.js');

        });

    fetch('../navbar/menu.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('menu').innerHTML = data;

            loadNavbarScript('../navbar/menu.js');

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
            success: function () {
                console.log("成功：" + id + " " + JSON.stringify(obj));
            },
            type: "POST",
            url: "/events/register?id=" + id
        });
        window.alert("報名成功");
        window.location.href = "../homepage/homepage.html";
    });

});

function loadNavbarScript(src) {
    let script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);
}