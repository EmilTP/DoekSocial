$(document).ready(() => {

    SDK.Student.loadNavbar();

    $("#NewEvent-button").click(() => {

        const eventName = $("#event-name").val();
        const eventLocation = $("#event-location").val();
        const eventDate = $("#event-date").val();
        const eventPrice = $("#event-price").val();
        const eventDescription = $("#event-description").val();

        if (eventName === "" || eventLocation === "" || eventDate === "" || eventPrice === "" || eventDescription === "") {
            window.alert("All information must be filled out!")
        }

        SDK.Event.createEvent(eventName, eventLocation, eventDate, eventPrice, eventDescription, (err, data) => {
            if (err && err.xhr.status === 400) {
                $(".margin-bottom").addClass("Error");
            }
            else if (err) {
                console.log(err)
            } else {
                window.alert("Event created!");
                window.location.href = "MyEvents.html";
            }
        });

    });

});