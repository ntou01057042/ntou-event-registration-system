let eventId;
let title;

function createParticipant(data) {
    console.log(data);
    let createList = document.getElementById("createList");
    for (let i = 0; i < data.length; i++) {
        let participant = document.createElement("a");
        participant.classList.add("list-group-item", "list-group-item-action");
        participant.href = "#";
        participant.textContent = data[i]._id.$oid;
        createList.appendChild(participant);

    }
}

$(document).ready(function () {
    let id = localStorage.getItem("eventID");
    console.log(id);
    $.ajax({
        url: "/registrations/" + id,
        type: "GET",
        success: function (data) {
            participantsData = data;
            createParticipant(data);
        },
        error: function () {
            $.getJSON('../json/test.registrations.json', function (data) {
                participantsData = data;
                console.log(data);
                createParticipant(data);
            })
        }

    });
    $.ajax({
        url: "/events/" + id,
        type: "GET",
        success: function (data) {
            title = data.title;
            document.getElementById('title').innerHTML = title;
        }
    })

    document.getElementById('exportButton').addEventListener('click', function () {
        exportToExcel(participantsData);
    });
})

function exportToExcel(data) {
    var filteredData = data.map(function (item) {
        return {
            name: item.name,
            studentID: item.studentID,
            phoneNumber: item.phoneNumber,
            email: item.email
        };
    });

    var worksheet = XLSX.utils.json_to_sheet(filteredData);
    var workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Participants");
    let file = "okok" + ".xlsx";
    XLSX.writeFile(workbook, file);
}