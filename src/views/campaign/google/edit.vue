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
import {useRoute} from "vue-router";
import { Line } from 'vue-chartjs'

const header = tableHeader.advertisement.google
const tableComposable = useTable()
const {formatDateTime, formatDate, startOfMonth, yesterday} = useDatetime()
const {permission} = usePermission()
const authStore = useAuthStore()
const campaignGoogleStore = useCampaignGoogle()
const range = ref([startOfMonth, yesterday])
const {formatNumber, formatDong, formatPercent, formatN} = useNumber()
const route = useRoute()
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)
const filter = ref({
  column: null,
  keyword: null,
  sort_order: null,
  started_at: formatDate(startOfMonth, 'YYYY-MM-DD'),
  ended_at: formatDate(yesterday, 'YYYY-MM-DD'),
  page: 1,
  per_page: 20,
})
const adsGoogles = ref({})
const campaignGoogle = ref({})
const listRole = ref([])
const dataChart = ref({
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Click',
      backgroundColor: '#f87979',
      data: []
    }
  ]}
)

const optionChart = ref({
  responsive: true,
  maintainAspectRatio: false
})
const getAdsGoogles = async () => {
  await campaignGoogleStore.getAdsGoogles(route.params.id, helper.toQueryString(filter.value))
  adsGoogles.value = campaignGoogleStore.adsGoogles
  campaignGoogle.value = campaignGoogleStore.campaignGoogle
  tableComposable.pagination.value.total = campaignGoogleStore.adsGoogles.total
  tableComposable.pagination.value.current_page = campaignGoogleStore.adsGoogles.current_page
  dataChart.value = {
    ...dataChart.value,
    labels: adsGoogles.value.data?.map(item => item.started_at) ?? [],
    datasets: [
      ...dataChart.value.datasets, {
        label: 'Click',
        backgroundColor: '#f87979',
        data: adsGoogles.value.data?.map(item => item.click) ?? []
      }
    ]
  }
  // dataChart.value.datasets[0].data = adsGoogles.value.data?.map(item => item.click) ?? []
  // console.log(adsGoogles.value.data?.map(item => parseInt(item.click)))
}

const changeSort = async (item) => {
  await tableComposable.changeSort(item)
  filter.value = {...filter.value, ...tableComposable.filter.value}
  await getAdsGoogles()
}

const changePage = async (item, sub = 0) => {
  await tableComposable.changePage(item, sub)
  filter.value.page = tableComposable.filter.value.page
  await getAdsGoogles()
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
}
watch(() => filter.value.per_page, async (value) => {
      filter.value.page = 1
      await getAdsGoogles()
    }, {deep: true}
);

function updateDateRange(data) {
  filter.value.started_at = formatDate(data[0], 'YYYY-MM-DD')
  filter.value.ended_at = formatDate(data[1], 'YYYY-MM-DD')
  range.value = [data[0], data[1]]
}


//Call API
getAdsGoogles()
</script>


