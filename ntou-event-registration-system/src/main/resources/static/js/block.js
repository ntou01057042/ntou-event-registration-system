$(document).ready(function () {
    $.ajax({
        url: "/blocks",
        type: "GET",
        headers: { "Authorization": 'Bearer ' + sessionStorage.getItem("accessToken") },
        success: function (response) {
            getBlock(response);
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


function getBlock(data) {
    let blockList = document.getElementById("block");
    blockList.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        let block = document.createElement("a");
        block.classList.add("list-group-item", "list-group-item-action");
        let conn = document.createElement("div");
        conn.classList.add("container");
        let wword = document.createElement("div");
        wword.classList.add("d-flex", "col", "align-items-center");
        let tid = data[i].targetId;

        $.ajax({
            url: "/users/" + tid,
            type: "GET",
            success: function (response) {
                wword.textContent = response.name;
            },
            error: function (jqXHR, textStatus, errorThrow) {
                if (jqXHR.responseText === 'Expired JWT!') {
                    alert('驗證已過期，請重新登入！');
                    localStorage.setItem('redirect', 'eventManagement.html');
                    window.location.assign("/html/login.html");
                }
            }
        });
        conn.appendChild(wword);

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-danger");
        deleteButton.style.float = "right";
        deleteButton.textContent = "刪除";

        deleteButton.addEventListener('click', () => {
            console.log("click delete");
            let result = confirm("確認刪除");
            if (result) {
                $.ajax({
                    url: "/blocks" + "?targetId=" + tid,
                    type: "DELETE",
                    headers: {"Authorization": 'Bearer ' + sessionStorage.getItem("accessToken")},
                    success: function (response) {
                        alert("刪除成功");
                        location.reload();
                    },
                    error: function (jqXHR, textStatus, errorThrow) {
                        if (jqXHR.responseText === 'Expired JWT!') {
                            alert('驗證已過期，請重新登入！');
                            localStorage.setItem('redirect', 'eventManagement.html');
                            window.location.assign("/html/login.html");
                        }
                    }
                });
            }
        });

        conn.appendChild(deleteButton);
        block.appendChild(conn);
        blockList.appendChild(block);
    }
}