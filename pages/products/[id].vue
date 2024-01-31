<template>
  <PageHeader />
  <main class="min-h-screen">
    <div class="max-w-5xl mx-auto py-4">
      <div v-if="pending">Загрузка...</div>
      <div
        v-else
        class="grid grid-cols-2 m-2"
      >
        <div v-if="images.length > 0">
          <Carousel>
            <Slide
              v-for="slide in images.slice().reverse()"
              :key="slide"
            >
              <img :src="slide" />
            </Slide>
            <template #addons>
              <Navigation />
              <Pagination />
            </template>
          </Carousel>
        </div>
        <div class="flex flex-col flex-wrap px-4">
          <h2 class="text-2xl font-bold mb-2">
            {{ product.title }}
          </h2>
          <div class="mr-4">
            <span class="font-bold">Бренд:</span>
            <span class="ml-1">{{ product.brand }}</span>
          </div>
          <div class="mr-4">
            <span class="font-bold">Цена:</span>
            <span class="ml-1">{{ product.price }} Р</span>
          </div>
          <div>
            <span class="font-bold">Описание товара:</span>
            <p class="text-sm mt-1">{{ product.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
const route = useRoute();
const images = ref([]);

const { data: product, pending } = await useLazyFetch(
  `/api/products/${route.params.id}`
);

watch(
  pending,
  () => {
    images.value = product.value?.images ? product.value?.images : [];
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>
