$(document).ready(() => {

    SDK.Student.loadNavbar();
    const $myEvents = $("#my-events");

    const myEventHtml = ` <!--Tegnet her gør, at man bare kan skrive det som almindelig tekst, og ikke skrive " + + ". -->
 
<div class="container">
<p>Here are the events I'm attending: </p>

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
    $myEvents.append(myEventHtml);
});

