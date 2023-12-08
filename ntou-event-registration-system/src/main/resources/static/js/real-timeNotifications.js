$(document).ready(function () {
    const eventId = localStorage.getItem("eventID");

    $.ajax({
        url: "/events/" + eventId,
        type: "GET",
        success: function (data) {
            title = data.title;
            document.getElementById('title').innerHTML = title;
            document.getElementById('eventTitle').placeholder = title;
        }
    });

    $("#Form").submit(function (event) {
        console.log('test');
        event.preventDefault();
        const title = document.getElementById("eventTitle").value;
        const subject = document.getElementById("subject").value;
        const text = document.getElementById("message").value;
        $.ajax({
            headers: {
                "Authorization": 'Bearer ' + sessionStorage.getItem("accessToken")
            },
            success: function () {
                console.log("成功：" + title);
                window.alert("訊息傳送成功!");
            },
            error: function (xhr, status, error) {
                console.error("發生錯誤：" + error);
                alert("訊息傳送失敗!");
            },
            type: "POST",
            url: "/email?subject=" + subject + "&text=" + text + "&eventId=" + eventId
        });
    });
})