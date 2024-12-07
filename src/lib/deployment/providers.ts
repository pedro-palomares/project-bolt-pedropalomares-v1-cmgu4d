export const DEPLOYMENT_CONFIG = {
  provider: 'firebase',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  region: 'us-central1'
} as const;

export const getDeploymentUrl = () => {
  const projectId = DEPLOYMENT_CONFIG.projectId;
  return `https://${projectId}.web.app`;
};