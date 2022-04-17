
# PROJECT #1 - Secure Travel App

## CONCEPT
A travel app that advises the user where they should travel based on Coronavirus 
risk recommendations and provides the user with travel accommodation options.

## User Story
* View number of confirmed cases
* View number of Deaths
* View a map display of color-coded areas highlighting hotspots
* Display US map with color-coded areas that displays case information.
* Button that toggles between US map and World map.
* Clickable locations that displays three random hotel locations and risk levels.
* Book now feature that links the user to Trip Advisor

## Site information Display
  * Total confirmed deaths
  * Total confirmed cases (based on API information provided)
  * Highlight countries currently blocking travel
  * We created our own parameters of what constitutes being a safe location to travel to
  * Hotel information displayed at user’s selected destination

## Process
  ### Front End Development
  * We used HTML, CSS, JavaScript and Bootstrap to build out the design layout.
  * Added a carousel from Bootstrap to have running updates of Covid-19 news.
  * Added media queries to add some functionality when a user views the site on various sized devices. 
  * Added scroll buttons to country and U.S, state listings so the viewer can find their selected locations with ease.
  * Styled the background color, added Search button and bar.
    
  ### Back End Development
  * Within the calls we appended the data to those columns 
  * Added click functions to switch back and forth between the USA and World maps to be able to toggle between the two which will display the results.
  * Added a click function (modal) that triggers the modal which displays hotel information to the user at their desired location.
  * Appended the hotel info (name price etc.) within the modal for locations in the US and the World.
  * Used API calls to:
    * Write the total amount of cases by country
    * Highlight total death by country
    * Track US states confirmed cases
    * Illustrate US Death confirmed cases

### Technologies used:  
  HTML, CSS, Bootstrap, JavaScript, D3.js, jQuery
### API's used
COVID-19 Statistics By Axisbits [Link](https://english.api.rakuten.net/axisbits-axisbits-default/api/covid-19-statistics)

Coronavirus-us-api By Spiderpig86 [Link](https://rapidapi.com/Spiderpig86/api/coronavirus-us-api)

TripAdvisor API By apidojo [Link](https://english.api.rakuten.net/apidojo/api/tripadvisor1)
    
COVID-19 News By kotartemiy [Link](https://rapidapi.com/kotartemiy/api/covid-19-news)

## CHALLENGES
  * Page load time when pulling data from API
  * Limited API calls using the TripAdvisor API
  * Working around asynchronous functions
  * Managing pull requests and Git commits
  * Mobile responsiveness
  * Interpreting the data between 2 separate API calls

## LINK TO DEPLOYED APPLICATION / GITHUB

[GitHub Pages](https://edwardreyes29.github.io/project-1/)

[GitHub](https://github.com/edwardreyes29/project-1)

## AUTHORS AND ACKNOWLEDGEMENT

Front End: Anissa Shanks, Anthony Figueroa, Darren Huang

Back End: Edward Reyes, Nick Guimarais
