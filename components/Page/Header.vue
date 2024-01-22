<template>
  <nav class="mx-auto bg-green-100">
    <ul>
      <div class="flex flex-wrap items-center gap-x-2 p-4">
        <li
          class="py-2 px-4 rounded-lg border hover:bg-green-300 hover:ring-2 hover:ring-green-500"
        >
          <NuxtLink to="/products">Все продукты</NuxtLink>
        </li>
        <li
          class="py-2 px-4 rounded-lg border hover:bg-green-300 hover:ring-2 hover:ring-green-500"
        >
          <NuxtLink to="/products/create">Добавить продукт</NuxtLink>
        </li>
      </div>
    </ul>
  </nav>
</template>
