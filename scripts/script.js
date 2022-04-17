/* ######## Functions to run in beginning of program ######## */

// Display total world cases
displayTotalWorldCases();
// Display total world deaths
displayWorldTotalDeaths();
// Display world cases
displayWorldCases();
// Display world deaths
displayWorldDeaths();

/* ######## Useful functions ######## */

// This function formats numbers with commas
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

/* ######## World Data ######## */

// Display World cases
function displayWorldCases() {
    // API for world regions
    var regions = {
        "async": true,
        "crossDomain": true,
        "url": "https://covid-19-statistics.p.rapidapi.com/regions",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
            "x-rapidapi-key": "73403c6c67msha0632541172766bp194ccejsn820ec377a86a"
        },
    }
    // Get total of confirmed cases from each country and append it to total confirmed
    $.ajax(regions).done(function (regionsData) {
        for (var i = 0; i < 50; i++) {
            // API for world reports
            var reports = {
                "async": true,
                "crossDomain": true,
                "url": "https://covid-19-statistics.p.rapidapi.com/reports?iso=" + regionsData.data[i].iso,
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
                    "x-rapidapi-key": "73403c6c67msha0632541172766bp194ccejsn820ec377a86a"
                },
            }
            $.ajax(reports).done(function (response) {
                var countryName;
                var total = 0;
                for (var j = 0; j < response.data.length; j++) {
                    total += response.data[j].confirmed;
                }
                try {
                    var countryName = response.data[0].region.name.replace(/[^a-zA-Z ]/g, ""); // removes special character
                    $("#total-cases-country").append(`<div class="input-search" data-toggle="modal" data-target="#exampleModal" data-country="${countryName}" data-number=${total}>${countryName} <span class="text-success">${formatNumber(total)}</span></div>`);
                } catch (err) {
                    // do nothing
                }
            });
        }
    });
}

// Display World deaths
function displayWorldDeaths() {
    // API for world regions
    var regions = {
        "async": true,
        "crossDomain": true,
        "url": "https://covid-19-statistics.p.rapidapi.com/regions",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
            "x-rapidapi-key": "73403c6c67msha0632541172766bp194ccejsn820ec377a86a"
        },
    }
    $.ajax(regions).done(function (regionsData) {
        for (var i = 0; i < 50; i++) {
            // API for world reports
            var reports = {
                "async": true,
                "crossDomain": true,
                "url": "https://covid-19-statistics.p.rapidapi.com/reports?iso=" + regionsData.data[i].iso,
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
                    "x-rapidapi-key": "73403c6c67msha0632541172766bp194ccejsn820ec377a86a"
                },
            }
            $.ajax(reports).done(function (response) {
                var countryName;
                var total = 0;
                var confirmed = 0;
                for (var j = 0; j < response.data.length; j++) {
                    total += response.data[j].deaths;

                    // console.log(response.data[j].deaths)
                }
                try {
                    var countryName = response.data[0].region.name.replace(/[^a-zA-Z ]/g, ""); // removes special character
                    $("#total-deaths").append(`<div class="input-search" data-toggle="modal" data-target="#exampleModal" data-country="${countryName}" data-number=${total}>${countryName} <span class="text-success">${formatNumber(total)}</span></div>`);
                } catch (err) {
                    // do nothing
                }
            });
        }
    });
}

// Display total World cases
function displayTotalWorldCases() {
    var total = {
        "async": true,
        "crossDomain": true,
        "url": "https://covid-19-statistics.p.rapidapi.com/reports/total",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
            "x-rapidapi-key": "73403c6c67msha0632541172766bp194ccejsn820ec377a86a"
        }
    }
    // Display world wide number of confirmed cases
    $.ajax(total).done(function (response) {
        // console.log(response);
        $("#total-world-confirmed").html("Total Confirmed <br><span class='total-number'>" + formatNumber(response.data.confirmed));
    });
}

// Display total world wide deaths
function displayWorldTotalDeaths() {
    var reports = {
        "async": true,
        "crossDomain": true,
        "url": "https://covid-19-statistics.p.rapidapi.com/reports",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
            "x-rapidapi-key": "73403c6c67msha0632541172766bp194ccejsn820ec377a86a"
        }
    }
    var totalWorldDeaths = 0;
    $.ajax(reports).done(function (response) {
        for (var i = 0; i < response.data.length; i++) {
            totalWorldDeaths += response.data[i].deaths;
        }
        $("#total-world-deaths").html("Total Deaths <br><span class='total-number'>" + formatNumber(totalWorldDeaths));
    });
}

/* ######## USA Data ######## */

// USA: Display covid cases
$("#click-usa").click(function () {
    $("#total-cases-country").empty();
    $("#total-deaths").empty();
    displayUSACases();
});

