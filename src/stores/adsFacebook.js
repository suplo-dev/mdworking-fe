import {ref} from 'vue'
import {defineStore} from 'pinia'
import api from "@/config/api.js";

export const useAdsFacebookStore = defineStore('adsFacebook', () => {
    const listAdsFacebook = ref({})
    const adsFacebook = ref({})

    const getListAdsFacebook = async (query) => {
        try {
            const {data} = await api.get('/api/advertisement/facebook/search?' + query)
            listAdsFacebook.value = data.data
        } catch (error) {
            return error?.response?.data?.errors
        }
    }

    const addAdsFacebook = async (formData) => {
        try {
            const {data} = await api.post('/api/advertisement/facebook/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            return data
        } catch (error) {
            return error?.response?.data?.errors
        }
    }

    const updateAdsFacebook = async (id, formData) => {
        try {
            const {data} = await api.post(`/api/advertisement/facebook/${id}`, {...formData, _method: 'PUT'},{
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            return data
        } catch (error) {
            return error?.response?.data?.errors
        }
    }

    const getAdsFacebook = async (id) => {
        try {
            const {data} = await api.get(`/api/advertisement/facebook/${id}`)
            adsFacebook.value = data.data
        } catch (error) {
            return error?.response?.data?.errors
        }
    }

    return {listAdsFacebook, adsFacebook, getListAdsFacebook, addAdsFacebook, updateAdsFacebook, getAdsFacebook}
}, {
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'adsFacebookStore',
                storage: localStorage,
            },
        ],
    }
})
