// $("#total-deaths").click(function(event) {
// var referToThis = event.target.value
// console.log(referToThis)
// })

$(document).on("click", ".input-search", function (event) {
    var apiKey = "d60b77f798msh32257c07ec0e08ap1cb378jsn227b3dea201a";
    apiKey = "73403c6c67msha0632541172766bp194ccejsn820ec377a86a";
    apiKey = "2ca619fcd3msh02f5effc7ebeacap17db6fjsn9249e6ca621d";
    // Empty Modal in case api is still loading
    // $(".modal-body").empty();
    var countryName = $(this).data("country");
    var stateName = $(this).data("state");
    // console.log(stateName);
    // If element does not have attribute data-state, set to empty string
    if (stateName === undefined) {
        stateName = "";
    }

    // Create the query
    var query = countryName + " " + stateName;

    // Data Number for Risk Assessment for Deaths
    var dataNumber = $(this).data("number");
    //var dataCases = $(this).data("cases")
    
    //append Country Name to Modal
    $(".modal-title").html("Hotel Listings for " + query)


    var locationAPI = {
        "async": true,
        "crossDomain": true,
        // "url": "https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=30&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=" + value,
        "url": "https://tripadvisor1.p.rapidapi.com/locations/search?limit=30&sort=relevance&offset=0&lang=en_US&currency=USD&query=" + query,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
            "x-rapidapi-key": apiKey
        }
    }

    $.ajax(locationAPI).done(function (response) {
        // console.log(response.data[0].result_object.location_id);
        // console.log(response);
        var HotelApi = {
            "async": true,
            "crossDomain": true,
            "url": "https://tripadvisor1.p.rapidapi.com/hotels/list?offset=0&currency=USD&limit=30&order=asc&lang=en_US&sort=recommended&location_id=" + response.data[0].result_object.location_id + "&adults=1&checkin=%3Crequired%3E&rooms=1&nights=2",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
                "x-rapidapi-key": apiKey
            }
        }

        $.ajax(HotelApi).done(function (response) {
            // used to not pick the same number twice
            var values = [];
            for (var i = 0; i < response.data.length; ++i){
                values.push(i);
            }
            $(".loader").hide();
            for (var i = 0; i < 3; i++) {
                // generate a random number
                var rand = values.splice(Math.random() * values.length, 1)[0];
                $("#hotel-card-" + (i + 1)).css("display", "block");
                $("#hotel-card-" + (i + 1) + "-title").html("<div class='hotel-name'> <span class='text-secondary'>Hotel Name:</span> " + response.data[rand].name + "</div>");
                $("#hotel-card-" + (i + 1) + "-text").append("<div class='hotel-price'> <span class='text-secondary'>Price:</span> " + response.data[rand].price + "</div>")
                $("#hotel-card-" + (i + 1) + "-text").append("<div class='hotel-rating'> <span class='text-secondary'>Rating:</span> " + response.data[rand].rating + "</div>")
                $("#hotel-card-" + (i + 1) + "-text").append("<div class='hotel-reviews'> <span class='text-secondary'>Number of Reviews:</span> " + response.data[rand].num_reviews + "</div>")
                $("#hotel-card-" + (i + 1) + "-text").append("<div class='hotel-location'> <span class='text-secondary'>Location:</span> " + response.data[rand].location_string + "</div>")
                if (dataNumber > 200000) {
                    $("#hotel-card-" + (i + 1) + "-text").append("<div class='recommendation bg-danger text-light'><span class=badge badge-pill badge-danger'>High Risk Area</span></div>")
                } else if (dataNumber > 120000) {
                    $("#hotel-card-" + (i + 1) + "-text").append("<div class='recommendation bg-warning'><span class=badge badge-pill badge-warning'>Moderate Risk Area</span></div>")
                } else {
                    $("#hotel-card-" + (i + 1) + "-text").append("<div class='recommendation text-light'><span class='badge badge-pill badge-success'>Low Risk Area</span>Low Risk Area'</div>")
                }
                    $("#hotel-card-" + (i + 1) + "-img").attr("src", response.data[rand].photo.images.large.url)
            }
            console.log("success")
        });
    }).fail(function() {
        $(".loader").hide();
        $(".modal-title").html("<h5><span class='text-danger'>API error</span></h5>");   
    })
})
//hide demo button.
$("#modal-close").on("click", function (event) {
    $(".modal-title").html("Hotel Listings"); 
    for (var i = 0; i < 3; i++) {
        $("#hotel-card-"+(i+1)).css("display", "none");
        $("#hotel-card-"+(i+1)+"-title").empty()
        $("#hotel-card-"+(i+1)+"-text").empty()
        $("#hotel-card-"+(i+1)+"-text").empty()
        $("#hotel-card-"+(i+1)+"-text").empty()
        $("#hotel-card-"+(i+1)+"-text").empty()
        $("#hotel-card-"+(i+1)+"-text").empty()
        $("#hotel-card-"+(i+1)+"-img").attr("src", "")
    }
    $(".loader").show();
});

$("#hotel-modal-close").on("click", function(event) {
    $(".modal-title").html("Hotel Listings"); 
    for (var i = 0; i < 3; i++) {
        $("#hotel-card-"+(i+1)).css("display", "none");
        $("#hotel-card-"+(i+1)+"-title").empty()
        $("#hotel-card-"+(i+1)+"-text").empty()
        $("#hotel-card-"+(i+1)+"-text").empty()
        $("#hotel-card-"+(i+1)+"-text").empty()
        $("#hotel-card-"+(i+1)+"-text").empty()
        $("#hotel-card-"+(i+1)+"-text").empty()
        $("#hotel-card-"+(i+1)+"-img").attr("src", "")
    }
    $(".loader").show();
})