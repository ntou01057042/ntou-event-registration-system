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