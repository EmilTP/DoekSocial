$(document).ready(() => {

    SDK.Student.loadNavbar();
    const $myEvents = $("#my-events");
    const $noEvents = $("#nothing-in-my-events");

    $noEvents.hide();

    SDK.Student.getMyEvents((cb, Event) => {


        Event = JSON.parse(Event);


        if (Event.length === 0) {

            $noEvents.show();

        }

        Event.forEach((event) => {


            const myEventHtml = ` <!--Tegnet her gør, at man bare kan skrive det som almindelig tekst, og ikke skrive " + + ". -->
 
<div class="container">

    <table class="table table-bordered">
       
       <thread>
           <tr>
              <th>Description</th>
              <th>Owner</th> 
              <th>Date</th>
              <th>Location</th> 
              <th>Price</th> 
           </tr>     
        </thread>

        <tbody>
            <tr>
            <td>${event.description}</td>
            <td>${event.owner}</td>
            <td>${event.eventDate}</td>
            <td>${event.location}</td>
            <td>${event.price}</td>
            <td><button class="btn btn-success delete-button" data-event-id-delete="${event.idEvent}">Delete event</button>
            </td>
            <td> <a href="updateEvent.html?eventId=${event.idEvent}"
            <button class="btn btn-success update-button">Update event</button>
            </a></td>
            </tr>
        </tbody>
    </table>
</div> `;
            $myEvents.append(myEventHtml);
        });

        $(".delete-button").click(function () {
            const idEvent = $(this).data("event-id-delete");
            const event = Event.find((event) => event.idEvent === idEvent);

            console.log(event);

            SDK.Event.deleteEvent(idEvent, event.eventName, event.location, event.price, event.eventDate, event.description, (err, data) => {
                if (err && err.xhr.status === 401) {
                    $(".margin-bottom").addClass("Error")
                }
                else if (err) {
                    console.log("Something went wrong");
                    window.alert("Was not able to join the event - Try again")
                } else {
                    window.location.href = "myEvents.html";
                }
            });
        });
    });
});

