import axios from 'axios';
import { logger } from '../utils/logger.js';

const n8nApi = axios.create({
  baseURL: process.env.N8N_API_URL,
  headers: {
    'X-N8N-API-KEY': process.env.N8N_API_TOKEN,
    'Content-Type': 'application/json'
  }
});

export const getN8nWorkflows = async () => {
  try {
    const response = await n8nApi.get('/workflows');
    return response.data;
  } catch (error) {
    logger.error('n8n API Error:', error);
    throw new Error('Error fetching n8n workflows');
  }
};

export const triggerWorkflow = async (workflowId, data) => {
  try {
    const response = await n8nApi.post(`/workflows/${workflowId}/execute`, data);
    return response.data;
  } catch (error) {
    logger.error('n8n API Error:', error);
    throw new Error('Error triggering n8n workflow');
  }
};