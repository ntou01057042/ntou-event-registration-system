let myForm

$(document).ready(() => {
    myForm = document.getElementById("Form");
    getApplicationRecord();
    submitApplication();
})

function getApplicationRecord(){
    $.ajax({
        url: "/requests",
        type: "GET",
        headers: { "Authorization": 'Bearer ' + sessionStorage.getItem("accessToken") },
        success: function (response) {
            console.log("成功");
            if(response.status != null){
                for (let i = 0; i < myForm.elements.length; i++) {
                    myForm.elements[i].disabled = true;
                }
                document.getElementById("submitBtn").value = "審核中";
            }
        },
        error: function(jqXHR, textStatus, errorThrow) {
            if (jqXHR.responseText === 'Expired JWT!') {
                alert('驗證已過期，請重新登入！');
                localStorage.setItem('redirect', 'createEvent.html');
                window.location.assign("/html/login.html");
            }
        }
    });
}

function submitApplication(){
        myForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const obj = Object.fromEntries(formData.entries());
        obj.userId = "65619d69b4fd555ba23b957f";
        obj.name = sessionStorage.getItem("name");
        obj.email = sessionStorage.getItem("email");

        $.ajax({
            url: "/requests",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(obj),
            headers: { "Authorization": 'Bearer ' + sessionStorage.getItem("accessToken") },
            success: function () {
                console.log("成功：" + JSON.stringify(obj));
                window.alert("申請成功");
                location.reload();
            },
            error: function(jqXHR, textStatus, errorThrow) {
                if (jqXHR.responseText === 'Expired JWT!') {
                    alert('驗證已過期，請重新登入！');
                    localStorage.setItem('redirect', 'createEvent.html');
                    window.location.assign("/html/login.html");
                }
            }
        });
    });
}