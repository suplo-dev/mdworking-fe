import {ref} from 'vue'
import {defineStore} from 'pinia'
import api from "@/config/api.js";

export const useUserStore = defineStore('user', () => {
    const listUser = ref({})
    const user = ref({})

    const getListUser = async (query) => {
        try {
            const {data} = await api.get('/api/user/search?' + query)
            listUser.value = data.data
        } catch (error) {
            return error?.response?.data?.errors
        }
    }

    const addUser = async (formData) => {
        try {
            const {data} = await api.post('/api/user/add', formData)
            return data
        } catch (error) {
            return error?.response?.data?.errors
        }
    }

    const updateUser = async (id, formData) => {
        try {
            const {data} = await api.post(`/api/user/${id}`, {...formData, _method: 'PUT'},{
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            return data
        } catch (error) {
            return error?.response?.data?.errors
        }
    }

    const getUser = async (id) => {
        try {
            const {data} = await api.get(`/api/user/${id}`)
            user.value = data.data
        } catch (error) {
            return error?.response?.data?.errors
        }
    }

    return {listUser, user, getListUser, addUser, updateUser, getUser}
}, {
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'userStore',
                storage: localStorage,
            },
        ],
    }
})
