import { defineStore } from 'pinia';
import axios from 'axios'


export const useMainStore = defineStore('main', {
    state: () => ({
        apiBaseUrl: 'http://127.0.0.1:1001'
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

    },
});