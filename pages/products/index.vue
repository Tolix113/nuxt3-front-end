<template>
    <div class="container mx-auto">
      <h1 class="text-[24px]">Products</h1>
      <ul>
        <li v-for="product in products">
          {{ product._id }}
        </li>
      </ul>
      <button
      @click="addProduct"
      class="text-white bg-green-600 hover:bg-green-700 font-medium rounded-full text-sm px-5 py-2.5 text-center focus:ring-4 focus:ring-green-300"
      >
        Добавить
      </button>
    </div>
</template>

<script setup>
  const products = ref([]);
  
  async function getProducts() {
    const fetchedProducts = await $fetch('/api/products');
    console.log(fetchedProducts);
    products.value = fetchedProducts || [];
  }

  async function addProduct() {
    const createdProduct = await $fetch("/api/products/create", {
      method: 'POST',
      body: {
      title: 'test_title',
      description: 'test_description',
      price: 777,
      thumbnail: 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg',
    }
  })
    console.log(createdProduct.message);
    products.value = createdProduct.data;
  }
  
  onMounted(getProducts);
</script>