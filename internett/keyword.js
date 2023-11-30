const keywords = [
    "Internett er et nettverk, men som er bygget opp av andre nettverk enn kun datamaskiner og hardware. Informasjon blir altså sendt til og fra forskjellige mindre nettverk.",
    "Et nettverk er, kort sagt, datamaskiner koblet sammen. Det vil si at alle datamaskiner innenfor et nettverk kan kommunisere med hverandre.",
    "Klienter er det man kaller datamaskinene som brukes til å forespørre informasjon på internettet.",
    "Tjenere er der informasjonen man søker etter på internettet er lagret.",
    "Uniform Resource Locator er det man må skrive i en nettleser for at den skal komme til en spesifikk tjener. Det er gjennom det gitte domenenavnet at man finner IP-adressen til tjeneren. Man kan si at det er en kombinasjon av Hypertext Transfer Protocol, og IP-adresse i form av domenenavn.",
    "Det er nødvendig med standarder for datakommunikasjon. Disse kalles protokoller. På samme måte som at vi må snakke samme språk for å kommunisere, må datamaskiner følge de samme reglene.",
    "Internet Protocol er nødvendig for kommunikasjon mellom datamaskiner. En IP-adresse er et unikt sett med 4 tall separert med punktum som kan brukes til å finne maskinen den tilhører. Alt som er koblet til internett har en IP-adresse.",
    "Transmission Control Protocol er det som bestemmer hvordan man kommuniserer gjennom internett. Informasjon blir delt opp i “pakker” som sendes, der hver pakke også har instrukser til hvordan pakkene skal settes sammen igjen. På denne måten kan man rekonstruere informasjonen når pakkene er mottatt, og man kan dobbeltsjekke at alt kom fram.",
    "Hypertext Transfer Protocol er protokollen som brukes i nettleseren slik at den kan kommunisere med tjeneren. Det kommer før domenenavnet til et nettsted, der http:// sørger for at tjeneren vet hva man vil ha tilgang til.",
    "HTTP status codes, er feilmeldinger som blir sendt av tjeneren til klienten om noe går galt. 404 - Not found er det man ser om det klienten etterspør ikke finnes. Generelt vil alle feilmeldinger som starter på 4 indikere at det er en feil fra klienten, derimot er det en feil på tjeneren sin side om feilmeldingen starter på 5."
]

function showKeyword(index) {
    var informationBox = document.getElementById("informasjon");
    informationBox.innerHTML = keywords[index];
}