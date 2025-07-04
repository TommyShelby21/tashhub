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
                    const { config, response } = error;

                    if (
                        response?.status === 401 &&
                        !config._retry &&
                        !config.url.includes('/api/token/refresh/') &&
                        !config.url.includes('/api/token/login/')
                    ) {
                        config._retry = true;

                        try {
                            await axios.post(this.apiBaseUrl + '/api/token/refresh/', null, {
                                withCredentials: true,
                            });

                            config.withCredentials = true;
                            return axios(config);
                        } catch {
                            try {
                                await axios.post(this.apiBaseUrl + '/api/logout/', null, {
                                    withCredentials: true,
                                });
                            } catch (logoutError) {
                                // ignoruj chybu při logoutu
                            }
                            // Redirect to login if refresh fails
                            window.location.href = '/login/';
                            return Promise.reject(error);
                        }
                    }

                    return Promise.reject(error);
                }
            );
        }
    }
});