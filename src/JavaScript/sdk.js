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
    Event: {
        addToCheckout: (event) => {
            let eventBasket = SDK.Storage.load("eventBasket");

            //Has anything been added to the basket before?
            if (!eventBasket) {
                return SDK.Storage.persist("eventBasket", [{
                    count: 1,
                    event: event
                }]);
            }

            //Does the book already exist?
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
        findAllEvent: (cb) => {
            SDK.request({
                method: "GET",
                url: "/events",
                headers: {
                    filter: {
                        include: ["authors"]
                    }
                }
            }, cb);
        },

        createEvent: (data, cb) => {
            SDK.request({
                method: "POST",
                url: "/events",
                data: data,
                headers: {authorization: SDK.Storage.load("tokenId")}
            }, cb);
        },

        updateEvent: (data, cb) => {
            SDK.request({
                method: "PUT",
                url: "/events" + SDK.Event.current().id + "/update-event",
                data: data,
                headers: {authorization: SDK.Storage.load("idEvent")}
            }, cb);
        }

    },
    Author: {
        findAll: (cb) => {
            SDK.request({method: "GET", url: "/authors"}, cb);
        }
    },
    Order: {
        create: (data, cb) => {
            SDK.request({
                method: "POST",
                url: "/orders",
                data: data,
                headers: {authorization: SDK.Storage.load("tokenId")}
            }, cb);
        },
        findMine: (cb) => {
            SDK.request({
                method: "GET",
                url: "/students/" + SDK.User.current().id + "/events",
                headers: {
                    authorization: SDK.Storage.load("tokenId")
                }
            }, cb);
        }
    },
    Student: {
        findAllStudents: (cb) => {
            SDK.request({
                method: "GET",
                url: "/students"
            }, cb);
        },
        currentStudent: () => {
            return SDK.Storage.load("student");
        },

        registerStudent: (firstName, lastName, email, newPass, verifyPass, cb) => {
            SDK.request({
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    newPass: newPass,
                    verifyPass: verifyPass
                },
                url: "/register",
                method: "POST",
                headers: {authorization: SDK.Storage.load("idtokens")}
            }, cb);

        },
        logout: () => {
            SDK.Storage.remove("idtokens");
            SDK.Storage.remove("IdStudent");
            SDK.Storage.remove("Student");
            window.location.href = "Login.html";
        },
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
                if (err) return cb(err);

                SDK.Storage.persist("idtokens", data.id);
                SDK.Storage.persist("IdStudent", data.IdStudent);
                SDK.Storage.persist("Student", data.Student);

                cb(null, data);

            });
        },

        loadNavbar: (cb) => {
            $("#nav-container").load("navbar.html", () => {
                const currentStudent = SDK.Student.currentStudent();
                if (currentStudent) {
                    $(".navbar-right").html(`
            <li><a href="Home.html" id="logout-link">Logout</a></li>
          `);
                } else {
                    $(".navbar-right").html(`
            <li><a href="Login.html">Login <span class="sr-only">(currentStudent)</span></a></li>
          `);
                }
                $("#logout-link").click(() => SDK.Student.logout());
                cb && cb();
            });
        }
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