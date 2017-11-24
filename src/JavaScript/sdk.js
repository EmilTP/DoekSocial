const SDK = {
    serverURL: "http://localhost:8080/api",
    request: (options, cb) => { //Vigtigste funktioner, der laver en AJAX request. Kan sende et request, asynkront.

        /*let headers = {};
         if (options.headers) {
             Object.keys(options.headers).forEach((h) => {
                 headers[h] = (typeof options.headers[h] === 'object') ? JSON.stringify(options.headers[h]) : options.headers[h];
             });
         }
*/
        let token = {
            "Authorization": SDK.Storage.load("token")
        };

        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            headers: token,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(options.data),
            success: (data, status, xhr) => {
                cb(null, data, status, xhr);
            },
            error: (xhr, status, errorThrown) => {
                cb({xhr: xhr, status: status, error: errorThrown});
            }
        });

    },

    Register: {
        registerStudent: (firstName, lastName, email, newPass, verifyPass, cb) => {
            SDK.request({
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: newPass,
                    verifyPassword: verifyPass
                },
                url: "/register",
                method: "POST",

            }, (err, data) => {

                if (err) {
                    return cb(err);
                }

                console.log(data);

                SDK.Storage.persist("token", data);

                cb(null, data);
            });
        }
    },

    Login: {
        login: (email, password, cb) => {
            SDK.request({
                data: {
                    email: email,
                    password: password
                },
                url: "/login",
                method: "POST"
            }, (err, data) => {

                //On login-error
                if (err) {
                    return cb(err);
                }

                SDK.Storage.persist("token", data);

                cb(null, data);

            });
        },
    },

    Student: {

        current: () => {
            return SDK.Storage.load("token");

        },

        getProfile: (cb) => {
            SDK.request({
                    method: "GET",
                    url: "/students/profile",
                    headers: {authorization: SDK.Storage.load("token")}

                },
                cb);
        },

        getMyEvents: (cb, events) => {
            SDK.request({
                    method: "GET",
                    url: "/events/myEvents",
                    headers: {authorization: SDK.Storage.load("token")}
                },
                cb);
        },


        loadNavbar: (cb) => {
            $("#nav-container").load("navbar.html", () => {

                const currentStudent = SDK.Student.current();
                // console.log(currentStudent);

                if (currentStudent) {
                    $(".navbar-right").html(`
            <li><a href="Home.html" id="logout-link">Logout</a></li>
          `);
                } else {
                    $(".navbar-right").html(`
            <li><a href="Login.html">Login <span class="sr-only">(current)</span></a></li>
          `);
                }
                $("#logout-link").click(() => SDK.Student.logout());
                cb && cb();

            })
        },

        getAttendingEvents: (cb) => {
            SDK.request({
                method: "GET",
                url: "/students/" + SDK.Student.current().id + "/events",
                headers: {authorization: SDK.Storage.load("token")}
            }, cb);
        },

        logout: () => {
            SDK.Storage.remove("token");
            SDK.Storage.remove("IdStudent");
            SDK.Storage.remove("Student");
            /*localStorage.removeItem("token");*/
            window.location.href = "Home.html";
        }
    },

    Event: {

        currentEvent: () => {
            return SDK.Storage.load("event");
        },

        createEvent: (eventName, eventLocation, eventDate, eventPrice, eventDescription, cb) => {
            SDK.request({
                method: "POST",
                url: "/events",
                data: {
                    eventName: eventName,
                    location: eventLocation,
                    price: eventPrice,
                    description: eventDescription,
                    eventDate: eventDate
                }
                ,
                headers: {authorization: SDK.Storage.load("token")}
            }, cb);
        },

        deleteEvent: (data, cb) => {
            SDK.request({
                method: "PUT",
                url: "/events" + SDK.Event.currentEvent() + "/delete-event",
                data: data,
                headers: {authorization: SDK.Storage.load("event")}
            }, cb, data);
        },

        updateEvent: (data, cb) => {
            SDK.request({
                method: "PUT",
                url: "/events" + SDK.Event.currentEvent().id + "/update-event",
                data: data,
                headers: {authorization: SDK.Storage.load("idEvent")}
            }, cb);
        },

        getEvents: (cb, events) => {

            SDK.request({
                method: "GET",
                url: "/events",
                headers: {
                    filter: {
                        include: ["events"]
                    }
                }
            }, cb);

        },

        joinEvent: (event) => {
            let eventBasket = SDK.Storage.load("eventBasket");

            //Has anything been added to the basket before?
            if (!eventBasket) {
                return SDK.Storage.persist("eventBasket", [{
                    count: 1,
                    event: event
                }]);
            }

            //Does the Event already exist?
            let foundEvent = eventBasket.find(b => b.event.id === event.id);
            if (foundEvent) {
                let i = eventBasket.indexOf(foundEvent);
                eventBasket[i].count++;
            } else {
                eventBasket.push({
                    count: 1,
                    event: event
                });
            }

            SDK.Storage.persist("eventBasket", eventBasket);
        },

        getAttendingStudents: (cb) => {
            SDK.request({
                method: "GET",
                url: "/events/" + SDK.Event.currentEvent().id + "/students",
                headers: {
                    authorization: SDK.Storage.load("token")
                }
            }, cb);
        },

    },

    Storage: {
        prefix: "DoekSocialSDK",
        persist: (key, value) => {
            window.localStorage.setItem(SDK.Storage.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
        },
        load: (key) => {
            const val = window.localStorage.getItem(SDK.Storage.prefix + key);
            try {
                return JSON.parse(val);
            }
            catch (e) {
                return val;
            }
        },
        remove: (key) => {
            window.localStorage.removeItem(SDK.Storage.prefix + key);
        }
    }
};