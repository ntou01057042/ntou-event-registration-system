$(document).ready(function () {
    $.ajax({
        url: "/events/userEvent",
        type: "GET",
        headers: { "Authorization": 'Bearer ' + sessionStorage.getItem("accessToken") },
        success: function (response) {
            createCampaign(response);
        },
        error: function(jqXHR, textStatus, errorThrow) {
            if (jqXHR.responseText === 'Expired JWT!') {
                alert('驗證已過期，請重新登入！');
                localStorage.setItem('redirect', 'eventManagement.html');
                window.location.assign("/html/login.html");
            }
        }
    });
})

function createCampaign(data) {
    let createList = document.getElementById("createList");
    for (let i = 0; i < data.length; i++) {
        let campaign = document.createElement("a");
        campaign.id = "list";
        campaign.classList.add("list-group-item", "list-group-item-action");
        let con = document.createElement("div");
        con.id = "butRow";
        con.classList.add("row", "px-1");
        let word = document.createElement("span");
        word.classList.add("d-flex","align-items-center");
        word.id = "word";
        word.textContent = data[i].title;
        campaign.appendChild(word);

        let lockButton = document.createElement("button");

        let lockCon = document.createElement("div");
        lockCon.classList.add( "col-sm-4", "p-1");
        lockCon.id = "eventBut";
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
                        alert("鎖定成功");
                        location.reload();
                    },
                    error: function(jqXHR, textStatus, errorThrow) {
                        if (jqXHR.responseText === 'Expired JWT!') {
                            alert('驗證已過期，請重新登入！');
                            localStorage.setItem('redirect', 'eventManagement.html');
                            window.location.assign("/html/login.html");
                        }
                    }
                });

            }

        });
        lockCon.appendChild(lockButton);

        let manCon = document.createElement("div");
        manCon.classList.add( "col-sm-4", "p-1");
        let eventMan = document.createElement("button");
        eventMan.classList.add("btn", "btn-link");
        eventMan.id = "eventBut";
        eventMan.textContent = "修改活動";
        eventMan.addEventListener('click', () => {
            localStorage.removeItem('eventID');
            localStorage.setItem('eventID', data[i].id);
            window.location.assign('/html/modifyEvent.html',);
        });
        manCon.appendChild(eventMan);

        let delCon = document.createElement("div");
        delCon.classList.add( "col-sm-4", "p-1");
        let delButton = document.createElement("button");
        delButton.id = "eventBut";
        delButton.classList.add("btn", "btn-outline-danger");
        delButton.textContent = "刪除活動";
        delButton.addEventListener('click', ()=>{
            let result = confirm("確認刪除");
            if (result){
                $.ajax({
                    url: "/events/" + data[i].id,
                    type: "DELETE",
                    headers: { "Authorization": 'Bearer ' + sessionStorage.getItem("accessToken") },
                    success: function (response) {
                        alert("刪除成功");
                        location.reload();
                    },
                    error: function(jqXHR, textStatus, errorThrow) {
                        if (jqXHR.responseText === 'Expired JWT!') {
                            alert('驗證已過期，請重新登入！');
                            localStorage.setItem('redirect', 'eventManagement.html');
                            window.location.assign("/html/login.html");
                        }
                    }
                });
            }
        })
        delCon.appendChild(delButton)

        con.appendChild(manCon);
        con.appendChild(delCon);
        con.appendChild(lockCon);
        campaign.appendChild(con);
        createList.appendChild(campaign);
    }
}
