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
        word.textContent = data[i].id;
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

$(document).ready(function () {
    let id = localStorage.getItem("eventID");
    console.log(id);

    $('#eventList').change(function () {

        let eventId = $(this).val();
        if (eventId !== "請選擇一個活動") {
            $.ajax({
                url: "/registrations/" + eventId,
                type: "GET",
                headers: { "Authorization": 'Bearer ' + sessionStorage.getItem("accessToken") },
                success: function (data) {
                    participantsData = data;
                    createParticipant(data);
                },
                error: function(jqXHR, textStatus, errorThrow) {
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
        error: function(jqXHR, textStatus, errorThrow) {
            if (jqXHR.responseText === 'Expired JWT!') {
                alert('驗證已過期，請重新登入！');
                localStorage.setItem('redirect', 'participant.html');
                window.location.assign("/html/login.html");
            }
        }
    })
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
