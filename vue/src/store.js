import { defineStore } from 'pinia';
import axios from 'axios'


export const useMainStore = defineStore('main', {
    state: () => ({
        apiBaseUrl: 'http://localhost:5001',
        user: null,
        router: null,
        selectedTeam: null
    }),
    persist: {
        paths: ['user', 'selectedTeam'],
        storage: sessionStorage
    },
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
            console.log("Setting up interceptors...");

            axios.interceptors.response.use(
                response => response,
                async error => {
                    const { response, config } = error;

                    // Pokud chyba není 401 (Unauthorized), předej dál
                    if (!response || response.status !== 401) {
                        return Promise.reject(error);
                    }

                    // Zabráníme zacyklení při neúspěšném refreshi
                    if (config.url.includes('/api/token/refresh/') && config._retry) {
                        console.warn("Token refresh failed, redirecting to login...");
                        if (this.router) {
                            this.router.push('/login');
                        }
                        return Promise.reject(error);
                    }

                    // Pokud jsme ještě nerefreshovali, zkusíme to
                    if (!config._retry) {
                        config._retry = true;

                        try {
                            console.warn("Token expired, attempting refresh...");

                            // Ověříme platnost refresh tokenu a získáme nový access token
                            const refreshResponse = await axios.post(
                                this.apiBaseUrl + '/api/token/refresh/',
                                null,
                                { withCredentials: true }
                            );
                            if (refreshResponse.status === 200) {
                                // ⬇️ Načti profil a nastav do store
                                const profileResponse = await axios.get(
                                    this.apiBaseUrl + '/profile/',
                                    { withCredentials: true }
                                );
                                console.log("updated user, team")

                                this.setUser(profileResponse.data.user);
                                this.setSelectedTeam(profileResponse.data.user_profile.selected_team);

                                // ⬅️ Opětovně odešli původní request
                                return axios(config);
                            }

                        } catch (refreshError) {
                            console.error("Refresh failed:", refreshError);
                            if (this.router) {
                                this.router.push('/login');
                            }
                            return Promise.reject(refreshError);
                        }
                    }

                    // Pokud refresh už proběhl a selhal, předej chybu dál
                    return Promise.reject(error);
                }
            );
        }

    }
});