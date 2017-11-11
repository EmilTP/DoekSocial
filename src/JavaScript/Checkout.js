$(document).ready(() => {

    SDK.Student.loadNavbar();


    const $modalTbody = $("#eventBasket-tbody");
    const $checkoutActions = $("#checkout-actions");
    const $nothingInEventBasketContainer = $("#nothing-in-basket-container");

    function loadEventBasket() {
        const currentStudent = SDK.Student.currentStudent();
        const eventBasket = SDK.Storage.load("eventBasket") || [];
        let total = 0;

        $nothingInEventBasketContainer.show();

        if (!eventBasket.length) {
            $("#checkout-table-container").hide();
        } else {
            $nothingInEventBasketContainer.hide();
        }

        eventBasket.forEach(entry => {
            let subtotal = entry.event.price * entry.count;
            total += subtotal;
            $modalTbody.append(`
        <tr>
            <td>
                <img src="${entry.event.imgUrl}" height="120"/>
            </td>
            <td>${entry.event.title}</td>
            <td>${entry.count}</td>
            <td>kr. ${entry.event.price}</td>
            <td>kr. ${subtotal}</td>
        </tr>
      `);
        });

        $modalTbody.append(`
      <tr>
        <td colspan="3"></td>
        <td><b>Total</b></td>
        <td>kr. ${total}</td>
      </tr>
    `);

        if (currentStudent) {
            $checkoutActions.append(`
      <button class="btn btn-success btn-lg" id="checkout-button">Checkout</button>
    `);
        }
        else {
            $checkoutActions.append(`
      <a href="Login.html">
        <button class="btn btn-primary btn-lg">Log in to checkout</button>
      </a>
    `);
        }
    }

    loadEventBasket();

    $("#clear-basket-button").click(() => {
        SDK.Storage.remove("eventBasket");
        loadEventBasket();
    });

    $("#checkout-button").click(() => {
        const eventBasket = SDK.Storage.load("eventBasket");
        SDK.Order.create({
            createdById: SDK.Student.currentStudent().id,
            orderItems: eventBasket.map(orderItem => {
                return {
                    count: orderItem.count,
                    idEvent: orderItem.event.id
                }
            })
        }, (err, order) => {
            if (err) throw err;
            $("#order-alert-container").find(".alert-success").show();
            SDK.Storage.remove("eventBasket");
            loadEventBasket();
            $nothingInEventBasketContainer.hide();
        });
    });

});