$(document).ready(() => {

    SDK.Student.loadNavbar();
    const $EventList = $("#event-list");

    SDK.Event.getEvents((cb, Event) => {

        Event = JSON.parse(Event);

        Event.forEach((event) => {

            let eventHtml = ` <!--Tegnet her gør, at man bare kan skrive det som almindelig tekst, og ikke skrive " + + ". -->
  
 <div class="container">

    <table class="table">
       
           <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Owner</th> 
              <th>Date</th>
              <th>Location</th> 
              <th>Price</th>
              <th>Attend button</th>
              <th>See attendees</th> 
           </tr>     

        <tbody>
            <tr>
            <td>${event.eventName}</td>
            <td>${event.description}</td>
            <td>${event.owner}</td>
            <td>${event.eventDate}</td>
            <td>${event.location}</td>
            <td>${event.price}</td>
            <td><button class="btn btn-success addToEvent-button" data-event-id="${event.idEvent}">Add to attending events</button></td>
            <td><button class="btn btn-success attendingStudents-button" data-event-id2="${event.idEvent}">See attending students</button></td>
            </tr>
        </tbody>
    </table>
</div> `;

            $EventList.append(eventHtml);

        });

        $(".addToEvent-button").click(function () {
            const idEvent = $(this).data("event-id");
            const event = Event.find((event) => event.idEvent === idEvent);
            console.log(event);
            SDK.Event.joinEvent(idEvent, event.eventName, event.location, event.price, event.eventDate, event.description, (err, data) => {
                if (err && err.xhr.status === 401) {
                    $(".margin-bottom").addClass("Error")
                }
                else if (err) {
                    console.log("Something went wrong");
                    window.alert("Was not able to join the event - Try again")
                } else {
                    window.location.href = "MyAttendingEvents.html";
                }


            });


        });

        $(".attendingStudents-button").click(function () {
            $("#attend-modal").modal("toggle");

        });

        $("#attendingStudents-modal").on("shown.es.modal", () => {
            const attendingStudents = SDK.Storage.load("token");
            const $modalBody = $("#modal-body");

            attendingStudents.forEach((entry) => {
                $modalBody.append(`
            <tr>
            <td>${entry.Student.idStudent}</td>
            <td>${entry.Student.firstName}</td>
            <td>${entry.Student.lastName}</td>
            <td>${entry.Student.email}</td>
            </tr>
      `)

            });
        });
    });
});