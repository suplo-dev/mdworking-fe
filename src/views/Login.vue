<script setup>
import {useAuthStore} from '@/stores/auth.js';
import router from "@/router/index.js";
import {ref} from "vue";

const authStore = useAuthStore();

const user = authStore.user;
const token = authStore.token;
const isAuthenticated = authStore.isAuthenticated;

const formData = ref({
  email: null,
  password: null,
  remember: false,
})

const error = ref({
  email: null,
  password: null,
})
const login = async () => {
  error.value = await authStore.login(formData.value)
  await router.push({name: 'dashboard'})
}
</script>

<template>
  <div class="container">
    <div class="container-left">
    </div>
    <div class="container-right">
      <div class="row mt-5">
        <img class="logo" src="../assets/img/logo.svg" alt="logo"/>
      </div>
      <div class="title">Chào mừng bạn đến với MDWorking</div>
      <div class="form-group my-3">
        <input type="email" class="form-control" placeholder="Email" v-model="formData.email">
      </div>
      <div class="form-group">
        <input type="password" class="form-control" placeholder="Mật khẩu" v-model="formData.password">
      </div>
      <div v-if="error?.email" class="text-danger mt-3" v-for="item in error.email">
        <div>{{ item }}</div>
      </div>
      <div class="d-flex justify-content-between my-3">
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" v-model="formData.remember" id="remember">
          <label class="form-check-label" for="remember">Nhớ tài khoản</label>
        </div>
        <div class="form-group">
          <RouterLink :to="{name: 'home'}">Quên mật khẩu?</RouterLink>
        </div>
      </div>
      <div class="d-flex justify-content-center my-5">
        <button class="btn btn-primary" @click="login">Đăng nhập</button>
      </div>
      <div class="d-flex justify-content-center">
        <span>Bạn chưa có tài khoản? <RouterLink :to="{name: 'home'}">Đăng kí ngay</RouterLink></span>
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  gap: 200px;

  .container-left {
    width: 100%;
    height: 100vh;
    background: url("@/assets/img/background.jpg") center no-repeat;
    background-size: 700px;
  }

  .container-right {
    width: 100%;
    margin: auto;

    .logo {
      width: 250px;
      margin: 0 auto;
    }

    .title {
      text-align: center;
      color: #003469;
      font-weight: bold;
      font-size: 1.25rem;
      margin: 3rem;
    }

    a {
      text-decoration: none;
    }
  }
}
</style>