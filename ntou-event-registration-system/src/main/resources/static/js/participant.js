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
        con.appendChild(word);
        let blackButton = document.createElement("button");
        blackButton.classList.add("btn", "btn-danger");
        blackButton.style.float = "right";
        blackButton.textContent = "新增黑名單";

        blackButton.addEventListener('click', () => {
            localStorage.removeItem('eventID');
            localStorage.setItem('eventID', data[i].userId);
            var blockData =
            {
                targetId: data[i].userId,
                eventId: data[i].eventId,
                reason: "..."
            };
            $.ajax({
                url: "/blocks",
                type: "POST",
                contentType: "application/json",
                headers: {
                    "Authorization": 'Bearer ' + sessionStorage.getItem("accessToken")
                },
                data: JSON.stringify(blockData),
                success: function (data) {
                    // console.log("新增黑名單" + data[i].name);
                    alert('新增黑名單成功！');
                    console.log(blockData);
                },
                error: function (jqXHR, textStatus, errorThrow) {
                    if (jqXHR.responseText === 'Expired JWT!') {
                        alert('驗證已過期，請重新登入！');
                        localStorage.setItem('redirect', 'participant.html');
                        window.location.assign("/html/login.html");
                    }
                }
            });

        });

        if (thisRollState != 0) {
            let Image = document.createElement("img");

            Image.height = 25;
            Image.alt = "logout";
            Image.loading = "lazy";
            if (data[i].attendance == false) {
                Image.src = "/img/denial.png";
            }
            else {
                Image.src = "/img/chosen.png";

            }
            Image.style.marginTop = "auto";
            Image.style.marginBottom = "auto";
            con.appendChild(Image);
        }

        let pinfo = document.createElement("button");
        pinfo.classList.add("btn", "btn-link", "me-2");
        pinfo.textContent = "詳細資訊";
        pinfo.addEventListener('click', () => {
            let participantDetailModal = new bootstrap.Modal(document.getElementById('participantDetail'));

            let filteredData = participantsData.filter(item => item.id == data[i].id);
            console.log(filteredData);
            let dt = '';
            dt = `
                <div class="form-outline mb-4">
                    <label for="name">姓名</label>
                    <input type="text" id="name" class="form-control" value= ${filteredData[0].name} disabled
                        readonly>
                </div>
                <div class="form-outline mb-4">
                    <label for="email">Email</label>
                    <input type="text" id="email" class="form-control" value= ${filteredData[0].email}  disabled
                        readonly>
                </div>
                <div class="form-outline mb-4">
                    <label for="phoneNumber">電話</label>
                    <input type="text" id="phoneNumber" class="form-control" value= ${filteredData[0].phoneNumber}
                        disabled readonly>
                </div>
                <div class="form-outline mb-4">
                    <label for="note">備註</label>
                    <input type="text" id="note" class="form-control"  value= ${filteredData[0].notes}  disabled
                        readonly>
                </div>
            `
            let model = document.getElementById('ptDetail');
            model.innerHTML = '';
            model.innerHTML += dt;
            participantDetailModal.show();
        });

        con.appendChild(pinfo);
        con.appendChild(blackButton);
        participant.appendChild(con);
        createList.appendChild(participant);
    }
}
function rollcallState(num, endtime) {
    // set event rollcall
    if (num == 0) { // start rollcall
        let btngroupElement = document.getElementById('btngroup');
        let rollstbtn = document.createElement('button');
        rollstbtn.type = 'button';
        rollstbtn.className = 'btn btn-outline-primary';
        rollstbtn.id = 'rollstbtn';
        rollstbtn.dataset.bsToggle = 'modal';
        rollstbtn.dataset.bsTarget = '#rollCallModal';
        rollstbtn.textContent = '開始點名';
        btngroupElement.appendChild(rollstbtn);
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
        let btngroupElement = document.getElementById('btngroup');
        let rollendbtn = document.createElement('button');
        rollendbtn.type = 'button';
        rollendbtn.className = 'btn btn-outline-primary';
        rollendbtn.id = 'rollendbtn';
        rollendbtn.dataset.bsToggle = 'modal';
        rollendbtn.dataset.bsTarget = '#rollCallModalrec';
        rollendbtn.textContent = '點名紀錄';
        btngroupElement.appendChild(rollendbtn);
        document.getElementById('passwordrec').value = num;
        document.getElementById('rollCallEndTimerec').value = '結束時間：' + endTime.toLocaleString(undefined, options);
    }
}
let thisRollState;
function setRollcallRec(eventId) {
    $.ajax({
        url: "/events/" + eventId,
        type: "GET",
        headers: { "Authorization": 'Bearer ' + sessionStorage.getItem("accessToken") },
        success: function (data) {
            rollcallState(data.rollcall, data.rollcallEndTime);
            thisRollState = data.rollcall;
            createList(eventId);//participant
        },
        error: function () {
            // rollcallState(0, endTime);
            console.log("獲取活動點名資訊失敗");
        }
    })
}
function createList(eventId) {
    $.ajax({
        url: "/registrations/" + eventId,
        type: "GET",
        headers: { "Authorization": 'Bearer ' + sessionStorage.getItem("accessToken") },
        success: function (data) {
            participantsData = data;
            createParticipant(data); //generate
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
$(document).ready(function () {

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
    $('#eventList').change(function () {
        eventId = $(this).val();
        let rollendbtn = document.getElementById('rollendbtn');
        let rollstbtn = document.getElementById('rollstbtn');

        if (rollendbtn) {
            rollendbtn.remove();
        }

        if (rollstbtn) {
            rollstbtn.remove();
        }
        if (eventId != "選擇一個活動") {
            setRollcallRec(eventId); //報名database
            document.getElementById('exportButton').style.display = 'block';
            document.getElementById('sendMailLink').style.display = 'block';
            document.getElementById('realTimeNotificationsLink').style.display = 'block';
        }
        else {
            let createList = document.getElementById("createList");
            createList.innerHTML = "";
            document.getElementById('exportButton').style.display = "none";
            document.getElementById('sendMailLink').style.display = "none";
            document.getElementById('realTimeNotificationsLink').style.display = "none";
        }
    });
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
            let rollstbtn = document.getElementById('rollstbtn');
            rollstbtn.remove();
            setRollcallRec(eventId)
        });

    });
    document.getElementById('exportButton').addEventListener('click', function () {
        exportToExcel(participantsData);
    });
    document.getElementById('sendMailLink').addEventListener('click', function () {
        window.location.href = './SendMail.html?eventId=' + eventId;
    });

    document.getElementById('realTimeNotificationsLink').addEventListener('click', function () {
        window.location.href = './Real-timeNotifications.html?eventId=' + eventId;
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
