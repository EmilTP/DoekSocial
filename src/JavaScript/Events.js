$(document).ready(() => {

    SDK.Student.loadNavbar();
    const $EventList = $("#event-list");


    SDK.Event.getEvents((err, Event) => {

        console.log(Event);

        Event.forEach((event) => {


            const eventHtml = ` <!--Tegnet her gør, at man bare kan skrive det som almindelig tekst, og ikke skrive " + + ". -->
        <div class="col-lg-4 book-container">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">${event.eventName}</h3>
                </div>
                <div class="panel-body">
                    <div class="col-lg-4">
                        <img src="${event.imgUrl}"/>
                    </div>
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
                        <div class="col-lg-8 text-right">
                            <button class="btn btn-success purchase-button" data-book-id="${event.id}">Add to attending events</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

            $EventList.append(eventHtml);

        });

        $(".purchase-button").click((function () {
            $("#purchase-modal").modal("toggle");
            const idEvent = $(this).data("Event-id");
            const event = event.find((event) => event.id === idEvent);
            SDK.Event.joinEvent(Event);

        }));


    });


    $("#purchase-modal").on("shown.bs.modal", () => {
        const eventBasket = SDK.Storage.load("eventBasket");
        const $modalTbody = $("#modal-tbody");
        eventBasket.forEach((entry) => {
            $modalTbody.append(`
        <tr>
            <td>
                <img src="${entry.event.imgUrl}" height="60"/>
            </td>
            <td>${entry.event.title}</td>
            <td>${entry.count}</td>
            <td>kr. ${entry.event.price}</td>
            <td>kr. 0</td>
        </tr>
      `);
        });


    });


});