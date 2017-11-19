const SDK = {
    serverURL: "http://localhost:8080/api",
    request: (options, cb) => { //Vigtigste funktioner, der laver en AJAX request. Kan sende et request, asynkront.

        let headers = {};
        if (options.headers) {
            Object.keys(options.headers).forEach((h) => {
                headers[h] = (typeof options.headers[h] === 'object') ? JSON.stringify(options.headers[h]) : options.headers[h];
            });
        }

        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            headers: headers,
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

                SDK.Storage.persist(data);

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

                /* SDK.Storage.persist("token", data);*/
                SDK.Storage.persist("token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJVc2VyIjoibWlsczI1N0Bob3RtYWlsLmNvbSIsImlzcyI6IlNURlUiLCJleHAiOjE1MTA5MTAxMTQ2OTB9.RoitWCkx3HRWWpAtjWwBOq3aZzoraV2FA5yQ1uJyIGvPVjgF8uYdhTLoAtoY18Vz1PzCCCHV3oLlFbivxRL0gg");
                SDK.Storage.persist("Student", 1);

                cb(null, data);

            });
        },
    },

    Student: {

        current: () => {
            return SDK.Storage.load("Student");
        },

        getProfile: (cb) => {
            SDK.request({
                method: "GET",
                url: "students/profile"
            }, cb);
        },

        loadNavbar: (cb) => {
            $("#nav-container").load("navbar.html", () => {
                const currentStudent = SDK.Student.current();
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
            });
        },

        getAttendingEvents: (cb) => {
            SDK.request({
                method: "GET",
                url: "/students/" + SDK.Student.current().id + "/events",
                headers: {
                    authorization: SDK.Storage.load("Token")
                }
            }, cb);
        },

        logout: () => {
            SDK.Storage.remove("token");
            SDK.Storage.remove("IdStudent");
            SDK.Storage.remove("Student");
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
                url: "/events" + SDK.Event.currentEvent().id + "/delete-event",
                data: data,
                headers: {authorization: SDK.Storage.load("idEvent")}
            }, cb);
        },

        updateEvent: (data, cb) => {
            SDK.request({
                method: "PUT",
                url: "/events" + SDK.Event.currentEvent().id + "/update-event",
                data: data,
                headers: {authorization: SDK.Storage.load("idEvent")}
            }, cb);
        },

        getEvents: (cb) => {

            SDK.request({
                method: "GET",
                url: "/events",
                headers: {authorization: SDK.Storage.load("token")}
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