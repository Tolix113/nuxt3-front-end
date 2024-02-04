<template>
  <PageHeader />
  <main class="min-h-screen">
    <div class="max-w-5xl mx-auto py-4">
      <h1 class="text-2xl font-medium m-2">Добавление товара</h1>
      <form @submit="createProduct">
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
            >
              Товарный бренд:
            </label>
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
const price = ref(0);
const stock = ref(0);
const category = ref("");
const brand = ref("");

const products = await $fetch("/api/products");
const categories = new Set(products.items.map((product) => product.category));
const brands = new Set(products.items.map((product) => product.brand));

async function createProduct(event) {
  event.preventDefault();

  const { success } = await $fetch("/api/products/create", {
    method: "POST",
    body: {
      title: title.value.trim(),
      description: description.value.trim(),
      price: price.value,
      stock: stock.value,
      category: category.value,
      brand: brand.value,
      thumbnail: "http://via.placeholder.com/640x360",
      images: [
        "http://via.placeholder.com/640x360",
        "http://via.placeholder.com/640x360",
        "http://via.placeholder.com/640x360",
      ],
    },
  });

  if (success) {
    alert("Товар успешно добавлен");
    navigateTo("/products");
  } else {
    alert("Ошибка добавления товара!");
  }
}
</script>
