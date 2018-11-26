var firebase = null;

$('document').ready(function() {
  var config = {
    apiKey: "AIzaSyDgg8DBNM95XWt4DG6OlbdHjPExzHV5SQU",
    authDomain: "jsremote-testrunner.firebaseapp.com",
    databaseURL: "https://jsremote-testrunner.firebaseio.com",
    projectId: "jsremote-testrunner",
    storageBucket: "jsremote-testrunner.appspot.com",
    messagingSenderId: "779689989303"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
});
