<template>
  <PageHeader />
  <main class="min-h-screen">
    <div class="max-w-5xl mx-auto py-4">
      <h1 class="text-2xl font-medium m-2">
        Редактирование товара: {{ tilteForPreview }}
      </h1>
      <form @submit="updateProduct">
        <div
          class="grid grid-cols-1 m-2"
          v-if="images.length > 0"
        >
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
        <div class="grid m-2 gap-4 md:grid-cols-2">
          <div>
            <label
              for="title"
              class="block mb-2 text-sm font-medium"
              >Заголовок:</label
            >
            <input
              id="title"
              type="text"
              v-model="title"
              placeholder="Введите заголовок товара"
              class="input"
              required
            />
          </div>
          <div>
            <label
              for="price"
              class="block mb-2 text-sm font-medium"
              >Стоимость товара:
            </label>
            <input
              id="price"
              type="number"
              v-model="price"
              class="input"
              placeholder="Введите стоимость товара"
              min="0"
              required
            />
          </div>
          <div>
            <label
              for="stock"
              class="block mb-2 text-sm font-medium"
              >Остаток товаров на складе:
            </label>
            <input
              id="stock"
              type="number"
              v-model="stock"
              class="input"
              placeholder="Введите остаток товаров на складе"
            />
          </div>
          <div>
            <label
              for="brand"
              class="block mb-2 text-sm font-medium"
              >Товарный бренд:</label
            >
            <select
              id="brand"
              v-model="brand"
              class="input"
            >
              <option
                v-for="brand in brands"
                :key="brand"
                :value="brand"
              >
                {{ brand }}
              </option>
            </select>
          </div>
          <div>
            <label
              for="category"
              class="block mb-2 text-sm font-medium"
              >Категория товара:</label
            >
            <select
              id="category"
              v-model="category"
              class="input"
            >
              <option
                v-for="category in categories"
                :key="category"
                :value="category"
              >
                {{ category }}
              </option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-1 m-2">
          <label
            for="description"
            class="block mb-2 text-sm font-medium"
            >Описание товара:</label
          >
          <textarea
            id="description"
            v-model="description"
            placeholder="Введите описание товара"
            class="input"
            rows="5"
            required
            >{{ description }}</textarea
          >
        </div>
        <div class="grid m-2 grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="submit"
            class="w-auto btn btn-green"
          >
            Редактировать
          </button>
          <button
            @click="deleteProduct()"
            type="button"
            class="w-auto btn btn-green"
          >
            Удалить
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const productId = route.params.id;

const {
  data: product,
  pending,
  error,
} = await useLazyFetch(`/api/products/${productId}`);

const title = ref("");
let tilteForPreview = "";
const description = ref("");
const thumbnail = ref("");
const images = ref([]);
const price = ref(0);
const stock = ref(0);
const category = ref("");
const brand = ref("");

const products = await $fetch("/api/products");
const categories = new Set(products.items.map((product) => product.category));
const brands = new Set(products.items.map((product) => product.brand));

watch(
  pending,
  () => {
    tilteForPreview = String(product.value?.title ?? "Загрузка...");
    title.value = String(product.value?.title ?? "Загрузка...");
    description.value = String(product.value?.description ?? "Загрузка...");
    thumbnail.value = product.value?.thumbnail ?? "Загрузка...";
    images.value = product.value?.images ?? [];
    price.value = Number(product.value?.price ?? "Загрузка...");
    stock.value = Number(product.value?.stock ?? "Загрузка...");
    category.value = String(product.value?.category ?? "Загрузка...");
    brand.value = String(product.value?.brand ?? "Загрузка...");
  },
  { deep: true, immediate: true }
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
  { immediate: true }
);

const updateProduct = async (event) => {
  event.preventDefault();

  const { success } = await $fetch(`/api/products/edit/${productId}`, {
    method: "PATCH",
    body: {
      title: title.value,
      description: description.value,
      price: price.value,
      stock: stock.value,
      category: category.value,
      brand: brand.value,
    },
  });

  if (success) {
    alert("Товар успешно отредактирован");
    router.back();
  }
};
const deleteProduct = async () => {
  if (confirm("Вы действительно хотите удалить этот товар?")) {
    const { success } = await $fetch(`/api/products/delete/${productId}`, {
      method: "DELETE",
    });

    if (success) {
      alert("Товар удален");
      router.back();
    } else {
      console.log("Не удалось удалить данный товар");
    }
  }

  return;
};

useHead({
  title: `Редактирование ${tilteForPreview}`,
});
</script>
