$(document).ready(function () {

    $.getJSON("/json/categories.json", function (data) {
        let selectElement = document.getElementById("activityCategory");
        for (let category in data) {
            if (data.hasOwnProperty(category)) {
                data[category].forEach(function (unit) {
                    let option = document.createElement("option");
                    option.value = unit;
                    option.text = unit;
                    selectElement.appendChild(option);
                });
            }
        }
    });

    document.getElementById("Form").addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const obj = Object.fromEntries(formData.entries());

        $.ajax({
            url: "/events",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(obj),
            headers: { "Authorization": 'Bearer ' + sessionStorage.getItem("accessToken") },
            success: function () {
                console.log("成功：" + JSON.stringify(obj));
                window.alert("創建成功");
                window.location.assign("/html/eventManagement.html");
            }
        });
    });

});