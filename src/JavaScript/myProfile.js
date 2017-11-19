$(document).ready(() => {

    SDK.Student.loadNavbar();

    const currentStudent = SDK.Student.currentStudent();
    const $basketTbodyEvent = $("#basket-tbodyEvent");
    const $basketTbodyProfile = $("#basket-tbodyProfile");

    $(".profile-info").html(`
    <dl>
        <dt>Id</dt>
        <dd>${currentStudent.id}</dd>
        <dt>First name</dt>
        <dd>${currentStudent.firstName}
        <dt>Last name</dt>
        <dd>${currentStudent.lastName}
        <dt>Email</dt>
        <dd>${currentStudent.email}</dd>
        
     </dl>
  `);

    $(".event-info").html(`
    <dl>
        <dt>ID</dt>
        <dd>${currentStudent.event.id}</dd>
        
        <dt>Price</dt>
        <dd>${currentStudent.event.price}</dd>
        
        <dt>Owner</dt>
        <dd>${currentStudent.event.owner}
       
        <dt>Name</dt>
        <dd>${currentStudent.event.name}</dd>
        
        <dt>Location</dt>
        <dd>${currentStudent.event.location}
        
        <dt>Description</dt>
        <dd>${currentStudent.event.description}</dd>
        
        <dt>Date</dt>
        <dd>${currentStudent.event.eventDate}</dd>
    </dl>
    

    `)

});

