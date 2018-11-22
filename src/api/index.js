import axios from 'axios';
import { apiKey } from './config';

export default axios.create({
  baseURL: 'https://newsapi.org/v2',
  timeout: 5000,
  headers: { Authorization: apiKey }
});
