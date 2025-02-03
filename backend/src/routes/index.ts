import { Router, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';

const WORLD_NEWS_API_URL = process.env.WORLD_NEWS_API_URL;
const WORLD_NEWS_API_KEY = process.env.WORLD_NEWS_API_KEY;

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${WORLD_NEWS_API_URL}/search-news?source-country=nl&api-key=${WORLD_NEWS_API_KEY}&earliest-publish-date=2025-02-03 00:00:00&number=1&language=nl`,
      headers: { }
    };
    
    const response = await axios.request(config);

    // Map the news array to exclude the text field
    const newsData = response.data.news.map((item: any) => {
      const { text, ...rest } = item; // Destructure to exclude the text field. We don't want to include this in the response for legal reasons.
      return rest;
    });

    console.log(newsData); // Log the modified newsData array

    // Send the modified response
    res.json({ ...response.data, news: newsData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the news.' });
  }
});

export default router;