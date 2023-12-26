let myContainer

$(document).ready(() => {
    myContainer = document.getElementById("createList");
    getApplicationRecord();
})

function getApplicationRecord() {
    $.ajax({
        url: "/requests/all",
        type: "GET",
        headers: {"Authorization": 'Bearer ' + sessionStorage.getItem("accessToken")},
        success: function (response) {
            console.log("成功");
            displayCards(response);
        },
        error: function (jqXHR, textStatus, errorThrow) {
            if (jqXHR.responseText === 'Expired JWT!') {
                alert('驗證已過期，請重新登入！');
                localStorage.setItem('redirect', 'authorityManagement.html');
                window.location.assign("/html/login.html");
            }
        }
    });
}

function displayCards(response) {
    myContainer.innerHTML = "";
    response.forEach(function (item) {
        let listHtml = '';
        if(item.status === "pending"){
            listHtml = `
            <div class="list-group-item">
                <div class="row">
                    <div  class="col-4 col-sm-7 align-items-center d-flex">
                        ${item.name}
                    </div>
                    <div id="butDiv" class="col-5 col-sm-4">
                        <div class="row">
                            <div class="col-sm-6 px-1">
                                <button class="btn btn-primary p-1" onclick="respondRequest('${item.id}', 'true') " style="width: 100%;">核准申請</button>
                            </div>
                            <div class="col-sm-6 px-1">
                                <button class="btn btn-outline-danger p-1" onclick="respondRequest('${item.id}', 'false')" style="width: 100%;">拒絕申請</button>
                            </div>
                        </div>
                    </div>
                    <div id="chevBtnDiv" class="col-3 col-sm-1">
                        <button data-bs-toggle="collapse" data-bs-target="#reason" class="btn-with-image btn btn-outline-light" id="chevronsBtn">
                            <img src="/img/chevron-right-solid.svg" alt="" id="chevrons">
                        </button>
                    </div>
                </div>
                <div id="reason" class="collapse">
                    <br>
                    申請理由: ${item.reason}
                </div>
            </div>
            `;
            myContainer.innerHTML += listHtml;

            const rotateButton = document.getElementById('chevronsBtn');
            const rotatingImage = document.getElementById('chevrons');
            let isRotated = false;

            rotateButton.addEventListener('click', function() {
                rotatingImage.style.transform = isRotated ? 'rotate(0deg)' : 'rotate(90deg)';
                isRotated = !isRotated;
            });
        }
    })
}

function respondRequest(id, respond){
    let result = confirm("確認更新");
    if(result){
        $.ajax({
            url: "/requests/" + id + "?approved=" + respond,
            type: "PUT",
            headers: {"Authorization": 'Bearer ' + sessionStorage.getItem("accessToken")},
            success: function (response) {
                console.log("成功");
                window.alert("更新成功");
                location.reload();
            },
            error: function (jqXHR, textStatus, errorThrow) {
                if (jqXHR.responseText === 'Expired JWT!') {
                    alert('驗證已過期，請重新登入！');
                    localStorage.setItem('redirect', 'authorityManagement.html');
                    window.location.assign("/html/login.html");
                }
            }
        });
    }
}