$(document).ready(function () {
    $.ajax({
        url: "/events/userEvent",
        type: "GET",
        headers: { "Authorization": 'Bearer ' + sessionStorage.getItem("accessToken") },
        success: function (response) {
            console.log(response);
            updateOptions(response);
        },
        error: function(jqXHR, textStatus, errorThrow) {
            if (jqXHR.responseText === 'Expired JWT!') {
                alert('驗證已過期，請重新登入！');
                localStorage.setItem('redirect', 'SendMail.html');
                window.location.assign("/html/login.html");
            }
        }
    });
    $("#Form").submit(function (event) {
        event.preventDefault();

        const title = document.getElementById("event").value;
        const subject = document.getElementById("subject").value;
        const text = document.getElementById("message").value;
        const eventId = document.getElementById("event").options[document.getElementById("event").selectedIndex].getAttribute("eventId");

        const url = "/email?subject=" + subject + "&text=" + text + "&eventId=" + eventId;

        $("#submitButton").hide();
        $("#loadingIndicator").show();
        $.ajax({
            type: "POST",
            url: url,
            headers: {
                "Authorization": 'Bearer ' + sessionStorage.getItem("accessToken")
            },
            success: function () {
                console.log("成功：" + eventId);
                alert("訊息傳送成功!");
                window.location.href = `../html/SendMail.html`;
            },
            error: function(jqXHR, textStatus, errorThrow) {
                if (jqXHR.responseText === 'Expired JWT!') {
                    alert('驗證已過期，請重新登入！');
                    localStorage.setItem('redirect', 'SendMail.html');
                    window.location.assign("/html/login.html");
                }
            }
        });
    });
})
function updateOptions(data) {
    let selectElement = document.getElementById("event");
    selectElement.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        let option = document.createElement("option");
        console.log(data[i].title);
        option.value = data[i].title;
        option.innerHTML = data[i].title;
        option.setAttribute("eventId", data[i].id);
        selectElement.appendChild(option);
    }
}