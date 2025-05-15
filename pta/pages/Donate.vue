<template>
    <Donations :bakeSales="bakeSaleContent" :monetaryDonations="monetaryDonationContent" />
</template>


<script setup>
const { bakeSaleContent, monetaryDonationContent } = fetchTextData();
</script>

<style scoped></style>