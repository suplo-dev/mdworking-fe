<script setup>
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import {ref} from "vue";
import router from "@/router/index.js";
import helper from "@/plugins/helper.js";
import {useRoute} from "vue-router";
import {useDatetime} from "@/composables/useDatetime.js";
import {useRoleStore} from "@/stores/role.js";
import {usePermission} from "@/composables/usePermission.js";
import {useAuthStore} from "@/stores/auth.js";
import Cookies from "js-cookie";

const {formatDateTime} = useDatetime()
const {permission} = usePermission()
const authStore = useAuthStore()

const formData = ref({
  name: null,
  email: null,
  phone: null,
  role: null,
  permissions: [],
})

const error = ref({
  name: null,
  email: null,
  phone: null,
  role: null,
  permissions: [],
})

const formDataPassword = ref({
  old_password: null,
  password: null,
  password_confirmation: null,
})

const errorPassword = ref({
  old_password: null,
  password: null,
  password_confirmation: null,
})

const listRole = ref([])

const route = useRoute()
const roleStore = useRoleStore()
const getData = async () => {
  await authStore.getProfile()
  formData.value = authStore.user
}
const updateProfile = async () => {
  const response = await authStore.updateProfile(formData.value)
  if (response.success) {
    await router.push('dashboard')
  }
  error.value = response
}
const changePassword = async () => {
  const response = await authStore.changePassword(formDataPassword.value)
  if (response.success) {
    await router.push('dashboard')
  }
  errorPassword.value = response
}

const getListRole = async () => {
  await roleStore.getListRole()
  listRole.value = roleStore.listRole
}

const handleRole = (arg) => {
}

//Call API
getListRole()
getData()
</script>


<template>
  <DashboardLayout>
    <div class="container">
      <div class="card mt-3">
        <div class="card-body">
          <h5 class="card-title d-flex justify-content-between">
            <span>Thông tin tài khoản</span>
            <RouterLink class="btn btn-secondary" :to="{name: 'dashboard'}">Quay lại</RouterLink>
          </h5>
          <div class="row">
            <div class="col">
              <label class="form-label">Họ tên <span class="text-danger">*</span></label>
              <input v-model="formData.name" type="text" class="form-control" placeholder="VD: Nguyễn Văn A"
                     :class="error.name ? 'is-invalid' : ''">
              <div class="invalid-feedback" v-if="error.name">
                {{ error.name[0] }}
              </div>
            </div>
            <div class="col">
              <label class="form-label">Email <span class="text-danger">*</span></label>
              <input v-model="formData.email" type="email" class="form-control" placeholder="VD: email@example.com"
                     :class="error.email ? 'is-invalid' : ''">
              <div class="invalid-feedback" v-if="error.email">
                {{ error.email[0] }}
              </div>
            </div>
            <div class="col">
              <label class="form-label">SĐT</label>
              <input v-model="formData.phone" type="text" class="form-control" placeholder="VD: 0912345678"
                     :class="error.phone ? 'is-invalid' : ''">
              <div class="invalid-feedback" v-if="error.phone">
                {{ error.phone[0] }}
              </div>
            </div>
          </div>
          <div class="row my-3">
            <div class="col-4">
              <label class="form-label">Vai trò <span class="text-danger">*</span></label>
              <select class="form-select" @change="handleRole" v-model="formData.role"
                      :class="error.role ? 'is-invalid' : ''" disabled>
                <option v-for="item in listRole" :value="item.name" class="text-capitalize">{{ item.name }}</option>
              </select>
              <div class="invalid-feedback" v-if="error.role">
                {{ error.role }}
              </div>
            </div>
            <div class="col-4">
              <label class="form-label">Ngày tạo</label>
              <input type="text" class="form-control" disabled :value="formatDateTime(formData.created_at)">
            </div>
          </div>
          <div class="d-flex">
            <button class="btn btn-primary me-2 ms-auto" @click="updateProfile">Cập nhật</button>
            <button class="btn btn-secondary" @click="router.push({name: 'dashboard'})">Hủy</button>
          </div>
          <h5 class="card-title d-flex justify-content-between">
            <span>Đổi mật khẩu</span>
          </h5>
          <div class="row mb-3">
            <label class="col-sm-2 col-form-label">Mật khẩu hiện tại</label>
            <div class="col-sm-10">
              <input type="password" class="form-control" v-model="formDataPassword.old_password"
                     :class="errorPassword.old_password ? 'is-invalid' : ''">
              <div class="invalid-feedback" v-if="errorPassword.old_password">
                {{ errorPassword.old_password[0] }}
              </div>
            </div>

          </div>
          <div class="row mb-3">
            <label class="col-sm-2 col-form-label">Mật khẩu mới</label>
            <div class="col-sm-10">
              <input type="password" class="form-control" v-model="formDataPassword.password"
                     :class="errorPassword.password ? 'is-invalid' : ''">
              <div class="invalid-feedback" v-if="errorPassword.password">
                {{ errorPassword.password[0] }}
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-sm-2 col-form-label">Nhập lại mật khẩu mới</label>
            <div class="col-sm-10">
              <input type="password" class="form-control" v-model="formDataPassword.password_confirmation"
                     :class="errorPassword.password_confirmation ? 'is-invalid' : ''">
              <div class="invalid-feedback" v-if="errorPassword.password_confirmation">
                {{ errorPassword.password_confirmation[0] }}
              </div>
            </div>
          </div>
          <div class="d-flex">
            <button class="btn btn-primary me-2 ms-auto" @click="changePassword">Cập nhật</button>
            <button class="btn btn-secondary" @click="router.push({name: 'dashboard'})">Hủy</button>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<style lang="scss" scoped>

</style>
