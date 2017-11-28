$(document).ready(() => {

    SDK.Student.loadNavbar();
    const $AttendingEvents = $("#attending-events");

    SDK.Student.getAttendingEvents((cb, events) => {

        events = JSON.parse(events);

        console.log(events);

        events.forEach((event) => {

            const attendingEventsHtml = ` <!--Tegnet her gør, at man bare kan skrive det som almindelig tekst, og ikke skrive " + + ". -->
 
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
            </tr>
        </tbody>
    </table>
</div> `;
            $AttendingEvents.append(attendingEventsHtml);
        });

    });
});


