$(document).ready(() => {

    SDK.Student.loadNavbar();

    $("#login-button").click(() => {

        const email = $("#login-name").val();
        const password = $("#login-password").val();

        if (email === "" || password === "") {
            window.alert("All information must be filled out!")

        }

        SDK.Login.login(email, password, (err, data) => {
            if (err && err.xhr.status === 401) {
                $(".margin-bottom").addClass("Error");
            }
            else if (err) {
                console.log("Something went wrong " + err.xhr.status);
                window.alert("Wrong password or username!")
            } else {
                SDK.Student.getProfile((err, _data) => {
                    if(err) console.log('error', err);

                    console.log(err, _data);
                    SDK.Storage.persist("currentStudent", _data);
                    window.location.href = "Home.html";
                });
                console.log(data);

            }
        });

    });

});