


function loading() {
    let url = "/events";
    $.ajax({
        url: url,
        type: "GET",
        success: function (data) {
            console.log(data);
            events = data;
            campaign(data);
        }
        /**
         success: function (data) {
         $.getJSON("./file/test.events.json", function (data) {
         campaign(data);
         });
         }**/
    })

}

function  loadManu(){
    $.getJSON("file/categories.json", function (data) {
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
}

function filterCampaignsByCategory(category) {
    const data = events.filter(function (event) {
        return event.from === category;
    });

    document.getElementById("campaigns").innerHTML = "";
    campaign(data);
}

function campaign(data) {
    for (let i = 0; i < data.length; i++) {
        let campaign = document.createElement("div");
        campaign.className = "col-md-6 col-xl-4";
        let startTime = new Date(data[i].startTime);
        let endTime = new Date(data[i].endTime);
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        };

        campaign.innerHTML = `
                    <div class = "card">
                        <div class="card-body">
                            <div class="card-title">${data[i].title}</div>
                            <p class="card-text">${data[i].describe}</p>
                            <p class="card-text">Start Time: ${startTime.toLocaleString(undefined, options)}</p>
                            <p class="card-text">End Time: ${endTime.toLocaleString(undefined, options)}</p>
                         </div>
                    </div>

                `;
        campaign.addEventListener('click', () => {
            localStorage.removeItem('eventID');
            localStorage.setItem('eventID', data[i].id);
            console.log(data[i].id);
            window.location.assign('../management/activeDetail.html',);
        });
        document.getElementById("campaigns").appendChild(campaign);
    }
    console.log(localStorage);
}

function showSearchResults() {
    document.getElementById("campaigns").innerHTML = "";
    $.ajax({
        success: function (data) {
            for (const i in data) {
                let campaign = document.createElement("div");
                campaign.className = "col-md-6 col-xl-4";
                const startTime = new Date(data[i].startTime);
                const endTime = new Date(data[i].endTime);
                const options = {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                };

                campaign.innerHTML += `
                            <div class="card">
                                <div class="card-body">
                                    <div class="card-title">${data[i].title}</div>
                                    <p class="card-text">${data[i].describe}</p>
                                    <p class="card-text">Start Time: ${startTime.toLocaleString(undefined, options)}</p>
                                    <p class="card-text">End Time: ${endTime.toLocaleString(undefined, options)}</p>
                                </div>
                            </div>
                        `;
                campaign.addEventListener('click', () => {
                    localStorage.removeItem('eventID');
                    localStorage.setItem('eventID', data[i].id);
                    console.log(data[i].id);
                    window.location.assign('../management/activeDetail.html',);
                });
                document.getElementById("campaigns").appendChild(campaign);
            }
        },
        url: "events/search?keyword=" + localStorage.getItem("keyword"),
    });
}

$(document).ready(function () {
    // Check for the query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const functionName = urlParams.get('functionToExecute');

    // Execute the corresponding function
    if (functionName) {
        window[functionName]();
    }else{
        loading();
    }

    loadManu();

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
            importExternal('navbar/navbar.js');

        });

});

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

