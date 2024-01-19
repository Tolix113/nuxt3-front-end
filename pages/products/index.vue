<template>
  <main class="max-w-screen-lg mx-auto flex flex-col">
    <!-- product card -->
    <div
      v-for="product in products"
      class="flex flex-col md:flex-row overflow-hidden rounded-lg border shadow-xl mt-4 w-100 mx-2"
    >
      <!-- thumbnail -->
      <div class="h-32 w-auto md:w1/2">
        <a :href="`/products/edit/${product._id}`">
          <img
            :src="product.thumbnail"
            class="inset-0 h-full w-full object-cover object-center"
          />
        </a>
      </div>
      <!-- content -->
      <div class="w-full py-4 px-6 flex flex-col justify-between">
        <h3>{{ product.title }}</h3>
        <p>Бренд товара: {{ product.brand }}</p>
        <p class="text-justify">Рейтинг товара: {{ product.rating }}</p>
      </div>
      <div class="w-32 py-4 px-6 flex flex-row items-center">
        <h2 class="text-lg">{{ product.price }} ₽</h2>
      </div>
    </div>
  </main>
  <!-- <button
    @click="addProduct"
    class="btn btn-green"
  >
    Добавить
  </button> -->
</template>

<script setup>
const products = ref([]);

async function getProducts() {
  const fetchedProducts = await $fetch("/api/products");
  console.log(fetchedProducts);
  products.value = fetchedProducts || [];
}

async function addProduct() {
  const createdProduct = await $fetch("/api/products/create", {
    method: "POST",
    body: {
      title: "test_title",
      description: "test_description",
      price: 777,
      thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
    },
  });
  console.log(createdProduct.message);
  products.value = createdProduct.data;
}

onMounted(getProducts);
</script>
