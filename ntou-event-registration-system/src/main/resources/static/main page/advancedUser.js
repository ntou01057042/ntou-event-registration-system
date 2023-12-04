$.ajax({
    url: "/events",
    type: "GET",
    success: function (response) {
        console.log("success：" + response);
        createCampaign(response);
    }
});

function createCampaign(data) {
    let createList = document.getElementById("createList");
    for (let i = 0; i < data.length; i++) {
        let campaign = document.createElement("a");
        campaign.classList.add("list-group-item", "list-group-item-action");
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            date: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        };
        let startTime = new Date(data[i].startTime);
        campaign.textContent = data[i].title + startTime.toLocaleString(undefined, options);
        campaign.addEventListener('click', () => {
            localStorage.removeItem('eventID');
            localStorage.setItem('eventID', data[i].id);
            window.location.assign('../management/eventManagementPage.html',);
        });
        createList.appendChild(campaign);
    }
}

