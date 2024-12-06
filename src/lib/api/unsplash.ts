import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
  }
});

export const unsplashApi = {
  searchPhoto: async (query: string): Promise<string> => {
    const { data } = await api.get('/search/photos', {
      params: {
        query,
        orientation: 'landscape',
        per_page: 1
      }
    });

    if (!data.results?.[0]) {
      throw new Error('No image found');
    }

    return data.results[0].urls.regular;
  }
};