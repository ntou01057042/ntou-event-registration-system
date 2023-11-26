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

if (sessionStorage.getItem("accessToken")) {
    document.getElementById("current-user-name").innerText = sessionStorage.getItem("name");
}
