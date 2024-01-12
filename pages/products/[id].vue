<script setup>
    const route = useRoute();
    console.log(route.params.id);
</script>
<template>
    <div>
      <h1 class="text-[24px]">{{ $route.params.id}}</h1>
    </div>
</template>