$(document).ready(() => {

    SDK.User.loadNav();

    $("#NewUser-button").click(() => {

        const email = $("#new-name").val();
        const password = $("#new-pass").val();

        SDK.User.login(email, password, (err, data) => {
            if (err && err.xhr.status === 401) {
                $(".margin-bottom").addClass("has-error");
            }
            else if (err) {
                console.log("BAd stuff happened")
            } else {
                window.location.href = "Login.html";
            }
        });

    });

});