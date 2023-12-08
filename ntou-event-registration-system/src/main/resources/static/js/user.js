$(document).ready(function () {
    $.ajax({
        url: "/registrations",
        type: "GET",
        headers: { "Authorization": 'Bearer ' + sessionStorage.getItem("accessToken") },
        success: function (response) {
            MyEvent(response);
        },
        error: function () {
            console.log("取得報名失敗!");
        }
    });
})

function cancelRegistration(registrationId) {
    $.ajax({
        url: "/registrations/cancel/" + registrationId,
        type: "DELETE",
        headers: { "Authorization": 'Bearer ' + sessionStorage.getItem("accessToken") },
        success: function (response) {
            alert("取消報名成功!");
            location.reload();
        },
        error: function () {
            console.log("取消報名活動失敗");
        }
    })
}
function MyEvent(data) {
    for (let i = 0; i < data.length; i++) {
        // alert(data[i].eventId);
        $.ajax({
            url: "/events/" + data[i].eventId,
            type: "GET",
            success: function (response) {
                console.log(response);
                createMyEvent(response, data[i].id);
            },
            error: function () {
                alert("尋找活動失敗!");
            }
        });
    }
}
function createMyEvent(response, regisID) {
    let createList = document.getElementById("myEvent");
    let event = document.createElement("a");
    event.classList.add("list-group-item", "list-group-item-action");
    let con = document.createElement("div");
    con.classList.add("container");
    let word = document.createElement("div");
    word.classList.add("d-flex", "col", "align-items-center");
    word.textContent = response.title;
    console.log(response);
    let cancelButton = document.createElement("button");
    cancelButton.classList.add("btn", "btn-danger");
    cancelButton.style.float = "right";
    cancelButton.textContent = "取消報名";
    cancelButton.setAttribute("id", regisID);
    if (typeof (response.restrict) === 'boolean') {
        if (response.restrict) {
            cancelButton.disabled = true;
            cancelButton.setAttribute("id", "lock");
        }
    }
    cancelButton.addEventListener("click", function () {
        let clickedButtonId = this.getAttribute("id");
        if (clickedButtonId != "lock") {
            let confirmation = confirm("確定取消報名？");
            if (confirmation) {
                console.log("取消報名 clicked. Button ID: ", clickedButtonId);
                cancelRegistration(clickedButtonId);
            }
        }
        else {
            alert("無法取消報名!");
        }

    });
    con.appendChild(word);
    con.appendChild(cancelButton);
    event.appendChild(con);
    createList.appendChild(event);
}