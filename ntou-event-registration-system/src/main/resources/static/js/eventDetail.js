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
            console.log(data);
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
                    localStorage.setItem('redirect', `eventDetail.html?id=${id}`);
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
    if (typeof (data.restrict) === 'boolean') {
        eventCondition = data.restrict;
        if (data.restrict) {
            document.getElementById('sign_up').disabled = true;
            document.getElementById('sign_up').innerHTML = "報名截止";
        }
    }
}


function loadComment() {
    $.ajax({
        url: "/comments/" + id,
        type: "GET",
        success: function (data) {
            console.log(data);
            let commentArea = document.getElementById("comments");
            commentArea.innerHTML = "";
            for (let i = 0; i < data.length; ++i) {

                console.log(commentArea);
                commentArea.innerHTML += `
                            <div class="card mt-3 commentArea">
                                <div class="card-body align-items-center">
                                    <img src="../img/user_circle.png" alt="circle" class="userCircle me-3">
                                    ${data[i].text}
                                    <button class="dropdown" id="${data[i].id}">
                                        <div><img src="../img/ellipsis.svg" alt="ellipsis"></div>
                                        <div class="dropdown-content" id="dropdown-content-${data[i].id}">
                                            <span>檢舉</span>
                                        </div>
                                    </button>
                                </div>
                                
                            </div>
                        `
            }
            for (let i = 0; i < data.length; ++i) {
                addDropDownButton(data[i].id);
            }
        }
    })

}

function addDropDownButton(id) {
    document.addEventListener('click', function (event) {
        let myElement = document.getElementById(id);
        let hideElement = document.getElementById("dropdown-content-" + id);
        let targetElement = event.target;

        // 檢查點擊事件是否發生在目標元素之外
        if (targetElement !== myElement && !myElement.contains(targetElement)) {
            hideElement.style.display = 'none'; // 隱藏指定元素
        }
    });

// 點擊顯示元素
    document.getElementById(id).addEventListener('click', function (event) {
        let hideElement = document.getElementById('dropdown-content-' + id);
        event.stopPropagation(); // 防止點擊事件冒泡到 document 上
        hideElement.style.display = 'block'; // 顯示指定元素
    });

    document.getElementById("dropdown-content-" + id).addEventListener('click', function (event) {
        let dropdownContentElement = this;
        $.ajax({
            url: "/comments/" + id,
            type: "POST",
            headers: {"Authorization": 'Bearer ' + sessionStorage.getItem("accessToken")},
            success: function (response) {
                console.log("成功");
                window.alert("檢舉成功");
                dropdownContentElement.style.display = 'none';
            },
            error: function (jqXHR, textStatus, errorThrow) {
                if (jqXHR.responseText === 'Expired JWT!') {
                    alert('驗證已過期，請重新登入！');
                    localStorage.setItem('redirect', 'createEvent.html');
                    window.location.assign("/html/login.html");
                }
            }
        })
    });
}


