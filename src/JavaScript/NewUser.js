$(document).ready(() => {

    SDK.Student.loadNavbar();

    $("#NewUser-button").click(() => {

        const firstName = $("#first-name").val();
        const lastName = $("#last-name").val();
        const email = $("#login-mail").val();
        const newPass = $("#new-pass").val();
        const verifyPass = $("#verify-pass").val();

        SDK.Student.registerStudent(firstName, lastName, email, newPass, verifyPass (err, data) => {
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