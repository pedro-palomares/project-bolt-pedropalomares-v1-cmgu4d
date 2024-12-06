import { chromium, FullConfig } from '@playwright/test';
import { ROUTES } from './environment';

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    if (!baseURL) {
      throw new Error('baseURL is not defined in the config');
    }

    // Verify the app loads correctly
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    // Basic health check
    const title = await page.title();
    if (!title) {
      throw new Error('Page title is empty - app might not be running');
    }

    console.log('✓ App is running and accessible');
    console.log(`✓ Page title: ${title}`);

  } catch (error) {
    console.error('Error during global setup:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

export default globalSetup;