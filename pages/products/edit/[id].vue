<template>
    <div>
      <h1 class="text-[24px]">{{ $route.params.id }}</h1>
      <form @submit="updateProduct">
        <span v-if="titleError" class="text-red-600">{{ titleError }}</span>
        <input
          type="text"
          v-model="title"
          placeholder="Введите заголовок товара"
        >
        <span v-if="descriptionError" class="text-red-600">{{ descriptionError }}</span>
        <textarea
          v-model="description"
          placeholder="Введите описание товара"
        >{{ description }}</textarea>
        <div>
          <NuxtLink
            title="Вернуться"
            to="/"
            class="w-auto text-white bg-green-600 hover:bg-green-700 font-medium rounded-full text-sm px-5 py-2.5 text-center focus:ring-4 focus:ring-green-300"
          >
            Вернуться
          </NuxtLink>
          <button
            type="submit"
            class="w-auto text-white bg-green-600 hover:bg-green-700 font-medium rounded-full text-sm px-5 py-2.5 text-center focus:ring-4 focus:ring-green-300"
          >
            Редактировать
          </button>
          <button 
            @click="deleteProduct()"
            type="button"
            class="w-auto text-white bg-green-600 hover:bg-green-700 font-medium rounded-full text-sm px-5 py-2.5 text-center focus:ring-4 focus:ring-green-300"
          >
            Удалить
          </button>
        </div>
      </form>
    </div>
</template>

<script setup>
    const route = useRoute();
    const router = useRouter();

    const productId = route.params.id;
    const { data: product, pending } = await useLazyFetch(`/api/products/${productId}`);
    
    const title = ref('');
    const description = ref('');
    const titleError = ref('');
    const descriptionError = ref('');

    watch(pending, () => {
      title.value = String(product.value?.title ?? 'Загрузка...');
      description.value = String(product.value?.description ?? 'Загрузка...');
    }, { deep: true, immediate: true });

    const updateProduct = async(event) => {
      event.preventDefault();
      
      //Обработка ошибок
      if (!title.value) return title.value = 'Необходимо ввести заголовок';
      if (!description.value) return description.value = 'Необходимо ввести описание';

      await $fetch(`/api/products/edit/${productId}`, {
        method: 'PATCH',
        body: {
          title: title.value,
          description: description.value,
        }
      })
      
      router.back();
    }

    const deleteProduct = async(event) => {
      if (confirm('Вы действительно хотите удалить этот продукт?')) {
        await $fetch(`/api/products/delete/${productId}`, {
          method: 'DELETE',
        });

        router.back();
      }

      return;
    }

    useHead({
      title: `Редактирование ${title.value}`,
    })
</script>