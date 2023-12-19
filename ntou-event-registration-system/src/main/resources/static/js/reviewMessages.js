let myContainer

$(document).ready(() => {
    myContainer = document.getElementById("createList");
    getApplicationRecord();
})

function getApplicationRecord() {
    $.ajax({
        url: "/comments",
        type: "GET",
        headers: {"Authorization": 'Bearer ' + sessionStorage.getItem("accessToken")},
        success: function (response) {
            console.log("成功");
            displayCards(response);
        },
        error: function (jqXHR, textStatus, errorThrow) {
            if (jqXHR.responseText === 'Expired JWT!') {
                alert('驗證已過期，請重新登入！');
                localStorage.setItem('redirect', 'reviewMessages.html');
                window.location.assign("/html/login.html");
            }
        }
    });
}

function displayCards(response) {
    myContainer.innerHTML = "";
    response.forEach(function (item) {
        let listHtml = '';
        if (item.report > 0) {
            listHtml = `
            <div class="list-group-item">
                <div class="row">
                    <div  class="col-6 col-sm-7 align-items-center" style="word-wrap: break-word;">
                        ${item.text}
                    </div>
                    <div  class="col-1 col-sm-1 align-items-center p-0 d-flex" >
                        ${item.report}
                    </div>
                    <div id="butDiv" class="col-5 col-sm-4">
                        <div class="row">
                            <div class="col-sm-6 px-1">
                                <button class="btn btn-outline-primary p-1" onclick="respondRequest('${item.id}', 'ignore') " style="width: 100%;">忽略</button>
                            </div>
                            <div class="col-sm-6 px-1">
                                <button class="btn btn-danger p-1" onclick="respondRequest('${item.id}', 'delete')" style="width: 100%;">刪除留言</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
            myContainer.innerHTML += listHtml;
        }
    })
}

function respondRequest(id, respond) {
    let result = confirm("確認更新");
    if (result) {
        if (respond === "delete") {
            $.ajax({
                url: "/comments/" + id,
                type: "DELETE",
                headers: {"Authorization": 'Bearer ' + sessionStorage.getItem("accessToken")},
                success: function (response) {
                    console.log("成功");
                    window.alert("刪除成功");
                    location.reload();
                },
                error: function (jqXHR, textStatus, errorThrow) {
                    if (jqXHR.responseText === 'Expired JWT!') {
                        alert('驗證已過期，請重新登入！');
                        localStorage.setItem('redirect', 'reviewMessages.html');
                        window.location.assign("/html/login.html");
                    }
                }
            });
        } else if (respond === "ignore") {

        }

    }
}