import axios from 'axios';
import { logger } from '../utils/logger.js';

const makeApi = axios.create({
  baseURL: process.env.MAKE_API_URL,
  headers: {
    'Authorization': `Token ${process.env.MAKE_API_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

export const getMakeFlows = async () => {
  try {
    const response = await makeApi.get('/scenarios');
    return response.data;
  } catch (error) {
    logger.error('Make API Error:', error);
    throw new Error('Error fetching Make flows');
  }
};

export const executeFlow = async (flowId, data) => {
  try {
    const response = await makeApi.post(`/scenarios/${flowId}/run`, data);
    return response.data;
  } catch (error) {
    logger.error('Make API Error:', error);
    throw new Error('Error executing Make flow');
  }
};