window.addEventListener("load", function () {
    loading();
    fetch('/html/searchBar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;

            loadNavbarScript('/js/searchBar.js');

        });

    fetch('/html/menu.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('menu').innerHTML = data;

            loadNavbarScript('/js/menu.js');

        });
}, false);

function loadNavbarScript(src) {
    let script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);
}

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
let eventCondition = false;

function loading() {
    $.ajax({
        url: "../events/" + id,
        type: "GET",
        success: function (data) {
            events(data);
        }
    })

    document.getElementById("sign_up").addEventListener('click', () => {
        if (!eventCondition) {
            window.location.assign(`signUpPage.html?id=${id}`);
        } else {
            alert("無法報名!");
        }
    });

    document.getElementById("commentForm").addEventListener("submit", function (event) {
        event.preventDefault();
        // const formData = new FormData(event.target);
        // console.log(formData)
        // const obj = Object.fromEntries(formData.entries());
        // console.log(obj)
        const comment = document.getElementById("comment").value;
        // console.log(comment);

        $.ajax({
            contentType: "application/json",
            headers: {"Authorization": 'Bearer ' + sessionStorage.getItem("accessToken")},
            data: JSON.stringify({
                "eventId": id,
                "text": comment
            }),
            success: function () {
                // console.log("成功：" + JSON.stringify(obj));
                loadComment();
            },
            error: function (jqXHR, textStatus, errorThrow) {
                if (jqXHR.responseText === 'Expired JWT!') {
                    alert('驗證已過期，請重新登入！');
                    localStorage.setItem('redirect', 'eventDetail.html?id=' + id);
                    window.location.assign("/html/login.html");
                }
            },
            type: "POST",
            url: "/comments"
        });
    });

    loadComment();
}

function events(data) {
    let detail = document.getElementById("info");
    let startTime = new Date(data.startTime);
    let endTime = new Date(data.endTime);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    };
    detail.innerHTML = `
                   <div class="text-center card">
                       <h3 class="m-3">${data.title}</h3>
                       <h4 class="m-3">${startTime.toLocaleString(undefined, options)}</h4>
                       <h4 class="m-3">${endTime.toLocaleString(undefined, options)}</h4>
                       <p class="m-3">${data.describe}</p>
                       <p class="m-3">${data.venue}</p>
                   </div>

            `;
    // 報名button
    let currentTime = new Date();
    if (typeof (data.restrict) === 'boolean') {
        eventCondition = data.restrict;
        if (data.restrict) {
            document.getElementById('sign_up').disabled = true;
            document.getElementById('sign_up').innerHTML = "報名截止";
        } else if (currentTime > endTime) {
            document.getElementById('sign_up').disabled = true;
            document.getElementById('sign_up').innerHTML = "活動已結束";
        }
    }


    let limit = data.maxPeople;
    $.ajax({
        url: "/registrations/" + data.id,
        type: "GET",
        success: function (data) {
            let now = data.length;
            if (limit <= now) {
                document.getElementById('sign_up').disabled = true;
                document.getElementById('sign_up').innerHTML = "已額滿";
            } else {
                document.getElementById('sign_up').innerHTML += '<div style="font-size: 13px;">已報名:' + now + '</div>';
            }
        },
        error: function (jqXHR, textStatus, errorThrow) {
            console.log("獲取報名資料失敗");
            if (jqXHR.responseText === 'Expired JWT!') {
                alert('驗證已過期，請重新登入！');
                localStorage.setItem('redirect', 'eventDetail.html?id=' + id);
                window.location.assign("/html/login.html");
            }
        }
    });

}


function loadComment() {
    $.ajax({
        url: "/comments/" + id,
        type: "GET",
        success: function (data) {
            let commentArea = document.getElementById("comments");
            commentArea.innerHTML = "";
            for (let i = 0; i < data.length; ++i) {
                commentArea.innerHTML += `
                            <div class="card mt-3 commentArea">
                                <div class="card-body align-items-center row">
                                    <div class="col-2 col-sm-1 p-0">
                                        <img src="../img/user_circle.png" alt="circle" class="userCircle ms-1">
                                    </div>
                                    <div class="col-8 col-sm-10 p-0">
                                        ${data[i].text}
                                    </div>
                                    <div class="col-2 col-sm-1 p-0">
                                        <button class="dropdown" id="${data[i].id}">
                                            <div><img src="../img/ellipsis.svg" alt="ellipsis"></div>
                                            <div class="dropdown-content" id="dropdown-content-${data[i].id}">
                                                <span>檢舉</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `
            }
            for (let i = 0; i < data.length; ++i) {
                addReportButton(data[i].id);
            }
            addDropdownBtn();
        }
    })

}

let moreOptionsBtns = document.querySelectorAll('.dropdown');
let optionsMenus = document.querySelectorAll('.dropdown-content');

function addDropdownBtn() {
    moreOptionsBtns = document.querySelectorAll('.dropdown');
    optionsMenus = document.querySelectorAll('.dropdown-content');
    // 點擊按鈕時顯示選單
    moreOptionsBtns.forEach((btn, index) => {
        btn.addEventListener('click', (event) => {
            event.stopPropagation(); // 防止點擊事件傳播到 document
            btn.classList.add('on');
            btn.classList.remove('off');
            // 隱藏其他選單
            optionsMenus.forEach((menu, i) => {
                if (i !== index) {
                    menu.style.display = 'none';
                }
            });
            moreOptionsBtns.forEach((btn, i) => {
                if (i !== index) {
                    btn.classList.add('off');
                    btn.classList.remove('on');
                }
            });

            // 切換顯示或隱藏選單
            const menu = optionsMenus[index];
            menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
        });
    });

    // 監聽整個文件的點擊事件
    document.addEventListener('click', (event) => {
        // 當點擊發生在非選單區域時，隱藏所有選單
        if (!event.target.matches('.more-options-btn')) {
            optionsMenus.forEach((menu) => {
                menu.style.display = 'none';

            });
            moreOptionsBtns.forEach((btn) => {
                btn.classList.add('off');
                btn.classList.remove('on');
            })
        }
    });
}

function addReportButton(comId) {
    document.getElementById("dropdown-content-" + comId).addEventListener('click', function (event) {
        let dropdownContentElement = this;
        $.ajax({
            url: "/comments/" + comId,
            type: "POST",
            headers: {"Authorization": 'Bearer ' + sessionStorage.getItem("accessToken")},
            success: function (response) {
                window.alert("檢舉成功");
                dropdownContentElement.style.display = 'none';
                moreOptionsBtns.forEach((btn) => {
                    btn.classList.add('off');
                    btn.classList.remove('on');
                })
            },
            error: function (jqXHR, textStatus, errorThrow) {
                if (jqXHR.responseText === 'Expired JWT!') {
                    alert('驗證已過期，請重新登入！');
                    localStorage.setItem('redirect', 'eventDetail.html?id=' + id);
                    window.location.assign("/html/login.html");
                }
            }
        })
    });
}


