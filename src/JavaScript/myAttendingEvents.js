$(document).ready(() => {

    SDK.Student.loadNavbar();

    //Sætter værdierne i et objekt
    const $AttendingEvents = $("#attending-events");
    const $myAttendingEvents = $("#my-attending-events");
    const $noAttendingEvents = $("#nothing-in-my-attending-events");

    $noAttendingEvents.hide();

    //Metoden til at hente events, brugeren deltager i.
    SDK.Student.getAttendingEvents((cb, events) => {

        //JSON.parse bruges til at konvertere data fra serveren, som er en String, til et JavaScript objekt.
        events = JSON.parse(events);

        //If-statement, der gør om teksten: "You are not attending any events..!" vises alt efter om man deltager i nogle events.
        if (events.length === 0) {

            $noAttendingEvents.show();

        }

        //Eksekverer en funktion for hver element i Arrayen.
        events.forEach((event) => {

            //Tabellen, hvor dataen udskrives i.
            const attendingEventsHtml = ` <!--Tegnet her gør, at man bare kan skrive det som almindelig tekst, og ikke skrive " + + ". -->
 
<div class="container">

    <table class="table">
       
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
            </tr>
        </tbody>
    </table>
</div> `;
            //Indsætter mit content inden i de valgte elementer.
            $AttendingEvents.append(attendingEventsHtml);
        });

    });
});

//Created by Emil Tønder-Prien, 3.semester HA(IT)
//Inspiration er hentet fra Jesper Bruun Hansens eksempel på Github:
//https://github.com/Distribuerede-Systemer-2017/javascript-client
