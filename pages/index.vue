<template>
  <PageHeader />
  <vue-awesome-paginate
    :total-items="50"
    v-model="currentPage"
  >
  </vue-awesome-paginate>
</template>

<script setup>
const currentPage = ref(1);
</script>
