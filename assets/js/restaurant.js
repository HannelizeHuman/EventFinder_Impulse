$(document).ready(function () {
    
    function showRestaurants(data) {
      var html = "";
      $.each(data, function (index, value) {
        var x = data[index];
        console.log(typeof x);
        $.each(x, function (index, value) {
          var location = x.restaurant.location;
          var userRating = x.restaurant.user_rating;
          html += "<div class='data img-rounded'>";
          html += "<div class='rating'>";
          html += "<span title='" + userRating.rating_text + "'><p style='color:#17a2b8;background-color:rgba(0, 0, 0, 0.507)" + userRating.rating_color + ";border-radius:4px;border:none;padding:2px 10px 2px 10px;text-align: center;text-decoration:none;display:inline-block;font-size:16px;float:right;'><strong>" + userRating.aggregate_rating + "</strong></p></span><br>";
          html += "  <strong class='text-info'>" + userRating.votes + " votes</strong>";
          html += "</div>";
          html += `<a target='_blank' href=${value.url}>`;
          html += "<img class='resimg img-rounded' src=" + value.thumb + " alt='Restaurant Image' height='185' width='185'>";
          html += `</a>`;
          html += "<a href=" + value.url + " target='_blank' class='action_link'><h2 style='color:#17a2b8;'><strong>" + value.name + "</strong></h2></a>";
          html += "  <strong class='text-primary'>" + location.locality + "</strong><br>";
          html += "  <h6 style='color:#17a2b8;'><strong>" + location.address + "</strong></h6><hr>";
          html += "  <strong>CUISINES</strong>: " + value.cuisines + "<br>";
          html += "  <strong>COST FOR TWO</strong>: " + value.currency + value.average_cost_for_two + "<br>";
          html += "</div>";
        });
      });
      $(".results").html(html);
    }

    $("#search-button").on("click", function (event) {
      event.preventDefault()
      var searchBox = $('#textBox').val()
      if (searchBox === "") {
        return;
      }
      select();
    });

    $('#near-me-button').on('click', function (event) {
      event.preventDefault()
      $.get('https://api.ipdata.co/?api-key=d5862679c66dcba67c49248d83c5e242af5cfa6321d2bd188e5e5d77').done(function (response) {
        const { latitude, longitude } = response;
        $.ajax({
          url: `https://developers.zomato.com/api/v2.1/geocode?lat=${latitude}&lon=${longitude}`,
          headers: {
            'user-key': '120096337753aa5793884bfdbe77a2ae'
          }

        }).done(function (response) {
          showRestaurants(response.nearby_restaurants)
        })
      })
    })

    function getCity(callback) {
      const city = $('#city').val();
      return $.ajax({
        url: `https://developers.zomato.com/api/v2.1/cities?q=${city}`,
        headers: {
          'user-key': '120096337753aa5793884bfdbe77a2ae'
        }
      }).done(function (response) {
        callback(response.location_suggestions[0].id);
      });
    }

function select() {
    var category = $('#type-select').val();
    getCity((cityId) => {
      console.log({ cityId })
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&category=${category}&entity_type=city&count=100`,
        "method": "GET",
        "headers": {
          "user-key": "120096337753aa5793884bfdbe77a2ae",
          'Content-type': 'application/x-www-form-urlencoded'
        }
  }

$.getJSON(settings, function(response) {
  showRestaurants(response.restaurants);
});
})
    }

            $("#city_id").change(function () {
              select();
            });
          });

