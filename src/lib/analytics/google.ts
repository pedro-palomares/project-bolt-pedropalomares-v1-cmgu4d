import ReactGA from 'react-ga4';

export const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 tracking ID

export const initializeGA = () => {
  ReactGA.initialize(GA_TRACKING_ID);
};

export const trackGAPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

export const trackGAEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({
    category,
    action,
    label
  });
};