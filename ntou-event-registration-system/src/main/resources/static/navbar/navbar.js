console.log("ok");
document.getElementById("search-bar").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        console.log("ok");
        localStorage.setItem("keyword", document.getElementById("search-bar").value);
        window.location.href = '../homepage.html?functionToExecute=showSearchResults';
    }
});
document.getElementById("search-button").addEventListener("click", function (event) {
    console.log("ok");
    localStorage.setItem("keyword", document.getElementById("search-bar").value);
    window.location.href = '../homepage.html?functionToExecute=showSearchResults';
});