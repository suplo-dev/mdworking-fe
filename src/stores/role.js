import {ref} from 'vue'
import {defineStore} from 'pinia'
import api from "@/config/api.js";

export const useRoleStore = defineStore('role', () => {
    const listRole = ref([])
    const role = ref({})

    const getListRole = async () => {
        try {
            const {data} = await api.get('/api/role/all')
            listRole.value = data.data
        } catch (error) {
            return error?.response?.data?.errors
        }
    }

    const addRole = async (formData) => {
        try {
            const {data} = await api.post('/api/role/add', formData)
            return data
        } catch (error) {
            return error?.response?.data?.errors
        }
    }

    const updateRole = async (id, formData) => {
        try {
            const {data} = await api.post(`/api/role/${id}`, {...formData, _method: 'PUT'},{
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            return data
        } catch (error) {
            return error?.response?.data?.errors
        }
    }

    const getRole = async (id) => {
        try {
            const {data} = await api.get(`/api/role/${id}`)
            role.value = data.data
        } catch (error) {
            return error?.response?.data?.errors
        }
    }

    return {listRole, role, getListRole, addRole, updateRole, getRole}
}, {
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'roleStore',
                storage: localStorage,
            },
        ],
    }
})
