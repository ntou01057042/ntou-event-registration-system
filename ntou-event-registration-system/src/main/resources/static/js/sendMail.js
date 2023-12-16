$(document).ready(function () {
    //const eventId = localStorage.getItem("eventID");
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
        event.preventDefault();

        const title = document.getElementById("event").value;
        const subject = document.getElementById("subject").value;
        const text = document.getElementById("message").value;
        const eventId = document.getElementById("event").options[document.getElementById("event").selectedIndex].getAttribute("eventId");

        const url = "/email?subject=" + subject + "&text=" + text + "&eventId=" + eventId;

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
            error: function (xhr, status, error) {
                console.error("發生錯誤：" + eventId);
                alert("訊息傳送失敗!");
            },
            complete: function () {
                $("#loadingIndicator").hide();
                $("#submitButton").show();
                console.log("完成：" + eventId);
            }
        });
        $("#submitButton").hide();
        $("#loadingIndicator").show();
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