$(document).ready(function () {
    $.ajax({
        url: "/registrations",
        type: "GET",
        headers: { "Authorization": 'Bearer ' + sessionStorage.getItem("accessToken") },
        success: function (response) {
            MyEvent(response);
        },
        error: function (jqXHR, textStatus, errorThrow) {
            if (jqXHR.responseText === 'Expired JWT!') {
                alert('驗證已過期，請重新登入！');
                localStorage.setItem('redirect', 'user.html');
                window.location.assign("/html/login.html");
            }
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
        error: function (jqXHR, textStatus, errorThrow) {
            if (jqXHR.responseText === 'Expired JWT!') {
                alert('驗證已過期，請重新登入！');
                localStorage.setItem('redirect', 'user.html');
                window.location.assign("/html/login.html");
            }
        }
    })
}
function MyEvent(data) {
    for (let i = 0; i < data.length; i++) {
        $.ajax({
            url: "/events/" + data[i].eventId,
            type: "GET",
            success: function (response) {
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
    event.id = "list";
    let con = document.createElement("div");
    con.classList.add("container");
    let word = document.createElement("div");
    word.classList.add("d-flex", "col", "align-items-center");
    word.textContent = response.title;
    let rollcall = document.createElement("button");
    rollcall.classList.add("btn", "btn-danger");
    rollcall.style.float = "right";
    rollcall.textContent = "點名";
    rollcall.setAttribute("data-regisid", regisID);
    rollcall.addEventListener("click", function () {
        let myModal = new bootstrap.Modal(document.getElementById('number-rollcall'));
        let regisID = rollcall.getAttribute('data-regisid');
        myModal.show();
        console.log(regisID)
        document.getElementById('ModalSubmit').addEventListener("click", function (event) {
            console.log("Submitted with regisID:", regisID);
            myModal.hide();
        });
    });
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
        if (clickedButtonId !== "lock") {
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
    con.appendChild(rollcall);
    con.appendChild(cancelButton);
    event.appendChild(con);
    createList.appendChild(event);
}