function buildQueryURL() {
  var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?";
  var queryParams = {"apikey":"4wDYyinV6ZsMzVdTn2gRFTJQnFyW6euq"};

  queryParams.keyword = $("#keyword").val(); 
  queryParams.city = $("#city").val();
    

  return queryURL + $.param(queryParams);
};
  
function searchButtonClick(event) {
  event.preventDefault();
  var queryURL = buildQueryURL();
  console.log(queryURL);   
  $("#ticketErrorMsg").empty()

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response){
    console.log(response);
    let resultsArray = [];
    if(response._embedded){
      $.each(response._embedded.events, function (_index, value){
        let eventObj = {
          name: value.name,
          venue: value._embedded.venues[0].name,
          date: value.dates.start.localDate,
          time: value.dates.start.localTime,
          img: value.images[0].url,
          link: value.url
        }    
          resultsArray.push(eventObj);
          let formatDate = moment(eventObj.date).format("MMM D YYYY");
          console.log(eventObj)
      })
      createCard(resultsArray)
      $("#eventSearch").addClass("hide")
    }
    else {
      $("#ticketErrorMsg").text("Please enter a valid city & Event Type!")
    }

  })
};
  
  function createCard(tickets){
    console.log(tickets);
    $.each(tickets, function(_index, value){
      console.log(value);
      var formattedDate=moment(value.date).format("dddd, MMMM Do YYYY");
      var formattedTime=moment(value.time, "HH:mm:ss").format(" h:mm A");
      $(".results").append(`<div id="cards" class="card mb-3" style="max-width: 900px;">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img id="cards-id" src="${value.img}" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
          <h3 id="cards-h3">${value.name}</h3>
          <p><b>WHERE: </b>${value.venue}</p>
          <p class="eventDate"><b>WHEN : </b> ${formattedDate} at ${formattedTime} </p>
          <a href="${value.link}"target="_blank">Get Tickets</a>
          </div>
        </div>
      </div>
    </div>`)
      })
    };
  
 



function showError(error) {
  switch(error.code) {
      case error.POSITION_UNAVAILABLE:
          x.innerHTML = "Location information is unavailable."
          break;
      case error.TIMEOUT:
          x.innerHTML = "The request to get user location timed out."
          break;
      case error.UNKNOWN_ERROR:
          x.innerHTML = "An unknown error occurred."
          break;
  }
}



/* Process The API Response */

  $();
  $("#search-button").on("click", searchButtonClick);


  