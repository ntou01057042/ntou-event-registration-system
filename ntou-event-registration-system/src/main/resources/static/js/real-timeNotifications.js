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
    $.ajax({
        url: "/events/userEvent",
        type: "GET",
        headers: { "Authorization": 'Bearer ' + sessionStorage.getItem("accessToken") },
        success: function (response) {
            console.log(response);
            updateOptions(response);
        },
        error: function () {
            console.log("取得已創建活動失敗");
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