$(document).ready(() => {

    //Indlæser navigationsbaren
    SDK.Student.loadNavbar();

    //Sætter værdierne i et objekt.
    const $myEvents = $("#my-events");
    const $noEvents = $("#nothing-in-my-events");

    $noEvents.hide();

    SDK.Student.getMyEvents((cb, Event) => {

        //JSON.parse bruges til at konvertere data fra serveren, som er en String, til et JavaScript objekt.
        Event = JSON.parse(Event);

        //If-statement, der gør om teksten: "You have not created an event yet..!" vises alt efter om man har oprettet nogle events.
        if (Event.length === 0) {

            $noEvents.show();

        }

        //Eksekverer en funktion for hver element i Arrayen.
        Event.forEach((event) => {

            //Tabellen hvor events bliver indlæst i.
            const myEventHtml = ` <!--Tegnet her gør, at man bare kan skrive det som almindelig tekst, og ikke skrive " + + ". -->
 
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
            <td><button class="btn btn-success delete-button" data-event-id-delete="${event.idEvent}">Delete event</button>
            </td>
            <td> <a href="updateEvent.html?eventId=${event.idEvent}"
            <button class="btn btn-success update-button">Update event</button>
            </a></td>
            </tr>
        </tbody>
    </table>
</div> `;
            //Indsætter mit content inden i de valgte elementer.
            $myEvents.append(myEventHtml);
        });

        //Metoden, der sletter et event, køres når der trykkes på knappen.
        $(".delete-button").click(function () {
            const idEvent = $(this).data("event-id-delete");
            const event = Event.find((event) => event.idEvent === idEvent);


            //Metoden til at slette en bruger. Tager parametrene ID, navn, lokation, pris, dato og beskrivelse.
            SDK.Event.deleteEvent(idEvent, event.eventName, event.location, event.price, event.eventDate, event.description, (err, data) => {
                if (err && err.xhr.status === 401) {
                    $(".margin-bottom").addClass("Error")
                }
                else if (err) {
                    console.log("Something went wrong");

                    //Pop-up vindue, hvis transaktionen ikke lykkedes. Redirecter efterfølgende til brugerens events.
                    window.alert("Was not able to join the event - Try again")
                } else {
                    window.location.href = "myEvents.html";
                }
            });
        });
    });
});

//Created by Emil Tønder-Prien, 3.semester HA(IT)
//Inspiration er hentet fra Jesper Bruun Hansens eksempel på Github:
//https://github.com/Distribuerede-Systemer-2017/javascript-client