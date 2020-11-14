# Övning: API till städer och länder
## Kravspecifikation

* Två separata sidor, en för att skapa och ändra JSON-filer på med Node.js på Azure och en för presentation av städer och länder.
* En frontend applikation på GitHub Pages som visar städer och länder utifrån de JSON-svar som generas från Node.js-appen.
* Till Node.js appen ska man kunna lägga till nya länder och till dessa länder nya städer samt antal invånare.
* Ändringar skall automatiskt reflekteras på frontend sidan på GitHub Pages.

<br/>
https://kerstinmarie.github.io/cities_and_countries/frontend/

<br/><br/>

# Inlämningsuppgift: Städer och länder, 10 Yhp
## Inlämningsuppgift i kursen Webbapplikation MVP, 50 yhp
Uppgiften består i att göra en sida där dynamisk inhämtning och lagring av data används för att visualisera användarens besökta städer och länder med hjålp av information i från två olika JSON-filer.

Kravspecifikation:

* De bifogade JSON-filerna ska användas, utan modifiering. (10p)

* Sidan ska ha en meny som visar länder. Denna meny ska visas genomgående på alla sidor. Klickar besökaren på ett land, så ska detta landets städer presenteras i en egen vy eller undermeny. (10p)

* Klickar besökaren på en stad, så ska en informationsvy visas med fakta om staden och även stadens invånarantal. Informationen kan exempelvis innehålla "Linköping är en stad i Sverige med 104 232 invånare". (10p)

* I informationsvyn över staden ska det finnas en knapp "besökt" som sparar stadens ID i en Array som även ska sparas till localStorage. (10p)

* I samma meny som visar länder ska det under länderna finnas en länk till en sida med titeln "Städer jag besökt". Denna länk ska vara synlig i menyn med länder hela tiden. (5p)

* Sidan "Städer jag besökt" ska visa de städer besökaren markerat att den besökt (20p) och ska även räkna ut det totala antalet människor som besökaren kan ha råkat träffa (tips: Vet du summan av invånarantalet i de besökta städerna?). (10p)

* Besökaren ska även kunna rensa sin historik och tömma sin lista på besökta städer. (5p)
