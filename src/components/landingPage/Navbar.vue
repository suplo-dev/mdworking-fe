<script setup>
import {menu} from "@/config/menu.js";
</script>

<template>
  <div class="d-lg-flex flex-lg-column-reverse">
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container position-lg-relative">
        <RouterLink class="navbar-brand" :to="{name: 'home'}">
          <img src="../../assets/img/logo.svg" alt="">
        </RouterLink>
        <div class="position-lg-absolute end-lg-0 me-lg-4">
          <RouterLink :to="{name: 'login'}" class="btn btn-primary"><i class="fa fa-sign-in me-2"></i>
            <span class="d-none d-lg-inline">Đăng nhập</span></RouterLink>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item dropdown p-3">
              <a class="dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                 aria-expanded="false">
                Sản phẩm
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#"></a></li>
                <li><a class="dropdown-item" href="#"></a></li>
              </ul>
            </li>
            <li class="nav-item dropdown p-3">
              <a class="dropdown-toggle" href="#" id="navbarDropdown" role="button"
                 data-bs-toggle="dropdown" aria-expanded="false">
                Công cụ
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#"></a></li>
                <li><a class="dropdown-item" href="#"></a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container">
        <div class="collapse flex-row-reverse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item" v-for="item in menu.landingPage">
              <RouterLink :to="{name: item.routeName}">{{ item.label }}</RouterLink>
            </li>
            <li>
              <a href="tel:086 575 6088" alt="Hotline" rel="nofollow"><i class="fa fa-phone me-2"></i> 086 575 6088</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>


</template>

<style lang="scss" scoped>
nav {
  .navbar-brand {
    width: 200px;
  }

  .navbar-collapse {
    ul {
      li {
        padding: 1rem;

        a {
          text-decoration: none;
          text-transform: uppercase;
          font-weight: 500;
          color: black;
        }
      }
    }
  }
}

</style>