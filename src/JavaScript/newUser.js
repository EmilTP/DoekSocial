$(document).ready(() => {

    SDK.Student.loadNavbar();


    //Metoden kører, når der klikkes på newUser-button.
    $("#newUser-button").click(() => {

        const firstName = $("#first-name").val();
        const lastName = $("#last-name").val();
        const email = $("#login-mail").val();
        const newPass = $("#new-pass").val();
        const verifyPass = $("#verify-pass").val();

        //If-else statement, der gør at alle felter skal være udfyldt samt, at passwordfelterne skal stemmeoverens.
        if (firstName === "" || lastName === "" || email === "" || newPass === "" || verifyPass === "") {
            window.alert("All information must be filled out!")

        } else {
            if (newPass !== verifyPass) {
                window.alert("Passwords do not match!");
                return;
            }

            //Tager parametrene fornavn, efternavn, email, password og en verificering af password.
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

//Created by Emil Tønder-Prien, 3.semester HA(IT)
