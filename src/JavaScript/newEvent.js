$(document).ready(() => {

    SDK.Student.loadNavbar();

    //Metoden køres, når der trykkes på knappen. Brugeren bliver herefter redirected til oversigten over brugerens events.
    $("#NewEvent-button").click(() => {

        //Sætter værdierne i et objekt
        const eventName = $("#event-name").val();
        const eventLocation = $("#event-location").val();
        const eventDate = $("#event-date").val();
        const eventPrice = $("#event-price").val();
        const eventDescription = $("#event-description").val();

        //If-else statement, der gør at alle felter skal udfyldes.
        if (eventName === "" || eventLocation === "" || eventDate === "" || eventPrice === "" || eventDescription === "") {
            window.alert("All information must be filled out!")
        }

        //Metoden til at oprettes et event. Tager parametrene: Nav, lokation, dato, pris og beskrivelse.
        SDK.Event.createEvent(eventName, eventLocation, eventDate, eventPrice, eventDescription, (err, data) => {
            if (err && err.xhr.status === 400) {
                $(".margin-bottom").addClass("Error");
            }
            else if (err) {
                console.log(err)
            } else {
                //Pop-up vindue, hvis transkationen lykkes. Redirecter til brugerens events.
                window.alert("Event created!");
                window.location.href = "myEvents.html";
            }
        });
    });
});

//Created by Emil Tønder-Prien, 3.semester HA(IT)
//Inspiration er hentet fra Jesper Bruun Hansens eksempel på Github:
//https://github.com/Distribuerede-Systemer-2017/javascript-client