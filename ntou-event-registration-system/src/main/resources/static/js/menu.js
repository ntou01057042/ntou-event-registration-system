loadMenu();
function  loadMenu(){
    $.getJSON("../json/categories.json", function (data) {
        let selectElement = document.getElementById("classFrom");
        for (let category in data) {
            if (data.hasOwnProperty(category)) {
                data[category].forEach(function (unit) {
                    let button = document.createElement("button");
                    button.className = "btn text-center col";
                    button.style.wordWrap = 'break-word';
                    button.textContent = unit;
                    button.addEventListener("click", function () {
                        console.log(unit);
                        window.location.href = `/html/homepage.html?functionToExecute=filterEventsByCategory&keyword=${unit}`;
                    });
                    selectElement.appendChild(button);
                });
            }
        }
    });
}