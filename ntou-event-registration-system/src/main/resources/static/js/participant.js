let eventId;
let title;
let participantsData;

function createParticipant(data) {
    let createList = document.getElementById("createList");
    createList.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        let participant = document.createElement("a");
        participant.classList.add("list-group-item", "list-group-item-action");
        let con = document.createElement("div");
        con.classList.add("container");
        let word = document.createElement("div");
        word.classList.add("d-flex", "col", "align-items-center");
        word.textContent = data[i].name;
        let blackButton = document.createElement("button");
        blackButton.classList.add("btn", "btn-danger");
        blackButton.style.float = "right";
        blackButton.textContent = "新增黑名單";

        let pinfo = document.createElement("button");
        pinfo.classList.add("btn", "btn-link", "me-2");
        pinfo.textContent = "詳細資訊";
        pinfo.addEventListener('click', () => {
            localStorage.removeItem('eventID');
            localStorage.setItem('eventID', data[i].id);
            // window.location.assign('/html/modifyEvent.html',);
        });
        con.appendChild(word);
        con.appendChild(pinfo);
        con.appendChild(blackButton);
        participant.appendChild(con);
        createList.appendChild(participant);
    }
}
function rollcallState(num, endtime) {
    console.log(num);
    // set event rollcall
    if (num == 0) { // start rollcall
        document.getElementById('rollstbtn').style.display = 'block';
    }
    else { //display rollcall record
        let endTime = new Date(endtime);
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        };
        document.getElementById('rollendbtn').style.display = "block";
        document.getElementById('passwordrec').value = num;
        document.getElementById('rollCallEndTimerec').value = '結束時間：' + endTime.toLocaleString(undefined, options);
    }
}
function setRollcallRec(eventId) {
    $.ajax({
        url: "/events/" + eventId,
        type: "GET",
        headers: { "Authorization": 'Bearer ' + sessionStorage.getItem("accessToken") },
        success: function (data) {
            console.log(data);
            rollcallState(data.rollcall, data.rollcallEndTime);
        },
        error: function () {
            // rollcallState(0, endTime);
            console.log("獲取活動點名資訊失敗");
        }
    })
}
$(document).ready(function () {
    $('#eventList').change(function () {

        eventId = $(this).val();
        if (eventId !== "請選擇一個活動") {
            setRollcallRec(eventId);
            $.ajax({
                url: "/registrations/" + eventId,
                type: "GET",
                headers: { "Authorization": 'Bearer ' + sessionStorage.getItem("accessToken") },
                success: function (data) {
                    participantsData = data;
                    createParticipant(data);
                },
                error: function (jqXHR, textStatus, errorThrow) {
                    if (jqXHR.responseText === 'Expired JWT!') {
                        alert('驗證已過期，請重新登入！');
                        localStorage.setItem('redirect', 'participant.html');
                        window.location.assign("/html/login.html");
                    }
                }
            });
        }
        else {
            let createList = document.getElementById("createList");
            createList.innerHTML = "";
        }

    });
    $.ajax({
        url: "/events/userEvent",
        type: "GET",
        headers: { "Authorization": 'Bearer ' + sessionStorage.getItem("accessToken") },
        success: function (data) {
            let selectElement = document.getElementById("eventList");
            for (let i = 0; i < data.length; i++) {
                let option = document.createElement("option");
                option.value = data[i].id;
                option.text = data[i].title;
                selectElement.appendChild(option);
            }
        },
        error: function (jqXHR, textStatus, errorThrow) {
            if (jqXHR.responseText === 'Expired JWT!') {
                alert('驗證已過期，請重新登入！');
                localStorage.setItem('redirect', 'participant.html');
                window.location.assign("/html/login.html");
            }
        }
    })

    // create start rollcall
    document.getElementById('rollCallModal').addEventListener('shown.bs.modal', function () {

        document.getElementById('startRollCall').addEventListener('click', function () {
            let rollCallTime = document.getElementById('rollCallTime').value;
            // delete start button
            document.getElementById('startRollCall').style.display = "none";
            let startTime = new Date();
            let endTime = new Date(startTime.getTime() + rollCallTime * 60 * 1000);
            const options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            };
            // Set and display end time and count down
            document.getElementById('rollCallModalLabel').innerText = '倒數計時';
            document.getElementById('rollCallEndTime').value = '結束時間：' + endTime.toLocaleString(undefined, options);
            console.log("/events/rollcall/" + eventId + '?time=' + endTime.toISOString())
            // renew countdown
            let countdown = rollCallTime * 60;
            // renew database
            $.ajax({
                url: "/events/rollcall/" + eventId + '?time=' + endTime.toISOString(),
                type: "POST",
                headers: { "Authorization": 'Bearer ' + sessionStorage.getItem("accessToken") },
                success: function () {
                    console.log("新增點名success");
                    $.ajax({
                        url: "/events/" + eventId,
                        type: "GET",
                        headers: { "Authorization": 'Bearer ' + sessionStorage.getItem("accessToken") },
                        success: function (data) {
                            document.getElementById('password').value = data.rollcall;
                            console.log("success");
                        },
                        error: function () {
                            console.log("師辦了");
                        }
                    })
                },
                error: function () {
                    console.log("新增點名失敗");
                }
            })
            // set random number

            let countdownInterval = setInterval(function () {
                document.getElementById('rollCallTimeCount').value = '倒數時間：' + countdown + ' 秒';
                countdown--;
                if (countdown < 0) {
                    clearInterval(countdownInterval);
                    document.getElementById('rollCallModalLabel').innerText = '點名結束';
                }
            }, 1000);
        });
        $('#rollCallModal').on('hidden.bs.modal', function () {
            document.getElementById('rollstbtn').style.display = 'none';
            document.getElementById('rollendbtn').style.display = "block";
            setRollcallRec(eventId)
        });

    });



    document.getElementById('exportButton').addEventListener('click', function () {
        exportToExcel(participantsData);
    });

})

function exportToExcel(data) {
    const filteredData = data.map(function (item) {
        return {
            name: item.name,
            email: item.email,
            phoneNumber: item.phoneNumber,
            notes: item.notes
        };
    });

    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Participants");
    let file = "participants.xlsx";
    XLSX.writeFile(workbook, file);
}
