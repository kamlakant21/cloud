var newsAPI = {
	"async": true,
	"crossDomain": true,
	"url": "https://covid-19-news.p.rapidapi.com/v1/covid?lang=en&media=True&q=covid",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "covid-19-news.p.rapidapi.com",
		"x-rapidapi-key": "9564c8d290msh40fef144dfa918bp12886fjsn36d7ad8e50e1"
	}
}
$.ajax(newsAPI).done(function (response) {
	var values = [];
	for (var i = 0; i < response.articles.length; ++i) {
		values.push(i);
	}

	// Create 2 carousel items
	for (let i = 0; i < 3; i++) {
		if (i === 0) {
			$("#news-carousel-inner")
			.append(`<div class="carousel-item active">
						<div class="card-group" id="news-card-group-${i}">    
						</div>
					</div>`);
		} else {
			$("#news-carousel-inner")
			.append(`<div class="carousel-item">
						<div class="card-group" id="news-card-group-${i}">    
						</div>
					</div>`);
		}
		// Create card's for news articles
		for (let j = 0; j < 5; j++) {
			var rand = values.splice(Math.random() * values.length, 1)[0];

			// ensure that article has a picture and title is not too long
			while (response.articles[rand].hasOwnProperty('media') === false || response.articles[rand].media === null ||
				response.articles[rand].media === undefined || rand === 8) {
				rand = values.splice(Math.random() * values.length, 1)[0];
			}
			
			var title = response.articles[rand].title;
			var summary = response.articles[rand].summary
			var publisher = response.articles[rand].clean_url;
			var media = response.articles[rand].media
			var link = response.articles[rand].link;
			// console.log(response.articles[rand].summary)

			if (summary.length >= 120) {
				summary = summary.substring(0, 120);
				summary += "..."
			}
			if (title.length >= 50) {
				title = title.substring(0, 50);
				title += "..."
			}
			$("#news-card-group-"+i)
				.append(`<div class="card">
						<a href=${link} target="_blank">
							<img src="${media}" class="card-img-top img-fluid h-100" id="card-${j + 1}-img" alt="..." style="max-height:150px;">
						</a>
						<div class="card-body" id="news-card-body">
							<h5 class="card-title mb-0" id="card-${j + 1}-title">${title}</h5>
							<p class="mb-0 style="font-size:x-small;"><span class="font-weight-light text-secondary">${publisher}<span></p>
							<p class="card-text mb-0" id="card-${j + 1}-news">${summary}</p>
						</div>
					</div>`);
		}
	}
});
