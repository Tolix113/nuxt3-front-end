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
          <!-- Костыльное no-photo -->
          <img
            v-else
            src="https://4.downloader.disk.yandex.ru/preview/0da902ec663ea3d302b372e3b5c44fcbf7bb1d7d9b68e65316b82810dcbc2d26/inf/IL7h6oFOmP-EGYmklOGSDlgwNLZ4_jQ6SjaduTCWnXpDOh0ck0yZRBFX6hu19yhFI7_pKgeqgBmof0nWfEEBvA%3D%3D?uid=801339761&filename=no-photo.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=801339761&tknv=v2&size=1903x919"
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
            <template v-if="product.discountPercentage > 0">
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
            </template>
            <span
              v-else
              class="ml-1"
            >
              {{ product.price }} ₽
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

const {
  data: product,
  pending,
  error,
} = await useLazyFetch(`/api/products/${route.params.id}`);

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

watch(
  error,
  () => {
    if (error.value?.statusCode === 404) {
      throw createError({
        statusCode: error.value.statusCode,
        statusMessage: "Товар не найден",
      });
    }
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>
