$(document).ready(function () {
    document.getElementById("login-in").addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const obj = Object.fromEntries(formData.entries());
        console.log(JSON.stringify(obj));
        $.ajax({
            contentType: "application/json",
            data: JSON.stringify(obj),
            success: function (data) {
                sessionStorage.setItem('accessToken', data.accessToken);
                sessionStorage.setItem('email', data.username);
                sessionStorage.setItem('name', data.name);
                sessionStorage.setItem('authority', data.authority);
                window.location.assign('homepage.html',);
            },
            error: function (xhr) {
                if (xhr.status === 403) {
                    alert("帳號密碼錯誤！");
                }
            },
            type: "POST",
            url: "/auth/login"
        });
    });
    updateOptions("../file/department.json");
    $('#identity').change(function () {
        let identity = $(this).val();
        let dataUrl = '';
        if (identity === '學生' || identity === '教職員') {
            dataUrl = "../file/department.json";
        } else if (identity === '行政人員') {
            dataUrl = "../file/office.json";
        }
        updateOptions(dataUrl);
    });

    document.getElementById("login-up").addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");
        if (password !== confirmPassword) {
            alert("密碼不匹配！");
            return;
        }
        const filteredData = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password")
        };
        console.log(JSON.stringify(filteredData));
        $.ajax({
            contentType: "application/json",
            data: JSON.stringify(filteredData),
            success: function () {
                console.log("成功：" + JSON.stringify(filteredData));
                alert("註冊成功");
                location.reload();
            },
            error: function (xhr) {
                if (xhr.status === 403) {
                    alert("錯誤：信箱已被使用！");
                }
            },
            type: "POST",
            url: "/users"
        });
    });
});

function updateOptions(dataUrl) {
    $.getJSON(dataUrl, function (data) {
        let selectElement = document.getElementById("organization");
        selectElement.innerHTML = '';
        for (let category in data) {
            if (data.hasOwnProperty(category)) {
                data[category].forEach(function (unit) {
                    let option = document.createElement("option");
                    option.value = unit;
                    option.text = unit;
                    selectElement.appendChild(option);
                });
            }
        }
    });
}