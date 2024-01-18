<template>
  <div class="container mx-auto py-4 border border-red-400">
    <h1 class="text-[24px]">ID: {{ $route.params.id }}</h1>
    <form @submit="updateProduct">
      <div class="grid gap-4 mb-6 grid-cols-2">
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
            for="description"
            class="block mb-2 text-sm font-medium"
            >Описание товара:</label
          >
          <textarea
            id="description"
            v-model="description"
            placeholder="Введите описание товара"
            class="input"
            >{{ description }}</textarea
          >
          <p
            v-if="descriptionError"
            class="mt-2 text-sm font-medium text-red-600"
          >
            {{ descriptionError }}
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NuxtLink
            title="Вернуться"
            to="/"
            class="w-auto btn btn-green"
          >
            Вернуться
          </NuxtLink>
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
      </div>
    </form>
  </div>
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
const titleError = ref("");
const descriptionError = ref("");

watch(
  pending,
  () => {
    title.value = String(product.value?.title ?? "Загрузка...");
    description.value = String(product.value?.description ?? "Загрузка...");
  },
  { deep: true, immediate: true }
);

const updateProduct = async (event) => {
  event.preventDefault();

  //Обработка ошибок
  console.log(`Title: ${!!title.value}`);
  if (!title.value.trim())
    return (titleError.value = "Необходимо ввести заголовок товара");
  console.log(`Description: ${!!description.value}`);
  if (!description.value.trim())
    return (descriptionError.value = "Необходимо ввести описание товара");

  await $fetch(`/api/products/edit/${productId}`, {
    method: "PATCH",
    body: {
      title: title.value,
      description: description.value,
    },
  });

  router.back();
};

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
