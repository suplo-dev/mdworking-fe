<script setup>
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import {tableHeader} from "@/config/tableHeader.js";
import {useTable} from "@/composables/useTable.js";
import {useUserStore} from "@/stores/user.js";
import {ref, watch} from "vue";
import helper from "@/plugins/helper.js";
import {useDatetime} from "@/composables/useDatetime.js";
import Pagination from "@/components/pagination.vue";
import router from "@/router/index.js";
import {useRoleStore} from "@/stores/role.js";
import {useAuthStore} from "@/stores/auth.js";
import {usePermission} from "@/composables/usePermission.js";

const header = tableHeader.user
const tableComposable = useTable()
const {formatDateTime} = useDatetime()
const {permission} = usePermission()
const authStore = useAuthStore()
const accountStore = useUserStore()
const roleStore = useRoleStore()
const filter = ref({
  column: null,
  keyword: null,
  role: null,
  sort_order: null,
  page: 1,
  per_page: 20,
})
const listUser = ref({})
const listRole = ref([])
const getListUser = async () => {
  await accountStore.getListUser(helper.toQueryString(filter.value))
  listUser.value = accountStore.listUser
  tableComposable.pagination.value.total = accountStore.listUser.total
  tableComposable.pagination.value.current_page = accountStore.listUser.current_page
}

const changeSort = async (item) => {
  await tableComposable.changeSort(item)
  filter.value = {...filter.value, ...tableComposable.filter.value}
  await getListUser()
}

const changePage = async (item, sub = 0) => {
  await tableComposable.changePage(item, sub)
  filter.value.page = tableComposable.filter.value.page
  await getListUser()
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
  await getListUser()
}
watch(() => filter.value.per_page, async (value) => {
      filter.value.page = 1
      await getListUser()
    }, {deep: true}
);
const getListRole = async () => {
  await roleStore.getListRole()
  listRole.value = roleStore.listRole
}
//Call API
getListRole()
getListUser()
</script>


<template>
  <DashboardLayout>
    <div class="container">
      <div class="card mt-3">
        <div class="card-body">
          <h5 class="card-title">Danh sách tài khoản</h5>
          <div class="row">
            <div class="col-7">
              <label class="form-label">Nhập để tìm kiếm</label>
              <input v-model="filter.keyword" type="text" class="form-control" placeholder="VD: Họ tên, email, sdt,...">
            </div>
            <div class="col">
              <label class="form-label">Vai trò</label>
              <select class="form-select" v-model="filter.role">
                <option :value="null">Chọn vai trò</option>
                <option v-for="item in listRole" :value="item.id" class="text-capitalize">{{ item.name }}</option>
              </select>
            </div>
            <div class="col-auto align-self-end">
              <button class="btn btn-primary mx-2" @click="getListUser">Tìm kiếm</button>
              <button class="btn btn-secondary" @click="reset">Đặt lại</button>
            </div>
          </div>
          <div class="my-3">
            <RouterLink class="btn btn-primary" :to="{name: 'user.add'}"
                        v-if="authStore?.user?.permissions?.includes(permission.user.value.add.value)">Thêm tài khoản</RouterLink>
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
                <th v-for="(item, index) in header" class="text-center" :key="`accountHeader${index}`">
                  <template v-if="item.sortable">
                    <span class="cursor-pointer user-select-none" @click="changeSort(item)">
                      {{ item.label }}
                      <i :class="tableComposable.getSortClass(item)"/>
                    </span>
                  </template>
                  <template v-else>
                    <span>{{ item.label }}</span>
                  </template>
                </th>
                <th v-if="authStore?.user?.permissions?.includes(permission.user.value.add.value)" class="text-center">Hành động</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in listUser.data">
                <td class="text-center">{{ filter.per_page * (filter.page - 1) + index + 1 }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.phone }}</td>
                <td>{{ formatDateTime(item.created_at) }}</td>
                <td class="text-center" v-if="authStore.user.permissions.includes(permission.user.value.add.value)">
                  <button class="btn btn-primary" @click="router.push({name: 'user.edit', params: {id: item.id}})">
                    <i class="fa-light fa-pen-to-square"/>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <nav class="d-flex">
            <ul class="pagination ms-auto">
              <li class="page-item" v-for="(item, index) in listUser.links"
                  :class="tableComposable.getPageItemClass(item)">
                <button v-if="index === 0" class="page-link" @click="changePage(item, -1)">
                  <span aria-hidden="true">&laquo;</span>
                </button>
                <button v-else-if="index === listUser.links.length-1" class="page-link"
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

</style>
