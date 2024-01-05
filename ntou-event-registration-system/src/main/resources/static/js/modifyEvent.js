document.addEventListener("DOMContentLoaded", function () {
    loading();
});

function loading() {
    let id = localStorage.getItem("eventID");
    // console.log(id);
    $.ajax({
        url: "/events/" + id,
        type: "GET",
        success: function (data) {
            // console.log(data);
            setting(data);
        }
    })
}

function setting(data) {
    let title = document.getElementById("title");
    title.value = data.title;
    let activityCategory = document.getElementById("activityCategory");
    activityCategory.value = data.from;
    let startTime = document.getElementById("startTime");
    startTime.value = data.startTime;
    let endTime = document.getElementById("endTime");
    endTime.value = data.endTime;
    let venue = document.getElementById("venue");
    venue.value = data.venue;
    let activityNum = document.getElementById("activityNum");
    activityNum.value = data.maxPeople;
    let activityDescription = document.getElementById("activityDescription");
    activityDescription.value = data.describe;
}


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
        obj['id'] = localStorage.getItem("eventID");
        console.log(obj);
        let result = confirm("確認更改");
        if(result){
            $.ajax({
                url: "/events",
                type: "PUT",
                contentType: "application/json",
                data: JSON.stringify(obj),
                headers: { "Authorization": 'Bearer ' + sessionStorage.getItem("accessToken") },
                success: function (response) {
                    alert("修改成功");
                    window.location.assign('/html/eventManagement.html',);
                },
                error: function(jqXHR, textStatus, errorThrow) {
                    if (jqXHR.responseText === 'Expired JWT!') {
                        alert('驗證已過期，請重新登入！');
                        localStorage.setItem('redirect', 'modifyEvent.html');
                        window.location.assign("/html/login.html");
                    }
                }
            });
        }
    });

});