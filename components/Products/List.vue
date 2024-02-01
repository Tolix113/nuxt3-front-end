<template>
  <!-- product card -->
  <div
    v-for="product in props.products"
    class="flex flex-col md:flex-row rounded-lg border shadow-md mt-4 mx-2 p-1"
  >
    <!-- thumbnail -->
    <div class="h-64 md:h-32 w-auto md:w-1/2">
      <NuxtLink :to="`/products/edit/${product._id}`">
        <img
          :src="product.thumbnail"
          class="inset-0 h-full w-full object-cover object-center"
        />
      </NuxtLink>
    </div>
    <!-- content -->
    <div class="w-full py-4 px-6 flex flex-col justify-between">
      <h3 class="font-semibold text-lg leading-tight truncate">
        <NuxtLink :to="`/products/${product._id}`">
          {{ product.title }}
        </NuxtLink>
      </h3>
      <p>Бренд товара: {{ product.brand }}</p>
      <div class="flex items-center">
        <Stars />
        <p class="ms-2 text-sm font-bold text-gray-900">
          {{ product.rating }}
        </p>
      </div>
    </div>
    <div
      class="w-64 py-4 px-6 flex flex-row items-center justify-start md:justify-center"
    >
      <div class="flex flex-col">
        <span class="font-bold text-sm text-right line-through text-gray-600">
          {{ product.price }}
        </span>
        <span class="font-bold text-lg">
          {{
            Math.trunc(
              product.price - (product.price * product.discountPercentage) / 100
            )
          }}
          ₽
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["products"]);
</script>
