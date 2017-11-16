$(document).ready(() => {

    SDK.Student.loadNavbar();

    $("#newUser-button").click(() => {

        const firstName = $("#first-name").val();
        const lastName = $("#last-name").val();
        const email = $("#login-mail").val();
        const newPass = $("#new-pass").val();
        const verifyPass = $("#verify-pass").val();

        SDK.Register.registerStudent(firstName, lastName, email, newPass, verifyPass, (err, data) => {
            if (err && err.xhr.status === 400) {
                $(".margin-bottom").addClass("Error");
            }
            else if (err) {
                console.log(err)
            } else {
                window.alert(firstName + "Succesful sign-up!");
                window.location.href = "Home.html";
            }
        });

    });

});