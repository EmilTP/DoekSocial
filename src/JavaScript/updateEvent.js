SDK.Student.loadNavbar();


//Metoden køres, når der trykkes på knappen. Brugeren bliver herefter redirected tilbage til oversigten over brugerens events.
$("#update-button").click(() => {

    //Sætter værdierne i et objekt
    const eventName = $("#update-event-name").val();
    const location = $("#update-event-location").val();
    const eventDate = $("#update-event-date").val();
    const price = $("#update-event-price").val();
    const description = $("#update-event-description").val();
    const idEvent = SDK.Url.getParameterByName("eventId");

    //Update event metode. Tager parametrene navn, lokation, dato, pris, beskrivelse og ID.
    SDK.Event.updateEvent(eventName, location, eventDate, price, description, idEvent, (err, data) => {

        if (err && err.xhr.status === 401) {
            $(".margin-bottom").addClass("Error")
        }

        else if (err) {
            console.log("Something went wrong");
            //Pop-up vindue hvis transaktionen ikke lykkes.
            window.alert("Was not able to update the event - Try again")
        } else {
            //Pop-up vindue hvis transaktionen lykkes. Redirecter til brugerens events.
            window.alert("Your event was updated");
            window.location.href = "myEvents.html";

        }
    });
});

//Created by Emil Tønder-Prien, 3.semester HA(IT)
//Inspiration er hentet fra Jesper Bruun Hansens eksempel på Github:
//https://github.com/Distribuerede-Systemer-2017/javascript-client





