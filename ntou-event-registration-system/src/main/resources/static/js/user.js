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
            headers: { "Authorization": 'Bearer ' + sessionStorage.getItem("accessToken") },
            success: function (response) {
                createMyEvent(response, data[i].id, data[i].eventId, data[i].attendance);
            },
            error: function () {
                alert("尋找活動失敗!");
            }
        });
    }
}
function createMyEvent(response, regisID, eventId, attendance) {
    let createList = document.getElementById("finished");
    let event = document.createElement("a");
    event.classList.add("list-group-item", "list-group-item-action");
    event.id = "list";
    let con = document.createElement("div");
    con.classList.add("container");
    let word = document.createElement("div");
    word.classList.add("d-flex", "col", "align-items-center");
    word.textContent = response.title;
    con.appendChild(word);
    // if event have rollcall? display btn:none
    let rollcallstate = 0;
    let givenTime = "2023-12-18T05:58:06.904+00:00";
    $.ajax({
        url: "/events/" + eventId,
        type: "GET",
        headers: { "Authorization": 'Bearer ' + sessionStorage.getItem("accessToken") },
        success: function (data) {
            rollcallstate = data.rollcall;
            givenTime = data.rollcallEndTime;
            var rollcalldate = new Date(givenTime);
            rollcalldate.setHours(rollcalldate.getHours() + 8);
            var currentTime = new Date();
            var stTime = new Date(data.startTime);
            var edTime = new Date(data.endTime);
            if(currentTime < stTime)
                createList = document.getElementById("notStart");
            else if(currentTime > stTime && currentTime < edTime)
                createList = document.getElementById("myEvent");
            createList.appendChild(event);
            if (rollcalldate > currentTime && rollcallstate != 0 && attendance == false) {
                let rollcall = document.createElement("button");
                rollcall.classList.add("btn", "btn-danger");
                rollcall.style.float = "right";
                rollcall.textContent = "點名";
                rollcall.setAttribute("data-regisid", regisID);
                rollcall.setAttribute("rc-dateTime", rollcalldate);
                rollcall.setAttribute("rc-state", rollcallstate);
                rollcall.addEventListener("click", function () {
                    let myModal = new bootstrap.Modal(document.getElementById('number-rollcall'));
                    let regisID = rollcall.getAttribute('data-regisid');
                    let state = rollcall.getAttribute('rc-state');
                    myModal.show();
                    console.log(regisID);
                    console.log(state)
                    document.getElementById('ModalSubmit').addEventListener("click", function (event) {
                        event.preventDefault();
                        let input = document.getElementById('rollcallNum').value;
                        if (state == input) {
                            $.ajax({
                                url: "/registrations/attend/" + regisID,
                                type: "POST",
                                headers: { "Authorization": 'Bearer ' + sessionStorage.getItem("accessToken") },
                                success: function () {
                                    alert("點名成功");
                                    window.location.assign('/html/user.html',);
                                },
                                error: function () {
                                    console.log("點名傳送失敗");
                                }
                            })
                            myModal.hide();
                        } else {
                            alert("error input");
                        }

                    });
                });
                con.appendChild(rollcall);
            }
        }
    })

    let cancelButton = document.createElement("button");
    cancelButton.classList.add("btn", "btn-danger", "me-2");
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

    con.appendChild(cancelButton);
    event.appendChild(con);
    // createList.appendChild(event);
}