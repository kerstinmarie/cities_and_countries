"use strict";
console.log("main.js");
let visitCitiesArr = [];

fetch('https://app-countries-and-cities.herokuapp.com/countries')
    .then(function (response) {
        return response.json();
    })
    .then(function (land) {
        fetch('https://app-countries-and-cities.herokuapp.com/cities')
            .then(function (response) {
                return response.json();
            })
            .then(function (stad) {
                printCountriesMenu(land, stad);
            });
    });

function printCountriesMenu(land, stad) {
    let pageHeader = document.getElementById("pageHeader");
    let navCountry = document.createElement("nav");
    let ulCountry = document.createElement("ul");
    navCountry.setAttribute("id", "menuCountries");
    navCountry.setAttribute("class", "nav-menu-countries");
    ulCountry.setAttribute("id", "countryMenu");
    // Skriver ut länder till menyn med id
    for (let i = 0; i < land.length; i++) {
        ulCountry.innerHTML += "<li id='" + land[i].id + "'>" + land[i].countryname + "</li>";
    }
    navCountry.appendChild(ulCountry);
    pageHeader.innerHTML = "";
    pageHeader.appendChild(navCountry);
    // Länkar till städer för respektive land
    countryMenu.addEventListener("click", function (event) {
        printCountryAndCitiesMenus(stad, land);
    });
    // Länken/knappen till städer jag besökt
    let ulCityLink = document.createElement("ul");
    let liCityLink = document.createElement("li");
    let liCityLinkText = document.createTextNode("Städer jag besökt");
    ulCityLink.setAttribute("id", "showCityLink");
    liCityLink.setAttribute("id", "myCityLink");
    ulCityLink.appendChild(liCityLink);
    liCityLink.appendChild(liCityLinkText);
    pageHeader.appendChild(ulCityLink);
    // Knapplänk till sidan "Städer jag besökt"
    myCityLink.addEventListener("click", function () {
        printVisitCities(stad, land);
    });
}

// Skriver ut lista med städer för respektive land
function printCountryAndCitiesMenus(stad, id) {
    let mainNav = document.getElementById("mainNav");
    let navCity = document.createElement("nav");
    let ulCity = document.createElement("ul");
    navCity.setAttribute("id", "menuCities");
    navCity.setAttribute("class", "nav-menu-cities");
    ulCity.setAttribute("id", "citiesMenu");
    // Skriver ut menyn med städer med id
    for (let i = 0; i < stad.length; i++) {
        if (stad[i].countryid == event.target.id) {
            ulCity.innerHTML += "<li id='" + stad[i].id + "'>" + stad[i].stadname + "</li>";
        }
    }
    navCity.appendChild(ulCity);
    mainNav.innerHTML = "";
    mainContent.innerHTML = "";
    mainNav.appendChild(navCity);
    // Kallar på funktionen som skriver ut informationen om respektive stad
    citiesMenu.addEventListener("click", function (event) {
        printCityInformation(stad, id);
    });
}

// Skriver ut vyn med en specifik stad, invånarantal och "Besök"-knapp"
function printCityInformation(stad, id) {
    for (let j = 0; j < stad.length; j++) {
        if (stad[j].id == event.target.id) {
            let mainContent = document.getElementById("mainContent");
            mainContent.innerHTML = "";
            mainContent.insertAdjacentHTML("beforeend", "<div id='infoView'></div>");
            infoView.insertAdjacentHTML("beforeend", "<header><h1 id='" + stad[j].stadname + "'>" + stad[j].stadname + "</h1></header><p>" + stad[j].stadname + " är en stad i Sverige där det bor " + stad[j].population + " invånare." + "</p><button id='visitButton'>Besökt</button>");
            visitButton.addEventListener("click", function () {
                if (localStorage.getItem('cityList')) {
                    visitCitiesArr = JSON.parse(localStorage.getItem('cityList'));
                } else {
                    //console.log("localStorage inte satt");
                }
                // Lägger till städer i visitCitiesArr
                visitCitiesArr.push(stad[j].id);
                // Sparar visitCitiesArr som sträng saveVisitCities
                let saveVisitCities = JSON.stringify(visitCitiesArr);
                // Sparar strängen  i localStorage saveVisitCities
                localStorage.setItem('cityList', saveVisitCities);
            });
        }
    }
}

function printVisitCities(stad, id) {
    // Skapar listan med städer
    let mainContent = document.getElementById("mainContent");
    mainNav.innerHTML = "";
    mainContent.innerHTML = "";
    mainContent.insertAdjacentHTML("beforeend", "<div id='visitView'></div>");
    visitView.insertAdjacentHTML("beforeend", "<header><h1>Lista med besökta städer</h1></header>");
    visitView.insertAdjacentHTML("beforeend", "<ul id='visitCitiesList'></ul>");
    if (localStorage.getItem('cityList')) {
        visitCitiesArr = JSON.parse(localStorage.getItem('cityList'));
        // Skapar unika index för att inte upprepa utskriften av besökta städer flera gånger
        visitCitiesArr = Array.from(new Set(visitCitiesArr));
        // Skriver ut listan med städer
        for (let i = 0; i < stad.length; i++) {
            for (let k = 0; k < visitCitiesArr.length; k++) {
                if (stad[i].id == visitCitiesArr[k]) {
                    visitCitiesList.innerHTML += "<li>" + stad[i].stadname + "</li>";
                }
            }
        }

        function sumFunction(total, num) {
            return total + num;
        }
        // Skapar uträkningen av de besökta städernas totala population
        let populationCitiesArr = [];
        visitView.insertAdjacentHTML("beforeend", "<div id='visitViewPara'></div>");
        if (localStorage.getItem('cityList')) {
            visitCitiesArr = JSON.parse(localStorage.getItem('cityList'));
            visitCitiesArr = Array.from(new Set(visitCitiesArr));
            // Skriver ut den totala populationen
            for (let i = 0; i < stad.length; i++) {
                for (let k = 0; k < visitCitiesArr.length; k++) {
                    if (stad[i].id == visitCitiesArr[k]) {
                        populationCitiesArr.push(stad[i].population);

                        let sum = 0;
                        sum = populationCitiesArr.reduce(sumFunction);
                        sumFunction();
                        visitViewPara.innerHTML = "";
                        visitViewPara.insertAdjacentHTML("beforeend", "<p>Summan av invånarantalet i de besökta städerna är: <span class='bold'>" + sum + ".</span></p>");
                    }
                }
            }
            visitView.insertAdjacentHTML("beforeend", "<button id='deleteCitiesButton'>Rensa städer</button>");
        }
        deleteCitiesButton.addEventListener("click", function () {
            visitView.innerHTML = "";
            localStorage.clear();
            visitCitiesArr = [];
            populationCitiesArr = [];
        });
    } else {
        visitView.innerHTML = "<p>Det finns för närvarande inga sparade städer.</p>"
    }
}

