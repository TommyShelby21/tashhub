import { defineStore } from 'pinia';
import axios from 'axios'


export const useMainStore = defineStore('main', {
    state: () => ({
        apiBaseUrl: 'http://localhost:1000',
        user: null,
        router: null,
        selectedTeam: null
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
        setRouter(router) {
            this.router = router;
        },
        setUser(user) {
            this.user = user;
        },
        setSelectedTeam(team) {
            this.selectedTeam = team
        },
        setupInterceptors() {
            axios.interceptors.response.use(
                response => response,
                async error => {
                    const { response, config } = error;
                    config._retry = false;

                    // Avoid infinite loop: do NOT intercept refresh requests
                    if (config.url.includes('/api/token/refresh/')) {
                        console.warn("Token refresh failed, redirecting to login...");
                        if (this.router) {
                            this.router.push('/login');
                        }
                        return Promise.reject(error);
                    }

                    // Prevent retry loops
                    if (!config._retry) {
                        config._retry = true;
                        // Refresh the token
                        const refreshResponse = await axios.post(
                            this.apiBaseUrl + '/api/token/refresh/',
                            null,
                            { withCredentials: true }
                        );
                    }

                    // Already retried once — don't try again
                    return Promise.reject(error);
                }
            );
        }
    }
});