$(document).ready(() => {

    SDK.User.loadNav();

    $("#login-button").click(() => {

        const email = $("#login-name").val();
        const password = $("#login-password").val();

        SDK.User.login(email, password, (err, data) => {
            if (err && err.xhr.status === 401) {
                $(".margin-bottom").addClass("has-error");
            }
            else if (err) {
                console.log("Bad stuff happened")
            } else {
                window.location.href = "Home.html";
            }
        });

    });

});