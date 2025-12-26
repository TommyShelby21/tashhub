import { defineStore } from 'pinia';
import axios from 'axios'
import { router } from './router';


export const useMainStore = defineStore('main', {
    state: () => ({
        apiBaseUrl: 'http://localhost:5001',
        user: null,
        selectedTeam: null
    }),
    persist: [
        {
            paths: ['user'],
            storage: sessionStorage
        },
        {
            paths: ['selectedTeam'],
            storage: localStorage
        }
    ],
    getters: {
        api: (state) => {
            return {
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
            };
        },
        isLoggedIn: (state) => {
            return state.user !== null
        }
    },
    actions: {
        setUser(user) {
            this.user = user;
        },
        setSelectedTeam(team) {
            this.selectedTeam = team
        },
        setupInterceptors() {
            axios.interceptors.response.use(
                (response) => {
                    console.log('response interceptor');
                    return response;
                },
                async (error) => {
                    console.log('error interceptor');

                    if (!error.response) {
                        console.error('Network error or backend down');
                        return Promise.reject(error);
                    }

                    if (error.response.status === 401 || error.response.status === 403) {
                        try {
                            console.log('attempting token refresh');
                            await axios.post(this.apiBaseUrl + '/api/token/refresh/', null, {
                                withCredentials: true
                            });

                            return axios(error.config);
                        }
                        catch (refreshError) {
                            console.error('Token refresh failed:', refreshError);

                            // Redirect to Login
                            // We use .replace() so the user can't click "Back" to go to the protected page
                            router.replace({ name: 'Login' });

                            // Reject the promise
                            throw refreshError;
                        }
                    }
                    return Promise.reject(error);
                }
            )
        }

    }
});