//Dette Javascript dokument er taget udgangspunkt i Jesper Bruun Hansens kode på Github:
// https://github.com/Distribuerede-Systemer-2017/javascript-client

$(document).ready(() => {

    SDK.Student.loadNavbar();

    //Kører, hvis loginknappen bliver clicked
    $("#login-button").click(() => {

        //Sætter værdierne i et objekt.
        const email = $("#login-name").val();
        const password = $("#login-password").val();

        //If-else statement, der gør at alle felter skal fyldes ud.
        if (email === "" || password === "") {
            window.alert("All information must be filled out!")

        }

        //Login-metode. Tager paramentrene Email og password
        SDK.Login.login(email, password, (err, data) => {
            if (err && err.xhr.status === 401) {
                $(".margin-bottom").addClass("Error");
            }
            else if (err) {
                console.log("Something went wrong " + err.xhr.status);
                //Pop-up vindue, hvis det ikke lykkes.
                window.alert("Something went wrong! Try again")
            } else {
                SDK.Student.getProfile((err, _data) => {
                    if(err) console.log('error', err);

                    //Sætter CurrentStudent, og redirecter til "home".
                    SDK.Storage.persist("currentStudent", _data);
                    window.location.href = "home.html";
                });
            }
        });
    });
});

//Created by Emil Tønder-Prien, 3.semester HA(IT)
//Inspiration er hentet fra Jesper Bruun Hansens eksempel på Github:
//https://github.com/Distribuerede-Systemer-2017/javascript-client