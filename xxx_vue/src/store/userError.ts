import { defineStore } from "pinia";

export default defineStore('error', {
    state: () => ({
        errors: {} as Record<string, any>
    }),
    getters: {
        getError(state) {
            return () => state.errors
        },
    },
    actions: {
        setErrors(errors: Record<'messages', { filed: string, message: string }[]>) {
            this.errors = errors.messages[0]
        },
        clearError() {
            this.errors = {}
        },
    }
})