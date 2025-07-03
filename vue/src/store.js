import { defineStore } from 'pinia';
import axios from 'axios'


export const useMainStore = defineStore('main', {
    state: () => ({
        apiBaseUrl: 'http://localhost:1000',
        withCredentials: true,
        user: null,
    }),
    getters: {
        api: (state) => ({
            get: (endpoint, params = {}) => {
                return axios.get(state.apiBaseUrl + endpoint, {
                    params,
                    withCredentials: true
                });
            },
            post: (endpoint, data) => {
                return axios.post(state.apiBaseUrl + endpoint, data, {
                    withCredentials: true
                });
            },
            put: (endpoint, data) => {
                return axios.put(state.apiBaseUrl + endpoint, data, {
                    withCredentials: true
                });
            },
            delete: (endpoint) => {
                return axios.delete(state.apiBaseUrl + endpoint, {
                    withCredentials: true
                });
            }
        })
    },
    actions: {
        setupInterceptors() {
            axios.interceptors.response.use(
                response => response,
                async error => {
                    const originalRequest = error.config;

                    // Check if it’s a 401 and not a retry of the refresh endpoint
                    if (
                        error.response &&
                        error.response.status === 401 &&
                        !originalRequest._retry &&
                        !originalRequest.url.includes('/api/token/refresh/')
                    ) {
                        originalRequest._retry = true;

                        try {
                            // Try to refresh token
                            await axios.post(this.apiBaseUrl + '/api/token/refresh/', null, {
                                withCredentials: true
                            });

                            // Retry the original request
                            originalRequest.withCredentials = true;
                            return axios(originalRequest);
                        } catch (refreshError) {
                            console.error('Obnovení tokenu selhalo', refreshError);

                            // Redirect to login

                            return Promise.reject(refreshError);
                        }
                    }

                    return Promise.reject(error);
                }
            );
        }


    }
});