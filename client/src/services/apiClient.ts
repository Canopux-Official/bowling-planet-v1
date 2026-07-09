const API_BASE = import.meta.env.VITE_SERVER_LINK || 'http://localhost:5000'
const API_SECRET = import.meta.env.VITE_API_SECRET || ''

const defaultHeaders = {
  'Content-Type': 'application/json',
  'x-api-key': API_SECRET
}

// Keep track of refresh promise so we don't refresh multiple times concurrently
let refreshPromise: Promise<boolean> | null = null;

async function refreshToken() {
  try {
    const res = await fetch(`${API_BASE}/auth/refresh-token`, {
      method: 'POST',
      headers: defaultHeaders,
      credentials: 'include',
    });
    return res.ok;
  } catch (err) {
    return false;
  }
}

export async function apiClient(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE}${endpoint}`;
  
  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    credentials: 'include' as RequestCredentials,
  };

  let response = await fetch(url, config);

  // If unauthorized, attempt silent refresh
  if (response.status === 401) {
    const unauthenticatedEndpoints = [
      '/auth/login', 
      '/auth/signup', 
      '/auth/verify-otp', 
      '/auth/forgot-password', 
      '/auth/reset-password', 
      '/auth/refresh-token'
    ];
    
    const isAuthFlow = unauthenticatedEndpoints.some(e => endpoint.startsWith(e));
    const skipRefresh = isAuthFlow || (options.headers as Record<string, string>)?.['x-skip-auth-refresh'] === 'true';

    if (!skipRefresh) {
      // If not already refreshing, start refresh
      if (!refreshPromise) {
        refreshPromise = refreshToken().finally(() => {
          refreshPromise = null;
        });
      }

      const success = await refreshPromise;

      // If refresh successful, retry original request
      if (success) {
        response = await fetch(url, config);
      } else {
        // If refresh failed, session is dead. Force global logout.
        window.dispatchEvent(new Event('auth:logout'));
      }
    }
  }

  // Helper to parse json automatically if ok
  if (response.ok) {
    const json = await response.json().catch(() => ({}));
    return json;
  }

  // If not ok, extract error message
  const errorJson = await response.json().catch(() => ({}));
  throw new Error(errorJson.message || `Request failed with status ${response.status}`);
}
