document.getElementById("search-bar").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const keyword = encodeURIComponent(document.getElementById("search-bar").value);
        window.location.href = `../homepage/homepage.html?functionToExecute=showSearchResults&keyword=${keyword}`;
    }
});
document.getElementById("search-button").addEventListener("click", function (event) {
    const keyword = encodeURIComponent(document.getElementById("search-bar").value);
    window.location.href = `../homepage/homepage.html?functionToExecute=showSearchResults&keyword=${keyword}`;
});

document.getElementById("logout").addEventListener("click", () => {
    if (sessionStorage.getItem("accessToken")) {
        sessionStorage.clear();
        window.location.href = `../homepage/homepage.html`;
    } else {
        window.location.href = `../login/login.html`;
    }
});

document.getElementById("member").addEventListener("click", () => {
    if (!sessionStorage.getItem("accessToken")) {
        window.location.href = `../login/login.html`;
    } else {
        if (sessionStorage.getItem("authority") === "GENERAL") {
            window.location.href = '../main page/generalUser.html';
        } else if (sessionStorage.getItem("authority") === "ADVANCED") {
            window.location.href = '../main page/advancedUser.html';
        } else if (sessionStorage.getItem("authority") === "ADMIN") {
            window.location.href = '';
        }
    }
});

if (sessionStorage.getItem("accessToken")) {
    document.getElementById("current-user-name").innerText = sessionStorage.getItem("name");
    document.getElementById("logout").innerHTML = `
        <img src="../img/logout.png" height="25" alt="logout" loading="lazy" />
        <span>&nbsp;登出&nbsp;</span>
    `;
    document.getElementById("vr").hidden = false;
}
