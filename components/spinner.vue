<template>
    <a-spin :indicator="indicator" size="large" />
  </template>
  <script lang="ts" setup>
  import { LoadingOutlined } from '@ant-design/icons-vue';
  import { h } from 'vue';
  const indicator = h(LoadingOutlined, {
    style: {
      fontSize: '24px',
    },
    spin: true,
  });
  </script>
  
  