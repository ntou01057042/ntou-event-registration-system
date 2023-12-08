document.getElementById("search-bar").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const keyword = encodeURIComponent(document.getElementById("search-bar").value);
        window.location.href = `/html/homepage.html?functionToExecute=showSearchResults&keyword=${keyword}`;
    }
});
document.getElementById("search-button").addEventListener("click", function (event) {
    const keyword = encodeURIComponent(document.getElementById("search-bar").value);
    window.location.href = `/html/homepage.html?functionToExecute=showSearchResults&keyword=${keyword}`;
});

document.getElementById("logout").addEventListener("click", () => {
    if (sessionStorage.getItem("accessToken")) {
        sessionStorage.clear();
        window.location.href = `/html/homepage.html`;
    } else {
        window.location.href = `/html/login.html`;
    }
});

document.getElementById("member").addEventListener("click", () => {
    if (!sessionStorage.getItem("accessToken")) {
        window.location.href = `/html/login.html`;
    } else {
        window.location.href = '../html/user.html';
    }
});

if (sessionStorage.getItem("accessToken")) {
    document.getElementById("current-user-name").innerText = sessionStorage.getItem("name");
    document.getElementById("logout").innerHTML = `
        <img src="/img/logout.png" height="25" alt="logout" loading="lazy" />
        <span>&nbsp;登出&nbsp;</span>
    `;
    document.getElementById("vr").hidden = false;
}
