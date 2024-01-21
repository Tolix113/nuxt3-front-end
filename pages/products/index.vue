<template>
  <main class="max-w-screen-lg mx-auto flex flex-col">
    <!-- product card -->
    <div
      v-for="product in products"
      class="flex flex-col md:flex-row overflow-hidden rounded-lg border shadow-xl mt-4 w-100 mx-2"
    >
      <!-- thumbnail -->
      <div class="h-64 md:h-32 w-auto md:w-1/2">
        <a :href="`/products/edit/${product._id}`">
          <img
            :src="product.thumbnail"
            class="inset-0 h-full w-full object-cover object-center"
          />
        </a>
      </div>
      <!-- content -->
      <div class="w-full py-4 px-6 flex flex-col justify-between">
        <h3 class="font-semibold text-lg leading-tight truncate">
          {{ product.title }}
        </h3>
        <p>Бренд товара: {{ product.brand }}</p>
        <p>Рейтинг товара: {{ product.rating }}</p>
      </div>
      <div class="w-64 py-4 px-6 flex flex-row items-center justify-center">
        <h2 class="font-bold text-lg">{{ product.price }} ₽</h2>
      </div>
    </div>
  </main>
</template>

<script setup>
const products = ref([]);

async function getProducts() {
  const fetchedProducts = await $fetch("/api/products");
  console.log(fetchedProducts);
  products.value = fetchedProducts || [];
}

onMounted(getProducts);
</script>
