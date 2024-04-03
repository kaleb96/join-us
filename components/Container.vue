<script setup>
</script>

<template>
    <div class="container">
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
</style>