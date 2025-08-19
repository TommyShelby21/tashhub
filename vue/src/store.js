import { defineStore } from 'pinia';
import axios from 'axios'


export const useMainStore = defineStore('main', {
    state: () => ({
        apiBaseUrl: 'http://localhost:5001',
        user: null,
        router: null,
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
        }
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
            let attempt = 0;

            axios.interceptors.response.use(
                (response) => {
                    return response;
                },
                async (error) => {
                    if (error.response.status === 401 || error.response.status === 403) {
                        if (attempt < 1) {
                            attempt++;
                            await axios.post(this.apiBaseUrl + '/api/token/refresh/', null, {
                                withCredentials: true
                            })
                                .then((response) => {
                                    // GET USER
                                    const profileResponse = axios.get(this.apiBaseUrl + '/api/user/', null, {
                                        withCredentials: true
                                    })
                                        .then((response) => {
                                            this.setUser(profileResponse.data.user);
                                            this.setSelectedTeam(profileResponse.data.user_profile.selected_team);
                                        });

                                    return axios(error.config)
                                })
                                .catch((error) => {
                                    this.router.push({ name: 'Login' });
                                });
                        }
                        this.router.push({ name: 'Login' });
                    }
                    return Promise.reject(error);
                }
            )
        }

    }
});