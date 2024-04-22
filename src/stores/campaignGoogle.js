import {ref} from 'vue'
import {defineStore} from 'pinia'
import api from "@/config/api.js";

export const useCampaignGoogle = defineStore('useCampaignGoogle', () => {
    const adsGoogles = ref({})
    const adsGoogle = ref({})
    const campaignGoogles = ref({})
    const campaignGoogle = ref({})

    const getAdsGoogles = async (id, query) => {
        try {
            const {data} = await api.get(`/api/campaign/google/${id}?` + query)
            campaignGoogle.value = data.data.campaign
            adsGoogles.value = data.data.ads_googles
        } catch (error) {
            return error?.response?.data?.errors
        }
    }

    const addAdsGoogle = async (formData) => {
        try {
            const {data} = await api.post('/api/campaign/google/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            return data
        } catch (error) {
            return error?.response?.data?.errors
        }
    }

    const updateAdsGoogle = async (id, formData) => {
        try {
            const {data} = await api.post(`/api/campaign/google/${id}`, {...formData, _method: 'PUT'},{
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            return data
        } catch (error) {
            return error?.response?.data?.errors
        }
    }

    const searchCampaignGoogle = async (query) => {
        try {
            const {data} = await api.get('/api/campaign/google/search?' + query)
            campaignGoogles.value = data.data
        } catch (error) {
            return error?.response?.data?.errors
        }
    }

    return {adsGoogles, adsGoogle, campaignGoogles, campaignGoogle, addAdsGoogle, updateAdsGoogle, getAdsGoogles, searchCampaignGoogle}
}, {
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'campaignGoogle',
                storage: localStorage,
            },
        ],
    }
})
