# NieuwsVizier

**NieuwsVizier** is een open source MVP die gebruikers helpt om snel en gericht nieuws te filteren op basis van persoonlijke doelen, interesses en welzijnsoverwegingen. Door het combineren van moderne AI-technieken met een gebruiksvriendelijke interface, zorgt de app ervoor dat je enkel het nieuws ontvangt dat écht van belang is.

## Kernfuncties

- **Gepersonaliseerd nieuwsfilter:**  
  Stel je eigen voorkeuren en nieuwsbronnen in. De app haalt artikelen op via openbare RSS-feeds (o.a. met de [WorldNewsApi](https://worldnewsapi.com/)) en maakt gebruik van AI-technieken zoals topic modelling en LLM-gebaseerde personalisatie om content te categoriseren en aan te bevelen.

- **Voorkomen van filterbubbels:**  
  Aanbevelingen worden gebaseerd op onderwerpen in plaats van op mening. Bij omstreden thema’s worden meerdere perspectieven getoond, zodat je zelf kunt bepalen welke invalshoek relevant is.

- **Ethisch en juridisch verantwoord:**  
  NieuwsVizier scrapt geen volledige artikelen, maar werkt met de basisinformatie (titel, korte samenvatting, link) afkomstig van de RSS-feeds. Dit respecteert de auteursrechten en gebruiksvoorwaarden van de nieuwsbronnen. Verdere, diepgaandere analyses worden pas uitgebreid zodra er nadere licentieafspraken zijn.

## MVP Scope

1. **Artikelen Ophalen:**  
   - Artikelen worden periodiek opgehaald via de [WorldNewsApi](https://worldnewsapi.com/) van een set van 2-3 vooraf geselecteerde nieuwsbronnen.
   - Enkel basisinformatie (titel, korte samenvatting en link) wordt opgeslagen om de rechten van de bron te respecteren.

2. **Data-analyse:**  
   - **Topic-Classificatie:**  
     Een combinatie van topic modelling (met tools en API's zoals die beschreven in [Topic Modelling via ChatGPT API](https://towardsdatascience.com/topic-modelling-using-chatgpt-api-8775b0891d16) en gerelateerde GitHub projecten) wordt ingezet om het onderwerp van een artikel te bepalen.
   - **LLM-gebaseerde personalisatie:**  
     Door gebruik te maken van de OpenAI API experimenteren we met technieken die de inhoud van artikelen aligneren op basis van jouw persoonlijke doelen en interesses.

3. **Gebruikersinterface:**  
   - Een overzichtspagina toont de geanalyseerde artikelen met hun titel, onderwerp, betrouwbaarheidsindicaties en toon.
   - Filteropties laten gebruikers gericht zoeken binnen de aangeboden content.
   - Voor de volledige tekst wordt er doorverwezen naar de originele website.

4. **Technische Basisonderdelen:**  
   - **Frontend:** De gebruikersinterface wordt gebouwd in **modern Angular**.
   - **Backend:** Een Node.js/TypeScript backend verzorgt de dataopslag en API-integraties.
   - **Database:** Alle data wordt opgeslagen in MongoDB.

## Documentatie

Voor meer details over de architectuur, gebruikte AI-technieken en implementatiekeuzes verwijzen we naar de documentatie in de `docs` folder:
- [Algemene Specificaties](docs/specifications.md)
- [Technische Specificaties](docs/technische-specificaties.md)
- [Ontwikkelaarsgids](docs/developers-guide.md)

## Uitnodiging tot Samenwerking

De ontwikkeling van NieuwsVizier is een iteratief en community-gedreven proces. Ik nodig alle Ridders en Dataridders uit om feedback te geven, mee te bouwen of ideeën aan te dragen voor extra functionaliteit, verbeteringen aan de algoritmes of optimalisaties aan de UI. Neem gerust [contact op](https://dataridder.nl/contact/) of dien een pull request in.

## Licentie

Deze MVP is open source. Raadpleeg [LICENSE](LICENSE) voor de volledige licentievoorwaarden.

---

*Samen transformeren we techniek van probleem tot oplossing.*
