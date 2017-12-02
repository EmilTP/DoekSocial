$(document).ready(() => {

    SDK.Student.loadNavbar();

    //Sætter værdien i et objekt.
    const $myProfile = $("#my-profile");

    //Metoden til at hente information om brugeren, der er logget ind.
    SDK.Student.getProfile((cb, Student) => {

        //JSON.parse bruges til at konvertere data fra serveren, som er en String, til et JavaScript objekt.
        Student = JSON.parse(Student);

        //Tabellen, hvor dataen indlæses i.
        const profileHtml = ` <!--Tegnet her gør, at man bare kan skrive det som almindelig tekst, og ikke skrive " + + ". -->
       
<div class="container">


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
            <td>${Student.idStudent}</td>
            <td>${Student.firstName}</td>
            <td>${Student.lastName}</td>
            <td>${Student.email}</td>
            </tr>
        </tbody>
    </table>
</div> `;

        //Indsætter mit content inden i de valgte elementer.
        $myProfile.append(profileHtml);

    });
});

//Created by Emil Tønder-Prien, 3.semester HA(IT)
//Inspiration er hentet fra Jesper Bruun Hansens eksempel på Github:
//https://github.com/Distribuerede-Systemer-2017/javascript-client