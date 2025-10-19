// src/hooks/useApi.js
import { useCallback } from 'react';

// Global API configuration
const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://larleed-api.hamidhatsaandh.workers.dev',
  timeout: 15000,
};

export const useApi = () => {
  const apiRequest = useCallback(async (endpoint, options = {}) => {
    const url = `${API_CONFIG.baseURL}${endpoint}`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

      const isFormData = options && options.body instanceof FormData;

      // Prepare headers dynamically. Do NOT set Content-Type for FormData; the browser will set it.
      const mergedHeaders = {
        ...(options.headers || {}),
      };

      // Normalize JSON body if provided as plain object/string and not FormData
      let requestBody = options.body;
      if (!isFormData && requestBody !== undefined) {
        const isStringBody = typeof requestBody === 'string';
        if (!isStringBody) {
          requestBody = JSON.stringify(requestBody);
        }
        if (!('Content-Type' in mergedHeaders)) {
          mergedHeaders['Content-Type'] = 'application/json';
        }
      }

      const response = await fetch(url, {
        signal: controller.signal,
        ...options,
        headers: mergedHeaders,
        body: requestBody,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API call failed for ${url}:`, error);
      throw error;
    }
  }, []);

  // Specific API methods
  const get = useCallback((endpoint) => apiRequest(endpoint, { method: 'GET' }), [apiRequest]);
  const post = useCallback((endpoint, data) => apiRequest(endpoint, { 
    method: 'POST', 
    body: data 
  }), [apiRequest]);
  const put = useCallback((endpoint, data) => apiRequest(endpoint, { 
    method: 'PUT', 
    body: data 
  }), [apiRequest]);
  const del = useCallback((endpoint) => apiRequest(endpoint, { method: 'DELETE' }), [apiRequest]);

  return {
    apiRequest,
    get,
    post,
    put,
    delete: del,
    baseURL: API_CONFIG.baseURL,
  };
};