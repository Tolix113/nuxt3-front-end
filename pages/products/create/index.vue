<template>
  <PageHeader />
  <main class="min-h-screen">
    <div class="max-w-5xl mx-auto py-4">
      <h1 class="text-2xl font-medium m-2">Создание продукта</h1>
      <form @submit="createProduct">
        <div class="grid grid-cols-1 m-2">
          <img
            :src="thumbnail"
            class="rounded-lg max-h-64"
          />
        </div>
        <div class="grid m-2 gap-4 md:grid-cols-2">
          <div>
            <label
              for="thumbnail"
              class="block mb-2 text-sm font-medium"
              >Превью:</label
            >
            <input
              id="thumbnail"
              type="file"
              @change="getFile($event)"
              class="block w-full text-sm font-medium bg-gray-100 border border-gray-300 cursor-pointer file:cursor-pointer file:text-white file:border-0 file:py-2.5 file:px-5 file:bg-green-600 rounded-lg"
            />
          </div>
          <div>
            <label
              for="images"
              class="block mb-2 text-sm font-medium"
              >Изображения для слайдера:</label
            >
            <input
              id="images"
              type="file"
              @change="getFiles($event)"
              class="block w-full text-sm font-medium bg-gray-100 border border-gray-300 cursor-pointer file:cursor-pointer file:text-white file:border-0 file:py-2.5 file:px-5 file:bg-green-600 rounded-lg"
              multiple
            />
          </div>
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
            <p
              v-if="titleError"
              class="mt-2 text-sm font-medium text-red-600"
            >
              {{ titleError }}
            </p>
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
            <input
              id="brand"
              type="text"
              v-model="brand"
              class="input"
              placeholder="Введите бренд товара"
            />
          </div>
          <div>
            <label
              for="category"
              class="block mb-2 text-sm font-medium"
              >Категория товара:</label
            >
            <input
              id="category"
              type="text"
              v-model="category"
              class="input"
              placeholder="Введите категорию товара"
            />
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
            >{{ description }}</textarea
          >
          <p
            v-if="descriptionError"
            class="mt-2 text-sm font-medium text-red-600"
          >
            {{ descriptionError }}
          </p>
        </div>
        <div class="grid m-2 grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="submit"
            class="btn btn-green"
          >
            Добавить
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
const title = ref("");
const description = ref("");
const thumbnail = ref("");
const images = ref([]);
const price = ref(0);
const stock = ref(0);
const category = ref("");
const brand = ref("");

const titleError = ref("");
const descriptionError = ref("");

async function getFile(event) {
  const _file = event.target.files[0];
  thumbnail.value = await _file;
}

async function getFiles(event) {
  const _files = event.target.files;
  images.value = await _files;
}

async function uploadImages(productId) {
  if (!thumbnail.value && !images.value) {
    return;
  }

  const formData = new FormData();
  formData.append("thumbnail", thumbnail.value, thumbnail.value.name);

  for (const image of images.value) {
    formData.append("images", image, image.name);
  }

  await $fetch(`/api/images/upload/${productId}`, {
    method: "POST",
    body: formData,
  });
}

async function createProduct(event) {
  event.preventDefault();

  const createdProduct = await $fetch("/api/products/create", {
    method: "POST",
    body: {
      title: title.value,
      description: description.value,
      price: price.value,
      stock: stock.value,
      category: category.value,
      brand: brand.value,
    },
  });

  if (createdProduct.success) {
    uploadImages(createdProduct.id);
  }
}
</script>
