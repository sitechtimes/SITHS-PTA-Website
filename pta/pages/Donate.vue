<template>
  <Donations
    :bakeSales="bakeSaleContent"
    :monetaryDonations="monetaryDonationContent"
  />
</template>

<script setup>
const { bakeSaleContent, monetaryDonationContent } = await fetchTextData();
</script>

<style scoped></style>
