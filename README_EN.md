# NewsVisor (NieuwsVizier)
**Nederlandse versie:** [README.md](README.md)

**NewsVisor** is an open-source MVP that helps users quickly and efficiently filter news based on personal goals, interests, and well-being considerations. By combining modern AI techniques with a user-friendly interface, the app ensures that you only receive the news that truly matters to you.

## Key Features

- **Personalized News Filter:**  
  Set your own preferences and news sources. The app fetches articles via public RSS feeds (including the [WorldNewsApi](https://worldnewsapi.com/)) and utilizes AI techniques such as topic modeling and LLM-based personalization to categorize and recommend content.

- **Preventing Filter Bubbles:**  
  Recommendations are based on topics rather than opinions. For controversial subjects, multiple perspectives are displayed, allowing you to decide which viewpoint is relevant.

- **Ethically and Legally Responsible:**  
  NewsVisor does not scrape full articles but works with basic information (title, short summary, link) from RSS feeds. This respects the copyrights and terms of use of the news sources. Further, in-depth analyses are only expanded upon once additional licensing agreements are in place.

## MVP Scope

1. **Fetching Articles:**  
   - Articles are periodically fetched via the [WorldNewsApi](https://worldnewsapi.com/), currently providing Dutch news from the RSS feeds of De Telegraaf and Omroep Brabant.
   - Only basic information (title, short summary, and link) is stored to respect the rights of the source.

2. **Data Analysis:**  
   - **Topic Classification:**  
     A combination of topic modeling (using tools and APIs such as those described in [Topic Modelling via ChatGPT API](https://towardsdatascience.com/topic-modelling-using-chatgpt-api-8775b0891d16) and related GitHub projects) is employed to determine the topic of an article.
   - **LLM-based Personalization:**  
     Utilizing the OpenAI API, we experiment with techniques that align article content based on your personal goals and interests.
   - **Prompt Engineering:**  
     In the initial phase, NewsVisor primarily employs prompt engineering techniques to implement this news filtering functionality.

3. **User Interface:**  
   - An overview page displays analyzed articles with their title, topic, reliability indicators, and tone.
   - Filter options allow users to search specifically within the provided content.
   - For the full text, users are redirected to the original website.

4. **Technical Basics:**  
   - **Frontend:** The user interface is built with **modern Angular**.
   - **Backend:** A Node.js/TypeScript backend handles data storage and API integrations.
   - **Database:** All data is stored in MongoDB.

## Installation and Execution

1. **Install:**
    ```bash
    npm install
    ```
2. **Run:**
    ```bash
    npm run start
    ```

## Documentation

For more details on the architecture, AI techniques used, and implementation choices, refer to the documentation in the `docs` folder in the future.

## Invitation to Collaborate

The development of NewsVisor is an iterative and community-driven process. I invite all Knights and Data Knights to provide feedback, contribute to the build, or suggest ideas for additional functionality, algorithm improvements, or UI optimizations. Feel free to [contact us](https://dataridder.nl/contact/) or submit a pull request.

## License

This MVP is open source. Refer to [LICENSE](LICENSE) for the full license terms.

---

*Together, we transform technology from problem to solution.*