function displayUSACases() {
    var statesAPI = {
        "async": true,
        "crossDomain": true,
        "url": "https://coronavirus-us-api.p.rapidapi.com/api/state/all?source=nyt",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-us-api.p.rapidapi.com",
            "x-rapidapi-key": "d60b77f798msh32257c07ec0e08ap1cb378jsn227b3dea201a"
        }
    }
    //Ajax call for US Cases
    $.ajax(statesAPI).done(function (response) {
        var totalConfirmed = 0;
        for (var i = 0; i < response.locations.length; i++) {
            var countryName = response.locations[i].country;
            var stateName = response.locations[i].state;
            var numCases = response.locations[i].latest.confirmed
            totalConfirmed += numCases;
            $("#total-world-confirmed").html("Total Confirmed <br><span class='total-number'>" + formatNumber(totalConfirmed));
            $("#total-cases-country").append(`<div class="input-search" data-toggle="modal" data-target="#exampleModal" data-state="${stateName}" data-country="${countryName}" data-number=${numCases}>${stateName} <span class="text-success">${formatNumber(numCases)}</span></div>`);
        }
    });

    //Ajax call for US Deaths
    $.ajax(statesAPI).done(function (response) {
        var totalDeaths = 0
        for (var i = 0; i < response.locations.length; i++) {
            // console.log(response.locations[i].state);
            var countryName = response.locations[i].country;
            var stateName = response.locations[i].state;
            var numDeaths = response.locations[i].latest.deaths
            var numCases = response.locations[i].latest.confirmed;
            totalDeaths += numDeaths;
            $("#total-world-deaths").html("Total Deaths <br><span class='total-number'>" + formatNumber(totalDeaths));
            $("#total-deaths").append(`<div class="input-search" data-toggle="modal" data-target="#exampleModal" data-state="${stateName}" data-country="${countryName}" data-number=${numCases}>${stateName} <span class="text-success" >${formatNumber(numDeaths)}</span></div>`);
        }
    });
}

/*######## Toggle Map displays ########*/

// Display us map
$("#click-usa").on("click", function () {
    event.preventDefault();
    $("#world-map-container").css("display", 'none');
    $("#toggle-bubbles").addClass("disabled");
    $("#us-map-container").css("display", 'block');
});

// Display world map
$("#click-world").on("click", function () {
    event.preventDefault();
    $("#us-map-container").css("display", 'none');
    $("#world-map-container").css("display", 'block');
    $("#toggle-bubbles").removeClass("disabled");
});

// toggle bubble display 
var clicked = 0;
$("#toggle-bubbles").on("click", function () {
    event.preventDefault();
    if ($("#toggle-bubbles").hasClass("disabled")) {
        // do nothing
    } else {
        if (clicked === 0) {
            $(".bubbles").css("visibility", "hidden");
            clicked = 1;
        } else {
            $(".bubbles").css("visibility", "visible");
            clicked = 0;
        }
    }
})

// Click function to display World cases and World Deaths
$("#click-world").click(function () {
    $("#total-cases-country").empty();
    $("#total-deaths").empty();
    // Display world cases
    displayWorldCases();
    // Display world deaths
    displayWorldDeaths();
    displayWorldTotalDeaths()
    displayTotalWorldCases()
});

// This function formats numbers with commas
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}


/*######## Sort function: Work in progress ########*/
// regionsNonSync = {
//     "async": false,
//     "crossDomain": true,
//     "url": "https://covid-19-statistics.p.rapidapi.com/regions",
//     "method": "GET",
//     "headers": {
//         "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
//         "x-rapidapi-key": "73403c6c67msha0632541172766bp194ccejsn820ec377a86a"
//     },
// }

// // Covid Deaths by Country
// var totalConfirmedDeaths = [];
// $.ajax(regionsNonSync).done(function (regionsData) {
//     var totalConfirmedCases = [];
//     for (var i = 0; i < 50; i++) {

//         var reports = {
//             "async": false,
//             "crossDomain": true,
//             "url": "https://covid-19-statistics.p.rapidapi.com/reports?iso=" + regionsData.data[i].iso,
//             "method": "GET",
//             "headers": {
//                 "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
//                 "x-rapidapi-key": "73403c6c67msha0632541172766bp194ccejsn820ec377a86a"
//             },
//         }
//         $.ajax(reports).done(function (response) {


//             var total = 0;
//             for (var j = 0; j < response.data.length; j++) {
//                 total += response.data[j].deaths;

//             }
//             try {
//                 var caseObject = { name: response.data[0].region.iso, countrytotal: total }
//                 totalConfirmedDeaths.push(caseObject);

//             } catch (err) {
//                 // do nothing
//             }
//         });
//     }

// });

// totalConfirmedDeaths.sort(function (a, b) {
//     return b.countrytotal - a.countrytotal;
// });

// async function asyncCall() {
//     for (var i = 0; i < totalConfirmedDeaths.length; i++) {

//         $("#total-deaths").append("<span class='total-number-country'>" + totalConfirmedDeaths[i].name + "</span> " + formatNumber(totalConfirmedDeaths[i].countrytotal) + "</br>")
//     }
// }

// asyncCall()

