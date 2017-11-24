$(document).ready(() => {

    SDK.Student.loadNavbar();
    const $myProfile = $("#my-profile");
    const $AttendingEvents = $("#attending-events");

    SDK.Student.getProfile((cb, Student) => {


        Student = JSON.parse(Student);


        const profileHtml = ` <!--Tegnet her gør, at man bare kan skrive det som almindelig tekst, og ikke skrive " + + ". -->
       
<div class="container">


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
</div> `;

        $myProfile.append(profileHtml);

    });
});

