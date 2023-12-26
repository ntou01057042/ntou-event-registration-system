$(document).ready(function () {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const eventId = params.get('eventId');
    $.ajax({
        url: "/events/" + eventId,
        type: "GET",
        headers: { "Authorization": 'Bearer ' + sessionStorage.getItem("accessToken") },
        success: function (response) {
            console.log(response);
            document.getElementById("eventTitle").value = response.title;
        },
        error: function (jqXHR, textStatus, errorThrow) {
            if (jqXHR.responseText === 'Expired JWT!') {
                alert('驗證已過期，請重新登入！');
                localStorage.setItem('redirect', 'Real-timeNotifications.html');
                window.location.assign("/html/login.html");
            }
        }
    });
    $("#Form").submit(function (event) {
        event.preventDefault();

        const subject = document.getElementById("subject").value;
        const text = document.getElementById("message").value;
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
                alert("訊息傳送成功!");
                location.reload();
            },
            error: function (jqXHR, textStatus, errorThrow) {
                if (jqXHR.responseText === 'Expired JWT!') {
                    alert('驗證已過期，請重新登入！');
                    localStorage.setItem('redirect', 'Real-timeNotifications.html');
                    window.location.assign("/html/login.html");
                }
            }
        });
    });
})
