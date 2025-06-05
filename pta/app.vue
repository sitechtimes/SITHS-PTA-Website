<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
useHead({
  htmlAttrs: {
    lang: 'en'
  },
  title: 'PTA - Staten Island Tech',
  meta: [
    { name: 'description', content: 'Welcome to the PTA page of Staten Island Tech. Here you can find information about our events, resources, and how to get involved.' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' }
  ]
})
</script>