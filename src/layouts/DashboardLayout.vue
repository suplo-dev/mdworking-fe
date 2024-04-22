<script setup>
import {menu} from "@/config/menu.js";
import router from "@/router/index.js";
import {useAuthStore} from "@/stores/auth.js";

const authStore = useAuthStore()
const user = authStore.user
const logout = async () => {
  await authStore.logout()
  await router.push({name: 'login'})
}

</script>

<template>
  <div class="wrapper fw-medium">
    <header class="header bg-light shadow-sm z-3">
      <div class="d-flex align-items-center bg-light p-3 shadow-sm">
        <ul class="d-flex list-unstyled ms-auto mb-0">
          <li>
            <div class="dropdown">
              <button class="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                <img width="32" height="32" class="rounded-circle" src="@/assets/img/background.jpg" alt="">
                <span class="mx-2">{{ user.name }}</span>
              </button>
              <ul class="dropdown-menu mt-2">
                <li class="dropdown-item cursor-pointer" @click="router.push({name: 'profile'})">
                  <i class="fa-regular fa-user me-2"></i>
                  <span>Hồ sơ</span>
                </li>
                <li class="border-gray border-bottom my-2"></li>
                <li class="dropdown-item cursor-pointer" @click="logout">
                  <i class="fa-regular fa-sign-out me-2"></i>
                  <span>Đăng xuất</span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </header>
    <aside class="sidebar shadow">
      <RouterLink class="d-flex justify-content-center p-3" :to="{name: 'dashboard'}">
        <img width="150" src="@/assets/img/logo.svg" alt="">
      </RouterLink>
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <template v-for="item in menu.dashboard">
            <div v-if="item.children">
              <RouterLink :to="{name:item.routeName}"
                          class="nav-link rounded collapsed position-relative"
                          data-bs-toggle="collapse"
                          aria-expanded="true">
                <i class="fa me-2" :class="item.iconClass"/>
                {{ item.label }}
                <i class="fa-regular fa-chevron-down position-absolute end-0"/>
              </RouterLink>
              <div class="show mt-1">
                <ul class="btn-toggle-nav list-unstyled">
                  <li v-for="child in item.children">
                    <RouterLink class="nav-link" :to="{name: child.routeName}" active-class="active">
                      <i class="fa ps-3 me-4" :class="child.iconClass"></i>
                      {{ child.label }}
                    </RouterLink>
                  </li>
                </ul>
              </div>
            </div>
            <RouterLink v-else-if="user.permissions.includes(item.permission)" class="nav-link" :to="{name: item.routeName}" active-class="active">
              <i class="fa me-2" :class="item.iconClass"></i>
              {{ item.label }}
            </RouterLink>
            <RouterLink v-else-if="item.permission === undefined" class="nav-link" :to="{name: item.routeName}" active-class="active">
              <i class="fa me-2" :class="item.iconClass"></i>
              {{ item.label }}
            </RouterLink>
          </template>
        </li>
      </ul>
    </aside>
    <main class="main">
      <slot/>
<!--      <footer class="footer text-secondary text-center p-1 mt-3">-->
<!--        @2024 MDWorking.com-->
<!--      </footer>-->
    </main>
<!--    <div class="alert alert-success position-absolute top-10 right-5 fade-in-from-top fade-out" role="alert">-->
<!--      Update success-->
<!--    </div>-->
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  grid-template-areas:
        "sidebar header"
        "sidebar main";
  grid-template-columns: 280px 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;

  .header {
    grid-area: header;
  }

  .sidebar {
    grid-area: sidebar;
    padding: 15px;
    height: 100%;

    i {
      width: 20px;
      height: 20px;
    }
  }

  .main {
    grid-area: main;
    background-color: #ececec;
    overflow-y: auto;
  }

}

</style>