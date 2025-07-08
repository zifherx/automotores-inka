export interface DataLayerEvent {
  event: string;
  [key: string]: any;
}

declare global {
  interface Window {
    dataLayer: DataLayerEvent[];
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}

export const sendDataLayer = (eventData: DataLayerEvent): void => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];

    const eventWithTimestamp = {
      ...eventData,
      timestamp: new Date().toISOString(),
    };

    window.dataLayer.push(eventWithTimestamp);
  }
};
