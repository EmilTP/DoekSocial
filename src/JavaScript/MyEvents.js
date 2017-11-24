$(document).ready(() => {

    SDK.Student.loadNavbar();
    const $myEvents = $("#my-events");
    const $noEvents = $("#nothing-in-my-events");

    if ($myEvents === null) {
        $noEvents.show();
    }



    SDK.Student.getMyEvents((cb, Event) => {

        Event = JSON.parse(Event);

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
            <td><div class="col-lg-8 text-right">
            <button class="btn btn-success delete-button" data-event-id="${event.id}">Delete event</button></div>
            </td>
            <td><div class="col-lg-8 text-right">
            <button class="btn btn-success update-button" data-event-id="${event.id}">Update event</button></div>
            </td>
            </tr>
        </tbody>
    </table>
</div> `;
            $myEvents.append(myEventHtml);
        });

        $(".delete-button").click(() => {
            const eventId = $(this).data("IdEvent");
            const event = Event.find((event) => event.id === eventId);
            SDK.Event.deleteEvent(event);


        });

        $(".update-button").click(() => {
            const eventId = $(this).data("Event-id");
            const event = event.find((Event) => event.id === eventId);
            SDK.Event.updateEvent(Event);

        });

    });
});

