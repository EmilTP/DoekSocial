$(document).ready(() => {

    SDK.Student.loadNavbar();

    $("#login-button").click(() => {

        const email = $("#login-name").val();
        const password = $("#login-password").val();

        SDK.Student.login(email, password, (err, data) => {
            if (err && err.xhr.status === 401) {
                $(".margin-bottom").addClass("has-error");
            }
            else if (err) {
                console.log("Something went wrong")
            } else {
                window.location.href = "Home.html";
            }
        });

    });

});