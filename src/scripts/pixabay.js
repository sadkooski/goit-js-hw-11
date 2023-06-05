import { API_PATH, DEFAULT_PIXABAY_PARAMS } from './config.js';
const axios = require('axios').default;
export let totalHits;

export default async function pingPixabay({ q = '', page = '1' }) {
  try {
    const querystring = new URLSearchParams({
      ...DEFAULT_PIXABAY_PARAMS,
      page,
      q,
    });

    const response = await axios.get(`${API_PATH}?${querystring}`);
    if (!response.ok) {
      if (response.status === 400) {
        return [];
      }
    }
    const photos = response.data.hits;
    totalHits = response.data.totalHits;

    console.log(totalHits);
    console.log('2', photos);
    return photos;
  } catch (e) {
    return { error: e.toString() };
  }
}
