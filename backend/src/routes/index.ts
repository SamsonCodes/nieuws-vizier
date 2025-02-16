import { Router, Request, Response, RequestHandler } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import axios, { AxiosError } from 'axios';

const WORLD_NEWS_API_URL = process.env.WORLD_NEWS_API_URL;
const WORLD_NEWS_API_KEY = process.env.WORLD_NEWS_API_KEY;

const router = Router();

const newsHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const keyword = req.query.keyword;
    console.log('Keyword: ' + keyword);
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${WORLD_NEWS_API_URL}/search-news?source-country=nl&api-key=${WORLD_NEWS_API_KEY}&number=1&language=en&text=${keyword}`,
      headers: {}
    };

    const response = await axios.request(config);

    // Map the news array to exclude the text field.
    const newsData = response.data.news.map((item: any) => {
      const { text, ...rest } = item;
      return rest;
    });

    // If no news found, return a message with an empty array.
    if (!newsData.length) {
      res.json({ message: "No results found", news: [] });
      return;
    }

    console.log(newsData[0].title);
    res.json({ ...response.data, news: newsData });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const status = axiosError.response ? axiosError.response.status : 500;
      const data = axiosError.response ? axiosError.response.data : 'No response data';
      const message = (data as any).message;
      console.error('Error:', message);
      res.status(status).json({ error: message });
      return;
    }
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the news.' });
  }
};

router.get('/', newsHandler);

export default router;