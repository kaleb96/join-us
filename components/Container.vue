<script setup lang="ts">

const isLoading = ref(false);

setTimeout(()=> {
    isLoading.value = true;
}, 2000)
</script>

<template>
    <spinner class="spinner" v-if="!isLoading"></spinner>
    <div class="container" v-else>
        <slot></slot>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    min-width: 800px;
    display: flex;
    justify-content: center;
    margin-top: 50px;
    padding: 0;
}

.spinner {
    
    margin-top: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>