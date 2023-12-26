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
        },
        error: function(jqXHR, textStatus, errorThrow) {
            if (jqXHR.responseText === 'Expired JWT!') {
                alert('驗證已過期，請重新登入！');
                localStorage.setItem('redirect', 'createEvent.html');
                window.location.assign("/html/signUpPage.html?id=" + id);
            }
        }
    })

    document.getElementById("Form").addEventListener("submit", function (event) {
        event.preventDefault();

        const phoneNumber = document.getElementById("phoneNumber").value;
        const note = document.getElementById("note").value;
        console.log("/registrations/" + id + "?phoneNumber=" + phoneNumber + "&notes=" + note);

        $.ajax({
            contentType: "application/json",
            headers: { "Authorization": 'Bearer ' + sessionStorage.getItem("accessToken") },
            statusCode: {
                403: function() {
                    alert('報名失敗');
                }
            },
            type: "POST",
            url: "/registrations/" + id + "?phoneNumber=" + phoneNumber + "&notes=" + note,
            success: function () {
                console.log("成功");
                window.alert("報名成功");
                window.location.href = "/html/homepage.html";
            },
            error: function(jqXHR, textStatus, errorThrow) {
                if (jqXHR.responseText === 'Expired JWT!') {
                    alert('驗證已過期，請重新登入！');
                    localStorage.setItem('redirect', 'createEvent.html');
                    window.location.assign("/html/signUpPage.html?id=" + id);
                }
            }
        });


    });

});

function loadNavbarScript(src) {
    let script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);
}