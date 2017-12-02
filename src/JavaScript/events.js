$(document).ready(() => {

    SDK.Student.loadNavbar();

    //Sætter værdierne i et objekt.
    const $EventList = $("#event-list");
    const $attendingStudentButton = $("#attendingStudentButton");

    //Metoden til at hente alle events.
    SDK.Event.getEvents((cb, Event) => {

        //JSON.parse bruges til at konvertere data fra serveren, som er en String, til et JavaScript objekt.
        Event = JSON.parse(Event);

        //Eksekverer en funktion for hver element i Arrayen.
        Event.forEach((event) => {

            //Tabellen, som dataen udskrives i.
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
            <td><button class="btn btn-success attendingStudentButton" data-event-id="${event.idEvent}" data-toggle="modal" data-target="#attendingStudents-modal">See attending students</button></td>
            </tr>
        </tbody>
    </table>
</div> `;

            //Indsætter mit content inden i de valgte elementer.
            $EventList.append(eventHtml);

        });

        //Metoden til at deltage i et event køres, når der trykkes på knappen.
        $(".addToEvent-button").click(function () {
            const idEvent = $(this).data("event-id");
            const event = Event.find((event) => event.idEvent === idEvent);
            console.log(event);

            //Tager parametrene: ID, navn, lokation, pris, dato og beskrivelse.
            SDK.Event.joinEvent(idEvent, event.eventName, event.location, event.price, event.eventDate, event.description, (err, data) => {
                if (err && err.xhr.status === 401) {
                    $(".margin-bottom").addClass("Error")
                }
                else if (err) {
                    console.log("Something went wrong");
                    //Pop-up vindue, hvis det ikke lykkes.
                    window.alert("Was not able to delete the event - Try again")
                } else {
                    window.location.href = "myAttendingEvents.html";
                }


            });


        });

        //Metoden til at se hvem, der deltager i et event. Køres når der trykkes på knappen.
        $(".attendingStudentButton").click(function () {
            var idEvent = $(this).data("event-id");

            //Tager parameteren ID.
            SDK.Event.getAttendingStudents(idEvent, (cb, students) => {
                if (students) {
                    students = JSON.parse(students);
                    students.forEach((student) => {

                        //Tabellen, som dataen udskrives i.
                        const attendingStudentsHtml = `
                            <table class="table">
       
                           <thread>
                               <tr>
                                  <th>Id</th>
                                  <th>First Name</th> 
                                  <th>Last Name</th>
                                  <th>Email</th> 
                               </tr>     
                            </thread>
                    
                            <tbody>
                                <tr>
                                <td>${student.idStudent}</td>
                                <td>${student.firstName}</td>
                                <td>${student.lastName}</td>
                                <td>${student.email}</td>
                                </tr>
                            </tbody>
                        </table>
                        `;

                            $attendingStudentButton.append(attendingStudentsHtml)
                    });
                } else {
                    $("#attendingStudentButton").html("Something happened, try again");
                }
            });
        });
    });
    //Knap til at lukke modalen.
    $("#closeModal").click(function () {
        $("#attendingStudentButton").html("");
    });
});

//Created by Emil Tønder-Prien, 3.semester HA(IT)
//Inspiration er hentet fra Jesper Bruun Hansens eksempel på Github:
//https://github.com/Distribuerede-Systemer-2017/javascript-client