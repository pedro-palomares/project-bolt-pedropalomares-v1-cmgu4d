export const APP_CONFIG = {
  name: 'Pedro Palomares',
  title: 'Digital Coach',
  domain: 'pedropalomares.com',
  assets: {
    baseUrl: import.meta.env.PROD 
      ? 'https://www.pedropalomares.com/assets'
      : '/assets',
    images: {
      logo: '/images/logo.svg'
    }
  }
} as const;