<template>
  <DashboardLayout>
    <div class="container">
      <div class="card mt-3">
        <div class="card-body">
          <h5 class="card-title  d-flex justify-content-between">
            <span class="text-primary fw-bold">Chi tiết chiến dịch Google</span>
            <RouterLink class="btn btn-secondary" :to="{name: 'advertisement.google'}">Quay lại</RouterLink>
          </h5>
          <div class="row">
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
              <button class="btn btn-primary mx-2" @click="getAdsGoogles">Tìm kiếm</button>
              <button class="btn btn-secondary" @click="reset">Đặt lại</button>
            </div>
          </div>
          <div class="my-3">
            <RouterLink class="btn btn-primary" :to="{name: 'advertisement.google.add'}"
                        v-if="authStore?.user?.permissions?.includes(permission.user.value.add.value)">Thêm nhóm quảng
              cáo
            </RouterLink>
          </div>
          <div class="row my-3 gap-4 d-flex justify-content-center align-items-center">
            <div class="col-6">
              <div class="row fs-5 text-primary fw-bold">Tỉ Lệ Nhấp Chuột & Tương Tác</div>
              <div class="row gap-4">
                <div class="col bg-cyan p-3">
                  <div class="fs-6 text-secondary">Số nhấp chuột</div>
                  <div class="fs-4">
                    <span v-if="campaignGoogle.ads_google?.length">
                      {{formatN(campaignGoogle.ads_google[0].click)}}
                    </span>
                  </div>
                </div>
                <div class="col bg-cyan p-3">
                  <div class="fs-6 text-secondary">CTR</div>
                  <div class="fs-4">
                     <span v-if="campaignGoogle.ads_google?.length">
                      {{formatPercent(campaignGoogle.ads_google[0].ctr)}}
                    </span>
                  </div>
                </div>
                <div class="col bg-cyan p-3">
                  <div class="fs-6 text-secondary">Hiển thị</div>
                  <div class="fs-4">1,1 N</div>
                </div>
              </div>
              <div class="row">
                <Line :data="dataChart" :options="optionChart"/>
              </div>
            </div>
            <div class="col-5">
              <div class="row fs-5 text-primary fw-bold">Chi Phí</div>
              <div class="row gap-4">
                <div class="col bg-cyan p-3">
                  <div class="fs-6 text-secondary">Chi phí</div>
                  <div class="fs-4">
                       <span v-if="campaignGoogle.ads_google?.length">
                      {{formatDong(campaignGoogle.ads_google[0].amount_spent)}}
                    </span>
                  </div>
                </div>
                <div class="col bg-cyan p-3">
                  <div class="fs-6 text-secondary">CPC Tr.bình</div>
                  <div class="fs-4">
                      <span v-if="campaignGoogle.ads_google?.length">
                      {{formatDong(campaignGoogle.ads_google[0].avg_cpc)}}
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
              <tr v-for="(item,index) in adsGoogles.data">
                <td class="text-center">{{ filter.per_page * (filter.page - 1) + index + 1 }}</td>
                <td>{{ item.name }}</td>
                <td class="text-center">
                  <span>
                    {{ item.click }}
                  </span>
                </td>
                <td class="text-end">
                  <span>
                    {{ formatPercent(item.ctr) }}
                  </span>
                </td>
                <td class="text-end">
                  <span>
                     {{ formatDong(item.avg_cpc) }}
                  </span>
                </td>
                <td class="text-end">
                  <span v-if="item.amount_spent">
                    {{ formatDong(item.amount_spent) }}
                  </span>
                </td>
              </tr>
              <tr class="fw-bold">
                <td colspan="2" class="text-center">Tổng cộng</td>
                <td class="text-center">
                  <span v-if="campaignGoogle.ads_google?.length">
                    {{ campaignGoogle.ads_google[0].click }}
                  </span>
                </td>
                <td class="text-end">
                  <span v-if="campaignGoogle.ads_google?.length">
                    {{ formatPercent(campaignGoogle.ads_google[0].ctr) }}
                  </span>
                </td>
                <td class="text-end">
                  <span v-if="campaignGoogle.ads_google?.length && campaignGoogle.ads_google[0].avg_cpc">
                     {{ formatDong(campaignGoogle.ads_google[0].avg_cpc) }}
                  </span>
                </td>
                <td class="text-end">
                  <span v-if="campaignGoogle.ads_google?.length && campaignGoogle.ads_google[0].amount_spent">
                    {{ formatDong(campaignGoogle.ads_google[0].amount_spent) }}
                  </span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <nav class="d-flex">
            <ul class="pagination ms-auto">
              <li class="page-item" v-for="(item, index) in adsGoogles.links"
                  :class="tableComposable.getPageItemClass(item)">
                <button v-if="index === 0" class="page-link" @click="changePage(item, -1)">
                  <span aria-hidden="true">&laquo;</span>
                </button>
                <button v-else-if="index === adsGoogles.links.length-1" class="page-link"
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

.bg-cyan {
  background-color: #C6DFF2;
}
</style>
