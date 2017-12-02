//Dette Javascript dokument er taget udgangspunkt i Jesper Bruun Hansens kode på Github:
// https://github.com/Distribuerede-Systemer-2017/javascript-client

const SDK = {

    //Serverens addresse
    serverURL: "http://localhost:8080/api",

    request: (options, cb) => { //Disse funktioner er de vigtigste i programmet. De laver et AJAX request. Kan sende et request, asynkront.

        let token = {
            "Authorization": SDK.Storage.load("token")
        };

        //Her sætter jeg parametrene for mit AJAX-kald med serveren.
        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            headers: token,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(SDK.Encryption.encrypt(JSON.stringify(options.data))),
            success: (data, status, xhr) => {
                cb(null, SDK.Encryption.decrypt(data), status, xhr);
            },
            error: (xhr, status, errorThrown) => {
                cb({xhr: xhr, status: status, error: errorThrown});
            }
        });
    },

    //Opretter brugeren
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

                SDK.Storage.persist("token", JSON.parse(data));

                cb(null, data);
            });
        }
    },

    //Funktion til at logge en bruger ind, og gemmer en token.
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

                SDK.Storage.persist("token", JSON.parse(data));

                cb(null, data);

            });
        },
    },

    Student: {

        //Her sætter jeg brugeren vha. load-metoden i SDK.Storage via en Token.
        current: () => {
            return SDK.Storage.load("token");

        },

        //Henter informationen om brugeren, der er logget ind.
        getProfile: (cb) => {
            SDK.request({
                    method: "GET",
                    url: "/students/profile",
                    headers: {authorization: SDK.Storage.load("token")}

                },
                cb);
        },

        //Henter de events, som brugeren har oprettet.
        getMyEvents: (cb, events) => {
            SDK.request({
                    method: "GET",
                    url: "/events/myEvents",
                    headers: {authorization: SDK.Storage.load("token")}
                },
                cb);
        },

        //Henter navigationsbaren i toppen af hver page.
        // Koden gør ligeledes, at navigationsbaren skifter alt efter om man er logget ind eller ej.
        loadNavbar: (cb) => {
            $("#nav-container").load("navbar.html", () => {


                const currentStudent = SDK.Student.current();

                if (currentStudent) {
                    $(".navbar-right").html(`
            <li><a href="Login.html" id="logout-link">Logout</a></li>
          `);
                } else {
                    $(".navbar-right").html(`
            <li><a href="Login.html">Login <span class="sr-only">(current)</span></a></li>
          `);
                }
                $("#logout-link").click(() => {
                    SDK.Student.logout((err, data) => {
                        if (err && err.xhr.status === 401) {
                            $(".margin-bottom").addClass("has-error");
                        } else {
                            localStorage.removeItem("token");
                            localStorage.removeItem("idStudent");
                        }
                    })
                });
                cb && cb();

            })
        },

        //Henter de events, som brugeren har tilmeldt sig.
        getAttendingEvents: (cb) => {
            SDK.request({
                method: "GET",
                url: "/students/" + SDK.Storage.load("currentStudent").idStudent + "/events",
                headers: {
                    filter: {
                        include: ["events"]
                    }
                }
            }, cb);
        },

        //Logger brugeren ud, og sletter token fra databasen.
        logout: (cb) => {

            SDK.request({
                method: "POST",
                url: "/students/logout",
            }, (err, data) => {
                if (err) {
                    return cb(err);
                }
                cb(null, data)
            });
        }
    },

    Event: {

        //Her sætter jeg et event vha. load-metoden i SDK.Storage
        currentEvent: () => {
            return SDK.Storage.load("Event");
        },

        //Opretter et event
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

        //Sletter et event
        deleteEvent: (idEvent, eventName, location, price, eventDate, description, cb) => {
            SDK.request({
                data: {
                    idEvent: idEvent,
                    eventName: eventName,
                    location: location,
                    price: price,
                    eventDate: eventDate,
                    description: description
                },
                method: "PUT",
                url: "/events/" + idEvent + "/delete-event",
            }, cb);
        },

        //Opdaterer et event
        updateEvent: (eventName, location, eventDate, price, description, idEvent, cb) => {
            SDK.request({
                data: {
                    eventName: eventName,
                    location: location,
                    eventDate: eventDate,
                    price: price,
                    description: description
                },
                method: "PUT",
                url: "/events/" + idEvent + "/update-event",

            }, (err, data) => {
                if (err) return cb(err);

                SDK.Storage.persist("crypted", data);

                cb(null, data);
            });
        },


        //Denne metode er med til at få updateEvent-metoden til at virke.
        //Denne metode er lavet i samarbejde med Iben og Jesper. Ibens repository: https://github.com/Ibenfoldager/STFUClient/commit/98e93ad94c02d4980cf0e9512677d1e470565efc
        Url: {
            getParameterByName: (name) => {
                var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
                return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
            }
        },

        //Henter alle events
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

        //Funktion til at deltage i et event
        joinEvent: (idEvent, eventName, location, price, eventDate, description, cb) => {

            SDK.request({
                data: {
                    idEvent: idEvent,
                    eventName: eventName,
                    location: location,
                    price: price,
                    description: description
                },

                method: "POST",
                url: "/events/join"
            }, (err, data) => {

                cb(null, data);
            });

        },

        //Funktion, der henter brugere i specifikke events
        getAttendingStudents: (idEvent, cb) => {
            SDK.request({
                method: "GET",
                url: "/events/" + idEvent + "/students",
            }, cb);
        },

    },

    //Storagemetoden, der gør at en token bliver persistet.
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
    },


    //Krypteringsmetoden. Samme metode som på serveren.
    Encryption: {
        encrypt: (encrypt) => {
            if (encrypt !== undefined && encrypt.length !== 0) {
                const fields = ['J', 'M', 'F'];
                let encrypted = '';
                for (let i = 0; i < encrypt.length; i++) {
                    encrypted += (String.fromCharCode((encrypt.charAt(i)).charCodeAt(0) ^ (fields[i % fields.length]).charCodeAt(0)))
                }
                return encrypted;
            } else {
                return encrypt;
            }
        },
        decrypt: (decrypt) => {
            if (decrypt.length > 0 && decrypt !== undefined) {
                const fields = ['J', 'M', 'F'];
                let decrypted = '';
                for (let i = 0; i < decrypt.length; i++) {
                    decrypted += (String.fromCharCode((decrypt.charAt(i)).charCodeAt(0) ^ (fields[i % fields.length]).charCodeAt(0)))
                }
                return decrypted;
            } else {
                return decrypt;
            }
        }
    },
};

//Created by Emil Tønder-Prien, 3.semester HA(IT)
//Inspiration er hentet fra Jesper Bruun Hansens eksempel på Github:
//https://github.com/Distribuerede-Systemer-2017/javascript-client