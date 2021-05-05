var firebaseConfig = {
  apiKey: "AIzaSyDenrLasz1kxe-P8cKctUkgDM5s2M90ijQ",
  authDomain: "fir-project-3b9c0.firebaseapp.com",
  projectId: "fir-project-3b9c0",
  storageBucket: "fir-project-3b9c0.appspot.com",
  messagingSenderId: "207803186879",
  appId: "1:207803186879:web:295d395e8aff3ca768d00a"
};

firebase.initializeApp(firebaseConfig);


var database = firebase.database();

// Initial Values
var initialBid = 0;
var initialBidder = "No one :-(";
var highPrice = initialBid;
var highBidder = initialBidder;


database.ref().on("value", function(snapshot) {

  if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {
    highBidder = snapshot.val().highBidder;
    highPrice = parseInt(snapshot.val().highPrice);

    $("#highest-bidder").text(snapshot.val().highBidder);
    $("#highest-price").text("$" + snapshot.val().highPrice);

    console.log(snapshot.val().highBidder);
    console.log(snapshot.val().highPrice);
  }

  else {

    $("#highest-bidder").text(highBidder);
    $("#highest-price").text("$" + highPrice);

    console.log("Current High Price");
    console.log(highBidder);
    console.log(highPrice);
  }

}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// --------------------------------------------------------------


$("#submit-bid").on("click", function() {

  var bidderName = $("#bidder-name").val().trim();
  var bidderPrice = parseInt($("#bidder-price").val().trim());


  console.log(bidderName);
  console.log(bidderPrice);

  if (bidderPrice > highPrice) {

    // Alert
    alert("You are now the highest bidder.");

    database.ref().set({
      highBidder: bidderName,
      highPrice: bidderPrice
    });

    console.log("New High Price!");
    console.log(bidderName);
    console.log(bidderPrice);

    highBidder = bidderName;
    highPrice = parseInt(bidderPrice);

    $("#highest-bidder").text(bidderName);
    $("#highest-price").text("$" + bidderPrice);
  }

  else {

    alert("Sorry that bid is too low. Try again.");
  }

  event.preventDefault();
});
