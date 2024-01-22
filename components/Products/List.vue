<template>
  <PageHeader />
  <main class="max-w-screen-lg mx-auto">
    <div class="grid grid-cols-[240px_1fr]">
      <div class="flex flex-col">
        <!-- siderbar -->
        <div class="shadow-xl border mt-4 rounded-lg py-2 px-2">
          <label class="relative block">
            <button class="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg
                class="h-6 w-6 fill-slate-300 hover:fill-slate-600"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <input
              class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-lg py-2 pl-9 pr-3 shadow-lg focus:outline-none sm:text-sm"
              type="text"
              name="search"
              v-model="search"
              placeholder="Поиск..."
            />
          </label>
          <input
            class="mt-2 placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-lg py-2 pl-5 pr-3 shadow-lg focus:outline-none sm:text-sm"
            id="fromPrice"
            type="number"
            v-model="fromPrice"
            placeholder="От 0"
          />
          <input
            class="mt-2 placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-lg py-2 pl-5 pr-3 shadow-lg focus:outline-none sm:text-sm"
            id="toPrice"
            type="number"
            v-model="toPrice"
            placeholder="До 999999"
          />
        </div>
      </div>
      <div class="flex flex-col">
        <!-- product card -->
        <div
          v-for="product in filteredProducts"
          class="flex flex-col md:flex-row rounded-lg border shadow-xl mt-4 mx-2"
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
      </div>
    </div>
  </main>
</template>

<script setup>
const products = ref([]);
const search = ref("");
const fromPrice = ref("");
const toPrice = ref("");

async function getProducts() {
  const fetchedProducts = await $fetch("/api/products");
  products.value = fetchedProducts.items || [];
  fromPrice.value = fetchedProducts.minPrice;
  toPrice.value = fetchedProducts.maxPrice;
}

const filteredProducts = computed(() => {
  return products.value.filter(filteredBySearch).filter(fileteredByPrice);
});

const filteredBySearch = (item) => {
  return item.title.toLowerCase().includes(search.value.toLowerCase());
};

const fileteredByPrice = (product) => {
  return product.price >= fromPrice.value && product.price <= toPrice.value;
};

console.log(filteredProducts.value);

onMounted(getProducts);
</script>
