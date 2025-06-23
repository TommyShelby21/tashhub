import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
    state: () => ({
        count: 0,
        user: null,
    }),
    actions: {
        increment() {
            this.count++;
        },
        setUser(user) {
            this.user = user;
        },
        logout() {
            this.user = null;
        },
    },
});