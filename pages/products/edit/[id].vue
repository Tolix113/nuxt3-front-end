<template>
  <PageHeader />
  <main class="min-h-screen">
    <div class="max-w-5xl mx-auto py-4">
      <h1 class="text-2xl font-medium m-2">
        Редактирование товара: {{ product.title }}
      </h1>
      <form @submit="updateProduct">
        <div class="grid grid-cols-1 m-2">
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
              for="thumbnailForUpload"
              class="block mb-2 text-sm font-medium"
              >Превью:</label
            >
            <input
              id="thumbnailForUpload"
              type="file"
              @change="getFile($event)"
              accept="image/*"
              class="block w-full text-sm font-medium bg-gray-100 border border-gray-300 cursor-pointer file:cursor-pointer file:text-white file:border-0 file:py-2.5 file:px-5 file:bg-green-600 rounded-lg"
            />
          </div>
          <div>
            <label
              for="imagesForUpload"
              class="block mb-2 text-sm font-medium"
              >Изображения для слайдера:</label
            >
            <input
              id="imagesForUpload"
              type="file"
              @change="getFiles($event)"
              accept="image/"
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
const { data: product, pending } = await useLazyFetch(
  `/api/products/${productId}`
);

const title = ref("");
const description = ref("");
const thumbnail = ref("");
const images = ref([]);
const thumbnailForUpload = ref("");
const imagesForUpload = ref([]);
const price = ref(0);
const stock = ref(0);
const category = ref("");
const brand = ref("");

const titleError = ref("");
const descriptionError = ref("");

watch(
  pending,
  () => {
    title.value = String(product.value?.title ?? "Загрузка...");
    description.value = String(product.value?.description ?? "Загрузка...");
    thumbnail.value = product.value?.thumbnail ?? "Загрузка...";
    images.value = product.value?.images ?? "Загрузка...";
    price.value = Number(product.value?.price ?? "Загрузка...");
    stock.value = Number(product.value?.stock ?? "Загрузка...");
    category.value = String(product.value?.category ?? "Загрузка...");
    brand.value = String(product.value?.brand ?? "Загрузка...");
  },
  { deep: true, immediate: true }
);

const updateProduct = async (event) => {
  event.preventDefault();

  //Обработка ошибок
  // console.log(`Title: ${!!title.value}`);
  if (!title.value.trim())
    return (titleError.value = "Необходимо ввести заголовок товара");
  // console.log(`Description: ${!!description.value}`);
  if (!description.value.trim())
    return (descriptionError.value = "Необходимо ввести описание товара");

  const editedProduct = await $fetch(`/api/products/edit/${productId}`, {
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

  if (editedProduct.success) {
    console.log("Продукт успешно отредактирован!");
    uploadImages(productId);
    console.log("Изображения успешно обновлены!");
  }

  // router.back();
};

// *** Вынести в плагин
async function uploadImages() {
  if (!thumbnailForUpload.value && !imagesForUpload.value) {
    return;
  }

  const formData = new FormData();

  if (thumbnailForUpload.value) {
    formData.append(
      "thumbnail",
      thumbnailForUpload.value,
      thumbnailForUpload.value.name
    );
  }

  if (imagesForUpload.value) {
    for (const image of imagesForUpload.value) {
      formData.append("images", image, image.name);
    }
  }

  await $fetch(`/api/images/upload/${productId}`, {
    method: "POST",
    body: formData,
  });
}

async function getFile(event) {
  const _file = event.target.files[0];
  thumbnailForUpload.value = await _file;
}

async function getFiles(event) {
  const _files = event.target.files;
  imagesForUpload.value = await _files;
}

const deleteProduct = async (event) => {
  if (confirm("Вы действительно хотите удалить этот продукт?")) {
    await $fetch(`/api/products/delete/${productId}`, {
      method: "DELETE",
    });

    router.back();
  }

  return;
};

useHead({
  title: `Редактирование ${title.value}`,
});
</script>
