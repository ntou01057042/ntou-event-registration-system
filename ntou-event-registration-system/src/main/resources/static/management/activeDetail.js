window.addEventListener("load", function () {
    loading();
    fetch('../navbar/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
            // document.getElementById("search-bar").addEventListener("keypress", function (event) {
            //     if (event.key === "Enter") {
            //         event.preventDefault();
            //         showSearchResults();
            //     }
            // });
            // document.getElementById("search-button").addEventListener("click", showSearchResults);
            importExternal('../navbar/navbar.js');

        });
},false);

function importExternal(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.onload = () => resolve(window['external_global_component']);
        script.onerror = reject;

        document.body.appendChild(script);
    });
}

let id;

function loading() {
    id = localStorage.getItem("eventID");
    $.ajax({
        url: "/events/" + id,
        type: "GET",
        success: function (data) {
            console.log(data);
            campaign(data);
        }
    })

    $.getJSON("../file/categories.json", function (data) {
        let selectElement = document.getElementById("classFrom");
        for (let category in data) {
            if (data.hasOwnProperty(category)) {
                data[category].forEach(function (unit) {
                    let button = document.createElement("button");
                    button.className = "btn";
                    button.textContent = unit;
                    button.addEventListener("click", function () {
                        let buttonText = $(this).text();
                        console.log(unit);
                        filterCampaignsByCategory(unit);
                    });
                    selectElement.appendChild(button);
                });
            }
        }
    });
    document.getElementById("sign_up").addEventListener('click', () => {
        localStorage.removeItem('eventID');
        localStorage.setItem('eventID', id);
        window.location.assign('signUpPage.html',);
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
            url: "/events/" + id
        });
    });

    loadComment();
}

function campaign(data) {
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
        url: "/events/" + id,
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


