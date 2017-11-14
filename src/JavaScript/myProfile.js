$(document).ready(() => {

    SDK.Student.loadNavbar();
    const currentStudent = SDK.Student.currentStudent();
    const $basketTbodyEvent = $("#basket-tbody");
    const $basketTbodyProfile = $("#basket-tbody1");

    $(".profile-info").html(`
    <dl>
        <dt>ID</dt>
        <dd>${currentStudent.id}</dd>
        <dt>First name</dt>
        <dd>${currentStudent.firstName}
        <dt>Last name</dt>
        <dd>${currentStudent.lastName}
        <dt>Email</dt>
        <dd>${currentStudent.email}</dd>
        
     </dl>
  `);
}

