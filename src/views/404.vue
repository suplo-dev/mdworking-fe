<template>
  <div class="d-flex vh-100 align-items-center justify-content-center">
    <div class="text-center">
      <h1 class="display-1 fw-bold">404</h1>
      <p class="fs-3"> <span class="text-danger">Oops!</span> Trang bạn đang tìm kiếm không tồn tại.</p>
      <button @click="router.go(-1)" class="btn btn-primary">Quay lại</button>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
<script setup>
import router from "@/router/index.js";
</script>