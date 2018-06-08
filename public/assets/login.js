// capture data from form. compare it to username and password saved in database. 
// Firebase or MySQL? Use Firebase for authentication and storing user credentials. 
// Write firebase code here. 

// 1. Initialize Firebase
var firebase_config = {
    apiKey: "AIzaSyA5y8GqPO0dVFs5xshZiFdjKgVgN9OlO0M",
    authDomain: "world-cup-2018-2e7ca.firebaseapp.com",
    databaseURL: "https://world-cup-2018-2e7ca.firebaseio.com",
    projectId: "world-cup-2018-2e7ca",
    storageBucket: "world-cup-2018-2e7ca.appspot.com",
    messagingSenderId: "621397211278"
};

firebase.initializeApp(firebase_config);
var database = firebase.database();


$(document).ready(function () {

    // User profile that is loaded
    var currentUser;
    var userDisplayName;
    $('#logoutButton').hide();



    $("#loginButton").on("click", function () {
        event.preventDefault();

        // Capturing user email and password and saving to local temporary object
        var userCredentials = {
            email: $("#loginID").val().trim(),
            password: $("#loginPassword").val().trim()
        }

        // // Adding Firebase Auth
        // const auth = firebase.auth();
        // // Sign in with email and password
        // const promise = auth.signInWithEmailAndPassword(userCredentials.email, userCredentials.password);
        // // This logs an error if above sign in is unsuccessful
        // promise.catch(e => console.log(e.message));
        // console.log('logged in');
        // console.log('user is ');

        // $('#loggedInUser').text('Welcome ' + userCredentials.username);


        // This whole things works even without a post request. Is a post request necessary? 
        // Send the POST request.
        if (userCredentials.email && userCredentials.password) {
            $.ajax("/authenticate", {
                type: "POST",
                data: userCredentials
            }).then(function (response) {
                console.log("About to check user credentials in firebase now");
                // Reload the page to get the updated list
                // location.reload();
                // console.log("POST response: ", response);
                // console.log("response.email: ", response.email);
                // console.log("response.password: ", response.password);

                // check the database for matching email/password pairs
                database.ref().on("value", function (snapshot) {
                    data = snapshot.val();
                    // console.log("DATA: ", data);
                    // console.log("==========================");
                    var keys = Object.keys(data);
                    for (var i = 0; i < keys.length; i++) {
                        // console.log("data[keys[i]].email", data[keys[i]].email);
                        if (response.email === data[keys[i]].email && response.password === data[keys[i]].password) {
                            console.log("username and password combinations EXISTS");
                            currentUser = {
                                id: [keys[i]],
                                email: data[keys[i]].email,
                                username: data[keys[i]].username
                            }

                            // we can go ahead and redirect to another view here using data from currentUser.
                            console.log('currentUser: ', currentUser);
                            console.log(data[keys[i]]);

                            // $('#logoutButton').show();
                            // $('#loginModal').modal('hide');
                            // $('#signupModal').modal('hide');
                            // $('#loginModalButton').hide();
                            // $('#signupModalButton').hide();
                            // $('#jumbotron').removeClass('d-none');
                            // $('#loggedInUser').text('Welcome ' + data[keys[i]].username);
                        }
                    }
                });

            });


        }

    });

    // Sign Up is via username, email and password
    $("#signupButton").on("click", function () {
        event.preventDefault();

        // Capturing user email and password and saving to local temporary object
        var userCredentials = {
            username: $("#userName").val().trim(),
            email: $("#userEmail").val().trim(),
            password: $("#userPassword").val().trim()
        }

        // // Adding Firebase Auth
        // const auth = firebase.auth();
        // // Sign in with email and password
        // const promise = auth.createUserWithEmailAndPassword(userCredentials.email, userCredentials.password);
        // // This logs an error if above sign in is unsuccessful
        // promise.catch(e => console.log(e.message));

        // Send the POST request if sign up is via username, email and password
        if (userCredentials.username && userCredentials.email && userCredentials.password) {
            $.ajax("/authenticate", {
                type: "POST",
                data: userCredentials
            }).then(function (response) {
                console.log("About to check user credentials in firebase now");
                // Reload the page to get the updated list
                // location.reload();
                userDisplayName = response.username;
                console.log("POST response: ", response);
                console.log('We have a new user');
                console.log("response.username", response.username);
                console.log("response.email: ", response.email);
                console.log("response.password: ", response.password);
                database.ref().push(response);
                $('#logoutButton').show();
                $('#loggedInUser').text('Welcome ' + userDisplayName);
                $('#loginModal').modal('hide');
                $('#signupModal').modal('hide');
                $('#loginModalButton').hide();
                $('#signupModalButton').hide();
                $('#jumbotron').removeClass('d-none');

            });
        }

    });

    // Add a realtime listener for auth state change
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {

            displayName = firebaseUser.displayName;
            var email = firebaseUser.email;
            var emailVerified = firebaseUser.emailVerified;
            var photoURL = firebaseUser.photoURL;
            var isAnonymous = firebaseUser.isAnonymous;
            var uid = firebaseUser.uid;
            var providerData = firebaseUser.providerData;

            // Capturing user email and password and saving to local temporary object
            var userCredentials = {
                username: displayName,
                email: email,
                password: uid
            }

            //Send POST request to save user information in firebase database
            $.ajax("/authenticate", {
                type: "POST",
                data: userCredentials
            }).then(function (response) {
                console.log("About to check user credentials in firebase now");
                // Reload the page to get the updated list
                // location.reload();
                console.log("POST response: ", response);
                console.log('We have a new user');
                console.log("response.username", response.username);
                console.log("response.email: ", response.email);
                console.log("response.password: ", response.password);
                database.ref().push(response);
                $('#logoutButton').show();
                $('#loggedInUser').text('Welcome ' + response.username);
                $('#loginModal').modal('hide');
                $('#signupModal').modal('hide');
                $('#loginModalButton').hide();
                $('#signupModalButton').hide();
                $('#jumbotron').removeClass('d-none');
                currentUser = response;
                console.log('currentUser: ', currentUser);

                
                console.log('stringify:', JSON.stringify(currentUser));
                // Put the object into local storage
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                console.log('localstorage: ', localStorage);
                if(localStorage.currentUser) {
                    console.log('localStorige :', localStorage);
                }
                
                window.location.replace('/userDashboard');
                
            });


            // .then(response, function(){
            //     response.redirect('/userDashboard');
            // })

            // $('#logoutButton').show();
            // // $('#loggedInUser').text('Welcome ' + displayName);
            // $('#loginModal').modal('hide');
            // $('#signupModal').modal('hide');
            // $('#loginModalButton').hide();
            // $('#signupModalButton').hide();

            // console.log('userdisplayname:', userDisplayName);
            // console.log('display name: ', displayName);
            // console.log('email', email);
            // console.log('email verfired: ', emailVerified);
            // console.log('photourl: ', photoURL);
            // console.log('uid: ', uid);
            // console.log('providerdata: ', providerData);

        } else {
            console.log('no user logged in');
            $('#logoutButton').hide();
            $('#loginModalButton').show();
            $('#signupModalButton').show();
            $('#loggedInUser').empty();
        }
    });

    // LOGOUT BUTTON
    $('#logoutButton').on('click', e => {
        firebase.auth().signOut();
    });

    // Firebase Google Login
    $(".googleButton").on("click", function () {
        console.log('clicked google');
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });

    });

    // Firebase Twitter Login 
    $(".twitterButton").on("click", function () {
        console.log('clicked twitter');
        var provider = new firebase.auth.TwitterAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
            // You can use these server side with your app's credentials to access the Twitter API.
            var token = result.credential.accessToken;
            var secret = result.credential.secret;

            console.log(token);
            console.log(user);
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });

    });

    // Firebase Facebook Login 
    $(".facebookButton").on("click", function () {
        console.log('clicked facebook');
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });

    });

    // Routes


});