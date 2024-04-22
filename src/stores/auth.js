import {ref} from 'vue'
import {defineStore} from 'pinia'
import api from "@/config/api.js";
import Cookies from 'js-cookie'

const cookiesStorage = {
    setItem(key, state) {
        return Cookies.set(key, state, { expires: 1 });
    },
    getItem(key) {
        return Cookies.get(key)
    },
};
export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const isAuthenticated = ref(false)

    async function login(formData) {
        try {
            await api.get('/sanctum/csrf-cookie')
            const {data} = await api.post('/login', formData)
            user.value = data.data
            isAuthenticated.value = true
        } catch (error) {
            return error?.response?.data?.errors
        }
    }

    async function logout() {
        try {
            await api.get('/sanctum/csrf-cookie')
            const {data} = await api.post('/logout')
            await reset()
        } catch (error) {
            return error?.response?.data?.errors
        }
    }
    const updateProfile = async (formData) => {
        try {
            const {data} = await api.post(`/api/profile/update`, {...formData, _method: 'PUT'},{
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            return data
        } catch (error) {
            return error?.response?.data?.errors
        }
    }

    const changePassword = async (formData) => {
        try {
            const {data} = await api.post(`/api/profile/change-password`, {...formData, _method: 'PUT'},{
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            return data
        } catch (error) {
            return error?.response?.data?.errors
        }
    }

    const getProfile = async () => {
        try {
            const {data} = await api.get('/api/profile')
            user.value = data.data
        } catch (error) {
            return error?.response?.data?.errors
        }
    }

    const reset = () => {
        user.value = null
        isAuthenticated.value = false
    }

    return {user, isAuthenticated, login, logout, reset, changePassword, getProfile, updateProfile}
}, {
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'authStore',
                storage: cookiesStorage,
            },
        ],
    }
})
