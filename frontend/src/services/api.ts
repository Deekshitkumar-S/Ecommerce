import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const r = await api.post('/auth/refresh');
        const token = r.data.accessToken;
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
        original.headers.Authorization = `Bearer ${token}`;
        return api(original);
      } catch {
        // noop; fall through
      }
    }
    return Promise.reject(error);
  }
);

export function setAccessToken(token?: string) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

