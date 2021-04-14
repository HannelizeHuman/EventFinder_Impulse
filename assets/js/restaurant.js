//waiting to get IDs from restaurant html
$(document).reaady(function() {

    $("#seach-btn").on("click", function() {
        var searchBox = $('#textBox').val()
        if (searchBox === "") {
            return;
        }
        select();
});

function select() {
    var dropDownOptions = $('#city_id').val();
    var valueSearchBox = $('#input_text').val();
    var citySearch = "&q=" + valueSearchBox;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://developers.zomato.com/api/v2.1/search?entity_id=" + dropDownOptions + "&entity_type=city" + citySearch + "&count=100",
        "method": "GET",
        "headers": {
            "user-key": "120096337753aa5793884bfdbe77a2ae",
            'Content-type': 'application/x-www-form-urlencoded'
        }
    }
}