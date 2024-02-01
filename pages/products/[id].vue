<template>
  <PageHeader />
  <main class="min-h-screen">
    <div class="max-w-5xl mx-auto py-4">
      <div v-if="pending">Загрузка...</div>
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 m-2"
      >
        <div>
          <Carousel v-if="images.length > 0">
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
          <img
            v-else
            :src="`/data/no-photo.png`"
          />
        </div>
        <div class="flex flex-col px-4">
          <h2 class="text-2xl font-bold mb-2">
            {{ product.title }}
          </h2>
          <div class="mr-4">
            <span class="font-bold">Бренд:</span>
            <span class="ml-1">{{ product.brand }}</span>
          </div>
          <div class="mr-4">
            <div class="flex items-center">
              <span class="font-bold mr-2">Рейтинг:</span>
              <Stars :count="Math.floor(product.rating)" />
              <span class="ml-1">{{ product.rating }}</span>
            </div>
          </div>
          <div class="mr-4">
            <span class="font-bold">Цена:</span>
            <span class="ml-1 line-through">{{ product.price }}</span>
            <span class="ml-1">
              {{
                Math.trunc(
                  product.price -
                    (product.price * product.discountPercentage) / 100
                )
              }}
              ₽
            </span>
          </div>
          <div>
            <span class="font-bold">Описание товара:</span>
            <p class="text-md mt-1">{{ product.description }}</p>
          </div>
          <div class="mt-6">
            <button
              class="btn btn-green w-full"
              v-if="product.stock > 0"
            >
              Добавить в корзину
            </button>
            <span
              v-else
              class="mx-auto btn bg-green-700 text-white"
            >
              Товара нет в наличии
            </span>
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
    images.value = product.value?.images ?? [];
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>
