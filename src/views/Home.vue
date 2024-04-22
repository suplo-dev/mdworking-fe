<script setup>
import Navbar from "@/components/landingPage/Navbar.vue";
</script>

<template>
  <div class="main">
    <Navbar/>
    <div class="container">

    </div>
    <div class="footer">
      <p>
        © 2024 CÔNG TY TNHH Dịch Vụ Công Nghệ Minh Đức / GPĐKKD số 3002263320. Ngày cấp: 21/2/2023. Cơ quan cấp: Phòng
        Đăng ký kinh doanh - Sở Kế Hoạch và Đầu Tư tỉnh Hà Tĩnh.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  min-height: 100vh;
  object-fit: contain;
  background: url("src/assets/img/background.jpg") no-repeat;
  background-size: cover;

  .container {
    min-height: 80vh;
  }
}

.footer {
  position: absolute;
  bottom: 0;
  background: #f2f2f2;
  color: #6d6d6d;
  width: 100vw;

  p {
    text-align: center;
    padding: 10px;
    margin: 0;
  }
}
</style>
