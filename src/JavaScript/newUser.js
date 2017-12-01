$(document).ready(() => {

    SDK.Student.loadNavbar();

    $("#newUser-button").click(() => {

        const firstName = $("#first-name").val();
        const lastName = $("#last-name").val();
        const email = $("#login-mail").val();
        const newPass = $("#new-pass").val();
        const verifyPass = $("#verify-pass").val();

        if (firstName === "" || lastName === "" || email === "" || newPass === "" || verifyPass === "") {
            window.alert("All information must be filled out!")

        } else {
            if (newPass !== verifyPass) {
                window.alert("Passwords do not match!");
                return;
            }


            SDK.Register.registerStudent(firstName, lastName, email, newPass, verifyPass, (err, data) => {
                if (err && err.xhr.status === 400) {
                    $(".margin-bottom").addClass("Error");
                }
                else if (err) {
                    console.log(err)
                } else {
                    window.alert("Succesful sign-up!");
                    window.location.href = "login.html";
                }
            });

        }

    });

});
