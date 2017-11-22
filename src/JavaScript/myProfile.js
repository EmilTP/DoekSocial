$(document).ready(() => {

    SDK.Student.loadNavbar();
    const $myProfile = $("#my-profile");
    const $AttendingEvents = $("#attending-events");

    SDK.Student.getProfile((cb, Student) => {


        Student = JSON.parse(Student);


        const profileHtml = ` <!--Tegnet her gør, at man bare kan skrive det som almindelig tekst, og ikke skrive " + + ". -->
       
<div class="container">
<p>Here is some information about myself: </p>

    <table class="table table-bordered">
       
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
            <td>${Student.idStudent}</td>
            <td>${Student.firstName}</td>
            <td>${Student.lastName}</td>
            <td>${Student.email}</td>
            </tr>
        </tbody>
    </table>
</div>
                      
             `;

        $myProfile.append(profileHtml);


        SDK.Student.getAttendingEvents((err, Student) => {

            Student = JSON.parse(Student);

            Student.forEach((student) => {

                const eventHtml = ` <!--Tegnet her gør, at man bare kan skrive det som almindelig tekst, og ikke skrive " + + ". -->
        <div class="col-lg-4 event-container">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">${event.eventName}</h3>
                </div>
                <div class="panel-body">
                    <div class="col-lg-8">
                      <dl>
                        <dt>Description</dt>
                        <dd>${event.description}</dd>
                        <dt>Owner</dt>
                        <dd>${event.owner}</dd>
                        <dt>Date</dt>
                        <dd>${event.eventDate}</dd>
                        <dt>Location</dt>
                        <dd>${event.location}</dd>
                      </dl>
                    </div>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-lg-4 price-label">
                            <p>Kr. <span class="price-amount">${event.price}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

                $AttendingEvents.append(eventHtml);
            });

        });
    });
});

