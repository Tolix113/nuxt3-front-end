<template>
  <PageHeader />
  <main class="max-w-screen-lg mx-auto">
    <div class="flex flex-row flex-wrap w-full">
      <div class="flex flex-col w-full mx-2 md:w-[240px]">
        <!-- siderbar -->
        <div class="border mt-4 rounded-lg py-2 px-2">
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
              class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-lg py-2 pl-9 pr-3 shadow-md focus:outline-none sm:text-sm"
              type="text"
              name="search"
              v-model="search"
              placeholder="Поиск..."
            />
          </label>
          <label
            class="block mt-2 pl-1 font-semibold"
            for="fromPrice"
            >Цена:</label
          >
          <input
            class="block mt-2 placeholder:text-slate-400 bg-white w-full border border-slate-300 rounded-lg py-2 pl-5 pr-3 shadow-md focus:outline-none sm:text-sm"
            id="fromPrice"
            type="number"
            v-model.number="fromPrice"
            :placeholder="`От ${minPrice}`"
          />
          <input
            class="block mt-2 placeholder:text-slate-400 bg-white w-full border border-slate-300 rounded-lg py-2 pl-5 pr-3 shadow-md focus:outline-none sm:text-sm"
            id="toPrice"
            type="number"
            v-model.number="toPrice"
            :placeholder="`До ${maxPrice}`"
          />
          <label class="flex items-center mt-2">
            <input
              class="mr-1"
              type="checkbox"
              v-model="inStock"
            />
            В наличии
          </label>
          <span class="block font-semibold">Бренды:</span>
          <div
            class="flex flex-col"
            v-for="brand in brands"
          >
            <label>
              <input
                id="brands"
                type="checkbox"
                :value="brand"
                v-model="selectedBrands"
              />
              {{ brand }}
            </label>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full md:w-[calc(100%-256px)]">
        <!-- product card -->
        <div
          v-for="product in filteredProducts"
          class="flex flex-col md:flex-row rounded-lg border shadow-md mt-4 mx-2"
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
          <div
            class="w-64 py-4 px-6 flex flex-row items-center justify-start md:justify-center"
          >
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
const inStock = ref(false);
const selectedBrands = ref([]);
let maxPrice = 0;
let minPrice = 0;

const categories = ["smartphones"];
const brands = ["Apple", "Samsung"];

async function getProducts() {
  const fetchedProducts = await $fetch("/api/products");
  products.value = fetchedProducts.items || [];
  maxPrice = fetchedProducts.maxPrice;
  minPrice = fetchedProducts.minPrice;
  fromPrice.value = minPrice;
  toPrice.value = maxPrice;
}

const filteredProducts = computed(() => {
  let p = products.value;

  if (search.value) {
    p = p.filter(filterBySearch);
  }

  if (fromPrice.value || toPrice.value) {
    p = p.filter(filterByPrice);
  }

  if (inStock.value) {
    p = p.filter(filterByStock);
  }

  if (selectedBrands.value.length > 0) {
    p = p.filter(filterByBrand);
  }

  return p;
});

const filterBySearch = (item) => {
  return item.title.toLowerCase().includes(search.value.toLowerCase());
};

const filterByPrice = (product) => {
  const filterFromPrice = fromPrice.value ? fromPrice.value : minPrice;
  const filterToPrice = toPrice.value ? toPrice.value : maxPrice;
  return product.price >= filterFromPrice && product.price <= filterToPrice;
};

const filterByStock = (product) => {
  return product.stock > 0;
};

const filterByBrand = (product) => {
  return selectedBrands.value.includes(product.brand);
};

watch([fromPrice, toPrice], () => {
  if (fromPrice.value <= 0) {
    fromPrice.value = "";
  }

  if (toPrice.value <= 0) {
    toPrice.value = "";
  }
});

watch(selectedBrands, () => {
  console.log(selectedBrands);
});

onMounted(getProducts);
</script>
