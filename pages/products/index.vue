<template>
    <div class="container mx-auto">
      <h1 class="text-[24px]">Products</h1>
      <button
      @click="addProduct"
      class="text-white bg-indigo-500 rounded-full py-1 px-4"
      >
        Добавить
      </button>
    </div>
</template>

<script setup>
    async function addProduct() {
        const created = await useFetch(() => "/api/products/create", {
        method: 'POST',
        body: {
        title: 'test_title',
        description: 'test_description',
        price: 777,
      }
    })

    console.log(created);
  }
</script>