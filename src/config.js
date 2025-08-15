export const IS_DEV = import.meta.env.DEV;
export const IS_PROD = import.meta.env.PROD;

export const API_BASE =
  (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.trim()) ||
  'http://localhost:5001';
