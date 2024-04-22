<script setup>
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import {tableHeader} from "@/config/tableHeader.js";
import {useTable} from "@/composables/useTable.js";
import {ref, watch} from "vue";
import helper from "@/plugins/helper.js";
import {useDatetime} from "@/composables/useDatetime.js";
import router from "@/router/index.js";
import {useRoleStore} from "@/stores/role.js";
import {useAuthStore} from "@/stores/auth.js";
import {usePermission} from "@/composables/usePermission.js";
import {useCampaignGoogle} from "@/stores/campaignGoogle.js";
import DatePicker from '@vuepic/vue-datepicker';
import {useNumber} from "@/composables/useNumber.js";
import {constant} from "@/config/adsGoogle.js";

const header = tableHeader.campaign.google
const tableComposable = useTable()
const {formatDateTime, formatDate, startOfMonth, yesterday} = useDatetime()
const {permission} = usePermission()
const authStore = useAuthStore()
const adsGoogleStore = useCampaignGoogle()
const range = ref([startOfMonth, yesterday])
const {formatNumber} = useNumber()

const filter = ref({
  column: null,
  keyword: null,
  sort_order: null,
  started_at: formatDate(startOfMonth, 'YYYY-MM-DD'),
  ended_at: formatDate(yesterday, 'YYYY-MM-DD'),
  page: 1,
  per_page: 20,
})
const campaignGoogles = ref({})
const listRole = ref([])
const getListAdsGoogle = async () => {
  await adsGoogleStore.searchCampaignGoogle(helper.toQueryString(filter.value))
  campaignGoogles.value = adsGoogleStore.campaignGoogles
  tableComposable.pagination.value.total = adsGoogleStore.campaignGoogles.total
  tableComposable.pagination.value.current_page = adsGoogleStore.campaignGoogles.current_page
}

const changeSort = async (item) => {
  await tableComposable.changeSort(item)
  filter.value = {...filter.value, ...tableComposable.filter.value}
  await getListAdsGoogle()
}

const changePage = async (item, sub = 0) => {
  await tableComposable.changePage(item, sub)
  filter.value.page = tableComposable.filter.value.page
  await getListAdsGoogle()
}
const reset = async () => {
  filter.value = {
    column: null,
    keyword: null,
    role: null,
    sort_order: null,
    page: 1,
    per_page: 20,
  }
  await getListAdsGoogle()
}
watch(() => filter.value.per_page, async (value) => {
      filter.value.page = 1
      await getListAdsGoogle()
    }, {deep: true}
);

function updateDateRange(data) {
  filter.value.started_at = formatDate(data[0], 'YYYY-MM-DD')
  filter.value.ended_at = formatDate(data[1], 'YYYY-MM-DD')
  range.value = [data[0], data[1]]
}

//Call API
getListAdsGoogle()
</script>


<template>
  <DashboardLayout>
    <div class="container">
      <div class="card mt-3">
        <div class="card-body">
          <h5 class="card-title text-primary fw-bold">Danh sách chiến dịch Google</h5>
          <div class="row">
            <div class="col-7">
              <label class="form-label">Nhập để tìm kiếm</label>
              <input v-model="filter.keyword" type="text" class="form-control" placeholder="VD: Tên chiến dịch">
            </div>
            <div class="col">
              <label class="form-label w-100">Thời gian</label>
              <!--              <DateRangePicker :date-range="filter.range" :auto-apply="true" @update:model-value="updateDateRange"/>-->
              <DatePicker :model-value="range" locale="vi" multi-calendars range format="dd/MM/yyyy"
                          :enable-time-picker="false" :max-date="new Date(new Date().setDate(new Date().getDate()-1))"
                          :day-names="['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']" select-text="Chọn" cancel-text="Hủy"
                          @update:model-value="updateDateRange" no-today
              />
            </div>
            <div class="col-auto align-self-end">
              <button class="btn btn-primary mx-2" @click="getListAdsGoogle">Tìm kiếm</button>
              <button class="btn btn-secondary" @click="reset">Đặt lại</button>
            </div>
          </div>
          <div class="my-3">
            <RouterLink class="btn btn-primary" :to="{name: 'advertisement.google.add'}"
                        v-if="authStore?.user?.permissions?.includes(permission.user.value.add.value)">Thêm chiến dịch
            </RouterLink>
          </div>
          <div class="row my-3">
            <div class="col-auto d-flex align-items-center">
              <span>Hiển thị</span>
              <select class="form-select w-auto mx-2" v-model="filter.per_page">
                <option v-for="item in tableComposable.selectPerPage()" :value="item">{{ item }}</option>
              </select>
              <span>mỗi trang</span>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table table-striped table-bordered align-middle">
              <thead>
              <tr>
                <th v-for="(item, index) in header" class="align-middle" :key="`accountHeader${index}`">
                  <div class="d-flex align-items-center" v-if="item.sortable" @click="changeSort(item)">
                    <div class="cursor-pointer user-select-none me-2">
                      {{ item.label }}
                    </div>
                    <i :class="tableComposable.getSortClass(item)"/>
                  </div>
                  <template v-else>
                    <span>{{ item.label }}</span>
                  </template>
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in campaignGoogles.data">
                <td class="text-center">{{ filter.per_page * (filter.page - 1) + index + 1 }}</td>
                <!--                <td class="text-center">-->
                <!--                  <div class="form-switch">-->
                <!--                    <input class="form-check-input" type="checkbox" role="switch" :checked="item.status" disabled>-->
                <!--                  </div>-->
                <!--                </td>-->
                <td>{{ item.name }}</td>
                <td>Search Only</td>
                <td>
                  <span v-if="item.ads_google.length">
                    {{ item.ads_google[0].click }}
                  </span>
                </td>
                <td>
                  <span v-if="item.ads_google.length">
                    {{ item.ads_google[0].ctr }}
                  </span>
                </td>
                <td>
                  <span v-if="item.ads_google.length && item.ads_google[0].avg_cpc">
                     {{ formatNumber(item.ads_google[0].avg_cpc) }}
                  </span>
                </td>
                <td>
                  <span v-if="item.ads_google.length && item.ads_google[0].amount_spent">
                    {{ formatNumber(item.ads_google[0].amount_spent) }}
                  </span>
                </td>
                <td class="text-center">
                  <button class="btn btn-primary" @click="router.push({name: 'advertisement.google.edit', params: {id: item.id}})">
                    <i class="fa-light fa-pen-to-square"/>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <nav class="d-flex">
            <ul class="pagination ms-auto">
              <li class="page-item" v-for="(item, index) in campaignGoogles.links"
                  :class="tableComposable.getPageItemClass(item)">
                <button v-if="index === 0" class="page-link" @click="changePage(item, -1)">
                  <span aria-hidden="true">&laquo;</span>
                </button>
                <button v-else-if="index === campaignGoogles.links.length-1" class="page-link"
                        @click="changePage(item, 1)">
                  <span aria-hidden="true">&raquo;</span>
                </button>
                <button v-else class="page-link" @click="changePage(item)">
                  <span aria-hidden="true">{{ item.label }}</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<style lang="scss" scoped>
.vue-daterange-picker {
  width: 100%;
}
</style>
