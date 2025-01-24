# Software Requirements Specification (SRS) voor NieuwsVizier
*Versie 1.0 – MVP en Lange Termijn Visie - Samson Daniel - 24-1-25*

---

## 1. Inleiding

### 1.1 Doel
Dit document beschrijft de functionele en niet-functionele eisen voor NieuwsVizier, een open-source nieuwsaggregator die gebruikmaakt van AI-technieken om gebruikers gericht en gebalanceerd nieuws aan te bieden. De nadruk ligt op:

- Een **MVP** (Minimum Viable Product) met basale zoekfunctionaliteit.  
- Een **Roadmap** voor toekomstige uitbreidingen, waaronder topicmodellering, gepersonaliseerde feeds, en welzijnsfeedback.

### 1.2 Reikwijdte
- **MVP**:
  - Zoekfunctie op kernwoorden (in titel en samenvatting).  
  - Data-opslag beperkt tot titel, samenvatting, link, bron, publicatiedatum en optioneel onderwerp.  
  - Integratie met de [WorldNewsAPI](https://worldnewsapi.com/) voor het ophalen en (optioneel) doorzoeken van artikelen.  
  - Backend in **Node.js/TypeScript**, Frontend in **Angular**.  
- **Toekomst**:
  - Gefaseerde uitrol naar een AI-gedreven en personaliseerbare nieuwsassistent.  
  - Toevoegen van gebruikersaccounts, persoonlijke voorkeuren en automatische feeds zodra personalisatie en zoekgeschiedenis relevant worden.

---

## 2. MVP-Specificaties

### 2.1 Kernfunctionaliteit

1. **Zoeken op Kernwoord**  
   - Gebruikers kunnen via een zoekbalk artikelen vinden op basis van ingevoerde trefwoorden in titel en samenvatting.  
   - Eventuele fuzzy matching en live zoeksuggesties zijn “nice-to-have” in de MVP, maar kunnen worden toegevoegd als bandbreedte het toelaat.  
   - **Belangrijk**: De WorldNewsAPI biedt al zoekfunctionaliteit. De MVP kan direct op hun API zoeken om de implementatie te versnellen. Bij groeiend gebruik zullen we onze eigen index/cache opzetten om performantie- en kostenefficiënt te blijven.

2. **Periodiek Ophalen & Cachen**  
   - Artikelen worden vanuit (minimaal) 2-3 bronnen opgehaald met de WorldNewsAPI.  
   - **Caching** in een eigen database (MongoDB) om:  
     - Snel recente zoekresultaten weer te geven.  
     - De API-belasting te beperken.  
     - Eventuele kosten te reduceren bij intensief gebruik.

3. **Beperkte Data-opslag**  
   - Enkele velden per artikel:  
     - **Titel**  
     - **Samenvatting** (max. 200 tekens)  
     - **Link** (naar de originele bron)  
     - **Bron** (bijv. ‘NOS’, ‘TechCrunch’)  
     - **Publicatiedatum** (ISO 8601)  
     - **(Optioneel) Topic/Onderwerp** (basis- of experimentele classificatie)  

4. **Doorklikken naar Bron**  
   - Elke artikelvermelding bevat een hyperlink die opent in een nieuw tabblad met `rel="noopener noreferrer"`.

### 2.2 Gebruikersinterface (UI)

1. **Zoekpagina**  
   - **Zoekbalk**: Gebruiker typt één of meerdere trefwoorden.  
   - **Resultatenweergave**:  
     - Titel (klikbaar), Samenvatting, Bron, Publicatiedatum (eventueel Onderwerp).  
     - Mogelijke sorteeropties: “Meest relevant” (indien score van de WorldNewsAPI of eigen index) en “Nieuwste eerst”.  
   - **Detail/Doorklik**: Biedt dezelfde basisinformatie, plus een knop “Lees op [Bron]” die opent naar de originele pagina.

2. **Wireframe (vereenvoudigd)**  
   ```
   +----------------------------------------+
   | [Zoekbalk]                             |
   +----------------------------------------+
   | Resultaten (bijv. 12)                 |
   |                                        |
   | 1. Titel van Artikel 1                |
   |    Samenvatting... [Bron] [2023-10-01] |
   |    Onderwerp: Politiek                |
   |                                        |
   | 2. Titel van Artikel 2                |
   |    Samenvatting... [Bron] [....-..-..] |
   |    Onderwerp: Tech                    |
   +----------------------------------------+
   ```

### 2.3 Technische Eisen

#### 2.3.1 Functionele Eisen (FR)

| **Eis-ID**  | **Beschrijving**                                                                                                        | **Prioriteit** |
|-------------|-------------------------------------------------------------------------------------------------------------------------|----------------|
| FR-MVP-1    | Gebruiker kan trefwoorden invoeren; systeem doorzoekt titel en samenvatting (d.m.v. WorldNewsAPI of eigen cache).       | Hoog           |
| FR-MVP-2    | Zoekresultaten tonen titel, samenvatting, bron, link, publicatiedatum (en indien beschikbaar het onderwerp).            | Hoog           |
| FR-MVP-3    | Gebroken links worden periodiek gecontroleerd (HTTP-status) en opgeruimd of gemarkeerd.                                 | Middel         |
| FR-MVP-4    | Artikelen worden elk uur of op ingestelde interval opgehaald en gecached.                                               | Middel         |

#### 2.3.2 Niet-Functionele Eisen (NFR)

| **Eis-ID**  | **Beschrijving**                                                                                                       | **Prioriteit** |
|-------------|------------------------------------------------------------------------------------------------------------------------|----------------|
| NFR-MVP-1   | **Performance**: Responstijd < 500ms bij ~10.000 artikelen in cache of eigen database (exclusief externe API latency). | Hoog           |
| NFR-MVP-2   | **Veiligheid**: Externe links openen met `rel="noopener noreferrer"`.                                                 | Hoog           |
| NFR-MVP-3   | **Toegankelijkheid**: UI houdt rekening met WCAG 2.1 AA-richtlijnen (contrast, navigatie).                            | Middel         |
| NFR-MVP-4   | **Privacy & Auteursrecht**: Geen volledige artikelen opslaan; enkel metadata (titel, samenvatting…).                  | Hoog           |
| NFR-MVP-5   | **Beschikbaarheid**: Streven naar >99% uptime voor zoekfunctionaliteit (mits hosting-infrastructuur dit toelaat).       | Middel         |

### 2.4 Datamodel (MVP)

```json
{
  "_id": "ObjectId",
  "title": "Titel (geïndexeerd)",
  "summary": "Korte samenvatting",
  "link": "https://...",
  "source": "Bronnaam",
  "publishedDate": "2023-10-01T10:00:00Z",
  "topic": "Optioneel, gedetecteerd onderwerp"
}
```

### 2.5 Technologiestack
- **Backend**: Node.js (TypeScript), gebruikmakend van Express of NestJS voor REST-API.  
- **Frontend**: Angular voor een moderne webinterface met TypeScript.  
- **Database**: MongoDB als documentgeoriënteerde opslag.  
- **API Integratie**: WorldNewsAPI voor het ophalen van nieuwsartikelen en (optionele) zoekfunctionaliteit, met caching om performancekosten te beperken.

---

## 3. Lange Termijn Visie

### 3.1 Roadmap

Naarmate de MVP groeit, worden diverse nieuwe functies toegevoegd. Hieronder een roadmap (V2 t/m V7) met de **‘Waarom’**-argumentatie per stap.

| **Versie** | **Functionaliteit** | **Waarom?** | **Technische Uitdagingen** |
|------------|---------------------|-------------|----------------------------|
| **V2**     | **Slimme Topic Search**<br>- Uitgebreide NLP-classificatie (zero-shot learning, LDA/GPT-API)<br>- Gebruikers kunnen zoeken/filteren op automatisch herkende onderwerpen | **Meer controle** voor gebruikers om te filteren op type content, waardoor de relevantie hoger wordt dan bij een pure trefwoord-zoekopdracht. | - Integratie van NLP-modellen<br>- Topicmodellering op schaal |
| **V3**     | **Geautomatiseerde Topic Feed**<br>- Clustering van trending topics<br>- Periodieke meldingen/notificaties bij nieuwe artikelen binnen geselecteerde categorieën | Gebruikers **hoeven niet meer actief** te zoeken; ze krijgen direct **relevante** nieuwe artikelen. | - LDA-algoritmen of alternatieve clustering<br>- Meldingssysteem en schaalbare feed-architectuur |
| **V4**     | **Goal Alignment**<br>- Gebruikers stellen persoonlijke doelen/interesses in<br>- AI-analyse van content op basis van doelen | Nieuws wordt **beter afgestemd** op persoonlijke groei en interesses van de gebruiker. | - Gebruikersprofielbeheer (login, voorkeursopslaan)<br>- LLM-gebaseerde beoordeling van relevantie |
| **V5**     | **Samenvatting op Basis van Meerdere Bronnen**<br>- AI combineert meerdere artikelen over hetzelfde onderwerp in één samenvatting<br>- Bronvermelding en betrouwbaarheidsscore per bron | Gebruikers krijgen een **geïntegreerd en gebalanceerd** overzicht, zonder elke bron apart te lezen. | - Tekstsamenvattingsalgoritmes (extractive/abstractive)<br>- Meertalige inhoud en bronverificatie |
| **V6**     | **Meerdere Perspectieven**<br>- AI herkent tegengestelde meningen<br>- Interface toont verschillende invalshoeken side-by-side | Voorkomt **filterbubbels** en draagt bij aan **evenwichtige berichtgeving**. | - Detectie van stance/perspectief<br>- UI voor side-by-side vergelijking |
| **V7**     | **Gebruikerswelzijnsfeedback**<br>- Sentimentanalyse en check-ins (welzijnsenquêtes)<br>- Instellingen om (te) negatief nieuws te beperken of balanceren | Helpt gebruikers om **mentale balans** te behouden; het voorkomt nieuwsmoeheid of negatieve overprikkeling. | - Integratie VADER/LLM sentimentanalyse<br>- UX-ontwerp voor welzijnsopties |

**Opmerking gebruikersaccounts**: Vanaf (uiterlijk) **V4** is het noodzakelijk om een login- en autorisatiesysteem toe te voegen, aangezien er persoonlijke voorkeuren en doelstellingen opgeslagen moeten worden. Tot die tijd kan NieuwsVizier anoniem gebruikt worden.

### 3.2 Monetarisatie en Licentiemodellen

Hoewel de MVP volledig open source zal zijn onder de MIT-licentie, is het mogelijk dat verdere uitbreidingen niet allemaal open source zullen zijn en/of waarvoor gehoste diensten tegen betaling beschikbaar zullen zijn. Deze geavanceerde versies kunnen eventueel ook extra functionaliteiten bevatten, zoals uitgebreide AI-analyse, geautomatiseerde feeds, en gebruikersprofielen met persoonlijke voorkeuren.

Het doel is om een duurzame financiële basis te creëren voor de verdere ontwikkeling en ondersteuning van NieuwsVizier, terwijl de kernfunctionaliteit toegankelijk blijft voor de open source community.


---

## 4. Ethiek en Samenwerking

### 4.1 Compliance
- **GDPR**: Indien of zodra gebruikersgegevens (zoals e-mail, zoekgeschiedenis, persoonlijke voorkeuren) worden opgeslagen, gebeurt dit versleuteld en geanonimiseerd.  
- **Auteursrecht**: Geen volledige artikelen opslaan. We volgen de voorwaarden van elke API of RSS-feed.  

### 4.2 Bijdrageproces
- **GitHub Workflow**  
  - Contributies via pull requests zijn welkom.  
  - **Unit tests en documentatie worden sterk aangemoedigd**, maar zijn niet per definitie verplicht. Kleinere PR’s kunnen ook waardevol zijn zonder volledige testdekking.  
- **Discussie & Experimenten**  
  - Feature requests, bug reports, en ideeën kunnen als Issues worden aangemaakt.  
  - Experimenten met AI-modellen worden idealiter gedocumenteerd in Jupyter-notebooks of vergelijkbare tooling, zodat ze voor de community inzichtelijk zijn.

---

## 5. Conclusie

### 5.1 Samenvatting
De MVP van NieuwsVizier richt zich op een kernwoord-zoekfunctie (met optionele ondersteuning van de WorldNewsAPI-zoekopties), aangevuld met caching in een eigen database om prestaties en API-kosten te optimaliseren. De roadmap biedt een helder ontwikkelpad naar een volledig AI-gedreven, gepersonaliseerde nieuwsassistent, inclusief meerdere perspectieven en welzijnsoverwegingen.

### 5.2 Volgende Stappen
1. **Implementatie MVP** – Bouwen en testen (4-6 weken)  
2. **Gebruikersfeedback** – Evaluatie van zoekgemak, performance en UI/UX.  
3. **Uitbreiding** – Integreren van V2-functies (Slimme Topic Search), met nadruk op het ‘waarom’ en de toegevoegde waarde.  
4. **Community-bijdragen** – Regelmatig releases en feedbackrondes om richting V3-V7 te evolueren.  

**Samen transformeren we techniek van probleem tot oplossing.** Neem gerust contact op, open een GitHub-issue of dien een pull request in om bij te dragen!