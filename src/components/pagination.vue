<script setup>

const props = defineProps({
  links: {
    type: Object,
  },
})
const getPageItemClass = (item) => {
  if (item.active){
    return 'active'
  }
  return item.url === null && item.label !== '...' ? 'disabled' : ''
}
</script>

<template>
  <nav class="d-flex">
    <ul class="pagination ms-auto">
      <li class="page-item" v-for="item in listAccount.links" :class="tableComposable.getPageItemClass(item)">
        <button class="page-link">
          <span aria-hidden="true" v-html="item.label"></span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">

</style>