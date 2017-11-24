$(document).ready(() => {

    SDK.Student.loadNavbar();
    const $EventList = $("#event-list");

    SDK.Event.getEvents((cb, Event) => {

        Event = JSON.parse(Event);

        Event.forEach((event) => {

            const eventHtml = ` <!--Tegnet her gør, at man bare kan skrive det som almindelig tekst, og ikke skrive " + + ". -->
  
 <div class="container">

    <table class="table table-bordered">
       
       <thread>
           <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Owner</th> 
              <th>Date</th>
              <th>Location</th> 
              <th>Price</th> 
           </tr>     
        </thread>

        <tbody>
            <tr>
            <td>${event.eventName}</td>
            <td>${event.description}</td>
            <td>${event.owner}</td>
            <td>${event.eventDate}</td>
            <td>${event.location}</td>
            <td>${event.price}</td>
            <td><div class="col-lg-8 text-right">
            <a href="MyAttendingEvents.html">
            <button class="btn btn-success addToEvent-button" data-event-id="${event.id}">Add to attending events</button></div>
            </td>   
            </tr>
        </tbody>
    </table>
</div> `;

            $EventList.append(eventHtml);

        });

        $(".addToEvent-button").click(() => {
            $("#addToEvent-modal").modal("toggle");
            const eventId = $(this).data("Event-id");
            const event = Event.find((Event) => event.id === eventId);

            SDK.Event.joinEvent(Event);

        });

    });

});
