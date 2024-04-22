<script setup>
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import {ref} from "vue";
import router from "@/router/index.js";
import {useAdsFacebookStore} from "@/stores/adsFacebook.js";

const formData = ref({
  file:null
})

const error = ref({
  file:null
})

const adsFacebookStore = useAdsFacebookStore()

const addAdsFacebook = async () => {
  const response = await adsFacebookStore.addAdsFacebook(formData.value)
  if (response.success) {
    await router.push({name: 'advertisement.facebook'})
  }
  error.value = response
}

const onFileChange = ($event) => {
  formData.value.file = $event.target.files[0]
  console.log(formData.value.file)
}

</script>


<template>
  <DashboardLayout>
    <div class="container">
      <div class="card mt-3">
        <div class="card-body">
          <h5 class="card-title d-flex justify-content-between">
            <span class="text-primary fw-bold">Thêm chiến dịch Facebook</span>
            <RouterLink class="btn btn-secondary" :to="{name: 'advertisement.facebook'}">Quay lại</RouterLink>
          </h5>
          <div class="row">
            <div class="col-4">
              <input
                  type="file"
                  @change="onFileChange"
                  class="form-control"
                  accept=".xls,.xlsx,.csv"
                  />
            </div>
          </div>
          <div class="d-flex my-3">
            <button class="btn btn-primary me-2 ms-auto" @click="addAdsFacebook">Thêm</button>
            <button class="btn btn-secondary" @click="router.push({name: 'advertisement.facebook'})">Hủy</button>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<style lang="scss" scoped>

</style>
