import express from 'express';
import { getMakeFlows, executeFlow } from '../services/makeService.js';
import { getN8nWorkflows, triggerWorkflow } from '../services/n8nService.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// Get all automation flows
router.get('/flows', async (req, res) => {
  try {
    const makeFlows = await getMakeFlows();
    const n8nWorkflows = await getN8nWorkflows();
    
    res.json({
      make: makeFlows,
      n8n: n8nWorkflows
    });
  } catch (error) {
    logger.error('Error fetching automation flows:', error);
    res.status(500).json({ error: 'Error fetching automation flows' });
  }
});

// Execute a specific flow
router.post('/execute/:platform/:flowId', async (req, res) => {
  try {
    const { platform, flowId } = req.params;
    const { data } = req.body;

    let result;
    if (platform === 'make') {
      result = await executeFlow(flowId, data);
    } else if (platform === 'n8n') {
      result = await triggerWorkflow(flowId, data);
    } else {
      return res.status(400).json({ error: 'Invalid platform' });
    }

    res.json(result);
  } catch (error) {
    logger.error('Error executing flow:', error);
    res.status(500).json({ error: 'Error executing automation flow' });
  }
});

export default router;