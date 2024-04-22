<script setup>
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import {useUserStore} from "@/stores/user.js";
import {ref} from "vue";
import router from "@/router/index.js";
import helper from "@/plugins/helper.js";
import {useRoute} from "vue-router";
import {useDatetime} from "@/composables/useDatetime.js";
import {useRoleStore} from "@/stores/role.js";
import {usePermission} from "@/composables/usePermission.js";

const {formatDateTime} = useDatetime()
const {permission} = usePermission()

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

const listRole = ref([])

const route = useRoute()
const userStore = useUserStore()
const roleStore = useRoleStore()
const getData = async () => {
  await userStore.getUser(route.params.id)
  formData.value = userStore.user
}
const updateUser = async () => {
  const response = await userStore.updateUser(route.params.id, formData.value)
  if (response.success) {
    await router.push({name: 'user'})
  }
  error.value = response
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
            <span>Chỉnh sửa tài khoản</span>
            <RouterLink class="btn btn-secondary" :to="{name: 'user'}">Quay lại</RouterLink>
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
              <select class="form-select" @change="handleRole" v-model="formData.role" :class="error.role ? 'is-invalid' : ''">
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
          <div class="row mt-3 mb-2">
            <label for="">Quyền</label>
          </div>
          <div class="row" v-for="(itemGroup,keyGroup) in permission">
            <div class="col-2">
              <label class="form-label">{{ itemGroup.label }}</label>
            </div>
            <div class="col" v-if="itemGroup.hasChild">
              <div class="row" v-for="(itemGroupChild,keyGroupChild) in itemGroup.value">
                <div class="col-3">
                  <label class="form-label">{{ itemGroupChild.label }}</label>
                </div>
                <div class="col">
                  <div class="form-check form-check-inline me-5" v-for="(item,key) in itemGroupChild.value">
                    <input v-model="formData.permissions" class="form-check-input" type="checkbox" :id="`${keyGroup}${keyGroupChild}${key}`" :value="item.value">
                    <label class="form-check-label" :for="`${keyGroup}${keyGroupChild}${key}`">{{ item.label }}</label>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="col">
              <div class="row">
                <div class="col-3">
                  <label class="form-label">{{ itemGroup.label }}</label>
                </div>
                <div class="col">
                  <div class="form-check form-check-inline me-5" v-for="(item,key) in itemGroup.value">
                    <input v-model="formData.permissions" class="form-check-input" type="checkbox" :id="`${keyGroup}${key}`" :value="item.value">
                    <label class="form-check-label" :for="`${keyGroup}${key}`">{{ item.label }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex">
            <button class="btn btn-primary me-2 ms-auto" @click="updateUser">Cập nhật</button>
            <button class="btn btn-secondary" @click="router.push({name: 'user'})">Hủy</button>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<style lang="scss" scoped>

</style>
