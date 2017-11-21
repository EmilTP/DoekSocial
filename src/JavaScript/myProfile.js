$(document).ready(() => {

    SDK.Student.loadNavbar();
    const $myProfile = $("#my-profile");
    const $AttendingEvents = $("#attending-events");

    SDK.Student.getProfile((cb, Student) => {


        Student = JSON.parse(Student);


        const profileHtml = ` <!--Tegnet her gør, at man bare kan skrive det som almindelig tekst, og ikke skrive " + + ". -->
        <div class="col-lg-4 event-container">
            <div class="panel panel-default">
                
                <div class="panel-body">
                    <div class="col-lg-8">
                      <dl>
                        <dt>Id</dt>
                        <dd>${student.idStudent}</dd>
                        <dt>First Name</dt>
                        <dd>${student.firstName}</dd>
                        <dt>Last Name</dt>
                        <dd>${student.lastName}</dd>
                        <dt>Email</dt>
                        <dd>${student.email}</dd>
                      </dl>
                    </div>
                </div>
            </div>
        </div>`;

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

