**Software Requirements Specification (SRS) for NieuwsVizier**  
*Version 1.0 – MVP and Long-Term Vision - Samson Daniel - 24-1-25*

---

## 1. Introduction

### 1.1 Purpose
This document outlines the functional and non-functional requirements for NieuwsVizier, an open-source news aggregator that leverages AI techniques to provide users with targeted and balanced news. The focus is on:

- An **MVP** (Minimum Viable Product) with basic search functionality.
- A **Roadmap** for future expansions, including topic modeling, personalized feeds, and well-being feedback.

### 1.2 Scope
- **MVP**:
  - Keyword search functionality (in title and summary).
  - Data storage limited to title, summary, link, source, publication date, and optional topic.
  - Integration with the [WorldNewsAPI](https://worldnewsapi.com/) for fetching and optionally searching articles.
  - Backend in **Node.js/TypeScript**, Frontend in **Angular**.
- **Future**:
  - Phased rollout towards an AI-driven and customizable news assistant.
  - Addition of user accounts, personal preferences, and automatic feeds as personalization and search history become relevant.

---

## 2. MVP Specifications

### 2.1 Core Functionality

1. **Keyword Search**
   - Users can find articles through a search bar based on entered keywords in the title and summary.
   - Optional fuzzy matching and live search suggestions are "nice-to-have" for the MVP but can be added if bandwidth permits.
   - **Important**: The WorldNewsAPI already provides search functionality. The MVP can directly search their API to expedite implementation. As usage grows, we will set up our own index/cache to maintain performance and cost efficiency.

2. **Periodic Fetching & Caching**
   - Articles are fetched from at least 2-3 sources using the WorldNewsAPI.
   - **Caching** in our own database (MongoDB) to:
     - Quickly display recent search results.
     - Reduce API load.
     - Potentially lower costs during intensive usage.

3. **Limited Data Storage**
   - Only a few fields per article:
     - **Title**
     - **Summary** (max. 200 characters)
     - **Link** (to the original source)
     - **Source** (e.g., ‘NOS’, ‘TechCrunch’)
     - **Publication Date** (ISO 8601)
     - **(Optional) Topic/Subject** (basic or experimental classification)

4. **Linking to Source**
   - Each article listing contains a hyperlink that opens in a new tab with `rel="noopener noreferrer"`.

### 2.2 User Interface (UI)

1. **Search Page**
   - **Search Bar**: User types one or more keywords.
   - **Results Display**:
     - Title (clickable), Summary, Source, Publication Date (optional Topic).
     - Possible sorting options: "Most Relevant" (based on WorldNewsAPI score or our own index) and "Newest First".
   - **Detail/Click-through**: Provides the same basic information plus a "Read on [Source]" button that opens the original page.

2. **Wireframe (Simplified)**
   ```
   +----------------------------------------+
   | [Search Bar]                           |
   +----------------------------------------+
   | Results (e.g., 12)                     |
   |                                        |
   | 1. Article Title 1                     |
   |    Summary... [Source] [2023-10-01]     |
   |    Topic: Politics                     |
   |                                        |
   | 2. Article Title 2                     |
   |    Summary... [Source] [....-..-..]     |
   |    Topic: Tech                         |
   +----------------------------------------+
   ```

### 2.3 Technical Requirements

#### 2.3.1 Functional Requirements (FR)

| **FR-ID** | **Description**                                                                                                        | **Priority** |
|-----------|------------------------------------------------------------------------------------------------------------------------|--------------|
| FR-MVP-1  | Users can enter keywords; the system searches title and summary (via WorldNewsAPI or own cache).                        | High         |
| FR-MVP-2  | Search results display title, summary, source, link, publication date (and topic if available).                       | High         |
| FR-MVP-3  | Broken links are periodically checked (HTTP status) and cleaned up or marked.                                         | Medium       |
| FR-MVP-4  | Articles are fetched and cached every hour or at a set interval.                                                       | Medium       |

#### 2.3.2 Non-Functional Requirements (NFR)

| **NFR-ID** | **Description**                                                                                                       | **Priority** |
|------------|------------------------------------------------------------------------------------------------------------------------|--------------|
| NFR-MVP-1  | **Performance**: Response time < 500ms for search results with ~10,000 articles in cache or own database (excluding external API latency). | High         |
| NFR-MVP-2  | **Security**: External links open with `rel="noopener noreferrer"`.                                                 | High         |
| NFR-MVP-3  | **Accessibility**: UI adheres to WCAG 2.1 AA guidelines (contrast, navigation).                                       | Medium       |
| NFR-MVP-4  | **Privacy & Copyright**: No full articles stored; only metadata (title, summary, etc.).                                | High         |
| NFR-MVP-5  | **Availability**: Aim for >99% uptime for search functionality (subject to hosting infrastructure).                    | Medium       |

### 2.4 Data Model (MVP)

```json
{
  "_id": "ObjectId",
  "title": "Indexed Title",
  "summary": "Short summary",
  "link": "https://...",
  "source": "Source Name",
  "publishedDate": "2023-10-01T10:00:00Z",
  "topic": "Optional, detected subject"
}
```

### 2.5 Technology Stack
- **Backend**: Node.js (TypeScript), using Express or NestJS for REST-API.
- **Frontend**: Angular for a modern web interface with TypeScript.
- **Database**: MongoDB as a document-oriented storage.
- **API Integration**: WorldNewsAPI for fetching news articles and optional search functionality, with caching to limit performance costs.

---

## 3. Long-Term Vision

### 3.1 Roadmap

As the MVP grows, various new features will be added. Below is a roadmap (V2 to V7) with the **'Why'** argumentation for each step.

| **Version** | **Functionality** | **Why?** | **Technical Challenges** |
|-------------|---------------------|----------|---------------------------|
| **V2**      | **Smart Topic Search**<br>- Enhanced NLP classification (zero-shot learning, LDA/GPT-API)<br>- Users can search/filter based on automatically recognized topics | **More control** for users to filter by content type, increasing relevance compared to pure keyword search. | - Integration of NLP models<br>- Scalable topic modeling |
| **V3**      | **Automated Topic Feed**<br>- Clustering of trending topics<br>- Periodic notifications for new articles within selected categories | Users **no longer need** to actively search; they receive **relevant** new articles directly. | - LDA algorithms or alternative clustering<br>- Notification system and scalable feed architecture |
| **V4**      | **Goal Alignment**<br>- Users set personal goals/interests<br>- AI analysis of content based on goals | News is **better aligned** with the user's personal growth and interests. | - User profile management (login, preference storage)<br>- LLM-based relevance assessment |
| **V5**      | **Summary Based on Multiple Sources**<br>- AI combines multiple articles on the same topic into one summary<br>- Source attribution and reliability score per source | Users receive an **integrated and balanced** overview without reading each source separately. | - Text summarization algorithms (extractive/abstractive)<br>- Multilingual content and source verification |
| **V6**      | **Multiple Perspectives**<br>- AI detects opposing opinions<br>- Interface displays different viewpoints side-by-side | Prevents **filter bubbles** and contributes to **balanced reporting**. | - Detection of stance/perspective<br>- UI for side-by-side comparison |
| **V7**      | **User Well-Being Feedback**<br>- Sentiment analysis and check-ins (well-being surveys)<br>- Settings to limit or balance negative news | Helps users maintain **mental balance**; prevents news fatigue or negative overstimulation. | - Integration of VADER/LLM sentiment analysis<br>- UX design for well-being options |

**Note on User Accounts**: Starting from **V4**, it is necessary to add a login and authorization system, as personal preferences and goals need to be stored. Until then, NieuwsVizier can be used anonymously.

### 3.2 Monetization and Licensing Models

While the MVP will be fully open source under the MIT license, future expansions may not all be open source and/or may offer hosted services for a fee. These advanced versions may also include additional functionalities, such as extensive AI analysis, automated feeds, and user profiles with personal preferences.

The goal is to create a sustainable financial foundation for the further development and support of NieuwsVizier while keeping the core functionality accessible to the open-source community.

**Strategies:**
- **Dual Licensing**: Offer the base version as open source under the MIT license and a commercial version with additional features under a different license.
- **SaaS Model**: Host the application and offer premium services such as advanced analytics, better performance, and support for a fee.

---

## 4. Ethics and Collaboration

### 4.1 Compliance
- **GDPR**: If or when user data (such as email, search history, personal preferences) is stored, it is done so encrypted and anonymized.
- **Copyright**: No full articles are stored. We adhere to the terms of each API or RSS feed.

### 4.2 Contribution Process
- **GitHub Workflow**
  - Contributions via pull requests are welcome.
  - **Unit tests and documentation are strongly encouraged**, but not necessarily mandatory. Smaller PRs can also be valuable without full test coverage.
- **Discussion & Experiments**
  - Feature requests, bug reports, and ideas can be created as Issues.
  - Experiments with AI models are ideally documented in Jupyter notebooks or similar tools to provide transparency to the community.

---

## 5. Conclusion

### 5.1 Summary
The MVP of NieuwsVizier focuses on a keyword search function (with optional support from WorldNewsAPI search options), complemented by caching in an own database to optimize performance and API costs. The roadmap provides a clear development path towards a fully AI-driven, personalized news assistant, including multiple perspectives and well-being considerations.

### 5.2 Next Steps
1. **Implement MVP** – Build and test (4-6 weeks)
2. **User Feedback** – Evaluate search ease, performance, and UI/UX.
3. **Expansion** – Integrate V2 features (Smart Topic Search), emphasizing the ‘why’ and added value.
4. **Community Contributions** – Regular releases and feedback rounds to evolve towards V3-V7.

**Together, we transform technology from problem to solution.** Feel free to contact us, open a GitHub issue, or submit a pull request to contribute!