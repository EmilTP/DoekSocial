SDK.Student.loadNavbar();

$("#update-button").click(() => {

    const eventName = $("#update-event-name").val();
    const eventLocation = $("#update-event-location").val();
    const eventDate = $("#update-event-date").val();
    const eventPrice = $("#update-event-price").val();
    const eventDescription = $("#update-event-description").val();
    const idEvent = SDK.Url.getParameterByName("idEvent");

    SDK.Event.updateEvent(eventName, eventLocation, eventDate, eventPrice, eventDescription, idEvent, (err, cb) => {

        if (err && err.xhr.status === 401) {
            $(".margin-bottom").addClass("Error")
        }

        else if (err) {
            console.log("Something went wrong");
            window.alert("Was not able to update the event - Try again")
        } else {
            window.alert("Your event was updated");
            window.location.href = "MyEvents.html";

        }


    });
});






