<template>
  <main class="max-w-screen-lg mx-auto">
    <div class="flex flex-wrap justify-center gap-2 mt-4">
      <div
        v-for="product in products"
        class="flex flex-col rounded-lg h-full max-w-xs border-solid border-green-500 border-2"
      >
        <a :href="`/products/edit/${product._id}`">
          <img
            :src="product.thumbnail"
            class="max-w-full"
          />
        </a>
        <div class="flex flex-col justify-between flex-grow">
          <h2 class="leading-relaxed text-base break-words">
            {{ product.title }}
          </h2>
        </div>
      </div>
    </div>
  </main>
  <button
    @click="addProduct"
    class="btn btn-green"
  >
    Добавить
  </button>
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
