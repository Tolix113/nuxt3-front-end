<template>
  <main class="min-h-screen flex items-center justify-center">
    <div
      class="w-9/12 flex-col items-center p-12 justify-center bg-white border border-gray-300 rounded-lg shadow-lg"
    >
      <p
        class="text-6xl md:text-7xl lg:text-9xl font-bold text-gray-400 text-center"
        v-if="error.statusCode"
      >
        {{ error.statusCode }}
      </p>
      <p
        class="mt-2 text-2xl md:text-3xl lg:text-4xl text-gray-500 break-words text-center pb-6 border-b-2"
        v-if="error.statusMessage"
      >
        {{ error.statusMessage }}
      </p>
      <p
        class="mt-2 text-2xl md:text-3xl lg:text-4xl text-gray-500 break-words text-center pb-6 border-b-2"
        v-else
      >
        {{ error }}
      </p>
      <div class="flex justify-center items-center mt-4">
        <hr />
        <button
          class="btn btn-green w-full"
          @click="handlerError"
        >
          Вернуться домой
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
const props = defineProps(["error"]);
const handlerError = () => {
  clearError({ redirect: "/" });
};
</script>
