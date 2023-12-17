function loading() {
    let url = "/events";
    $.ajax({
        url: url,
        type: "GET",
        success: function (data) {
            addEventsCard(data);
        }
    })

}

function showSearchResults(keyword) {
    console.log("show");
    document.getElementById("events").innerHTML = "";
    $.ajax({
        url: `/events/search?keyword=${keyword}`,
        success: function (data){
            console.log(data)
            addEventsCard(data)
        },
    });
}

function addEventsCard(data){
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
            window.location.assign(`/html/eventDetail.html?id=${data[i].id}`);
        });
        document.getElementById("events").appendChild(campaign);
    }
}

document.addEventListener("DOMContentLoaded", function () {

    // Check for the query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const functionName = urlParams.get('functionToExecute');
    const keyword = urlParams.get('keyword');
    console.log(functionName);
    console.log(keyword);

    // Execute the corresponding function
    if ((functionName === "showSearchResults") && window[functionName]) {
        console.log("search");
        window[functionName](keyword);
    }else if((functionName === "filterEventsByCategory") && window[functionName]){
        console.log("filter");
        $.ajax({
            url: "/events",
            type: "GET",
            success: function (data) {
                window[functionName](keyword, data);
            }
        });
    }else{
        loading();
    }


    fetch('/html/menu.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('menu').innerHTML = data;

            loadNavbarScript('/js/menu.js');

        });

});

function loadNavbarScript(src) {
    let script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);
}

function filterEventsByCategory(category, data) {

    const result = data.filter(function (data) {
        return data.from === category;
    });
    document.getElementById("events").innerHTML = "";
    addEventsCard(result);
}