window.addEventListener("load", function () {
    loading();
    fetch('../navbar/searchBar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;

            loadNavbarScript('../navbar/searchBar.js');

        });

    fetch('../navbar/menu.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('menu').innerHTML = data;

            loadNavbarScript('../navbar/menu.js');

        });
},false);

function loadNavbarScript(src) {
    let script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);
}

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

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
        window.location.assign(`signUpPage.html?id=${id}`);
    });

    document.getElementById("commentForm").addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const obj = Object.fromEntries(formData.entries());

        $.ajax({
            contentType: "application/json",
            data: obj["comment"],
            success: function () {
                console.log("成功：" + JSON.stringify(obj));
                loadComment();
            },
            type: "PUT",
            url: "../events/" + id
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


}


function loadComment() {
    $.ajax({
        url: "../events/" + id,
        type: "GET",
        success: function (data) {
            console.log(data);
            let commentArea = document.getElementById("comments");
            commentArea.innerHTML = "";
            for (let i = 0; i < data["comments"].length; ++i) {

                console.log(commentArea);
                commentArea.innerHTML += `
                            <div class="card mt-3 commentArea">
                                <div class="card-body">
                                    <img src="../img/user_circle.png" alt="circle" class="userCircle me-3">
                                    ${data["comments"][i]}
                                </div>
                            </div>
                        `
            }
        }
    })

}


