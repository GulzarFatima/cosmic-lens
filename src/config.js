export const IS_DEV = import.meta.env.DEV;
export const IS_PROD = import.meta.env.PROD;

export const API_BASE =
  (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.trim()) ||
  
  (typeof window !== 'undefined' && !/^localhost|127\.0\.0\.1$/.test(window.location.hostname)
    ? 'https://cosmic-lens-1.onrender.com'
    : 'http://localhost:5001');
