$(document).ready(function () {
    $.ajax({
        url: "/events/userEvent",
        type: "GET",
        headers: { "Authorization": 'Bearer ' + sessionStorage.getItem("accessToken") },
        success: function (response) {
            createCampaign(response);
        },
        error: function () {
            console.log("取得已創建活動失敗");
        }
    });
})



function createCampaign(data) {
    let createList = document.getElementById("createList");
    for (let i = 0; i < data.length; i++) {
        let campaign = document.createElement("a");
        campaign.classList.add("list-group-item", "list-group-item-action");
        let con = document.createElement("div");
        con.classList.add("container");
        let word = document.createElement("div");
        word.classList.add("d-flex", "col", "align-items-center");
        word.textContent = data[i].title;
        con.appendChild(word);

        let lockButton = document.createElement("button");

        lockButton.style.float = "right";
        if (typeof (data[i].restrict) === 'boolean') {
            if (data[i].restrict) {
                lockButton.classList.add("btn", "btn-secondary");
                lockButton.textContent = "活動解鎖";
                lockButton.setAttribute("restrict", true);
            }
            else {
                lockButton.classList.add("btn", "btn-primary");
                lockButton.textContent = "活動鎖定";
                lockButton.setAttribute("restrict", false);
            }
            lockButton.setAttribute("eventId", data[i].id);
        }
        lockButton.addEventListener("click", function () {
            let clickedButtonId = this.getAttribute("eventId");
            let condition = this.getAttribute("restrict") === "true";
            let confirmation;
            if (condition) {
                confirmation = confirm("確定解鎖活動？");
            }
            else {
                confirmation = confirm("確定鎖定活動？");
            }
            if (confirmation) {
                $.ajax({
                    url: "/events/restrict/" + clickedButtonId,
                    type: "POST",
                    headers: { "Authorization": 'Bearer ' + sessionStorage.getItem("accessToken") },
                    success: function (response) {
                        alert("修改成功");
                        location.reload();
                    },
                    error: function () {
                        console.log("修改活動失敗");
                    }
                });

            }

        });

        let eventMan = document.createElement("button");
        eventMan.classList.add("btn", "btn-link", "me-2");
        eventMan.textContent = "管理活動";
        eventMan.addEventListener('click', () => {
            localStorage.removeItem('eventID');
            localStorage.setItem('eventID', data[i].id);
            window.location.assign('/html/modifyEvent.html',);
        });
        con.appendChild(eventMan);
        con.appendChild(lockButton);
        campaign.appendChild(con);
        createList.appendChild(campaign);
    }
}
