<template>
    <Donations :bakeSales="bakeSaleContent" :monetaryDonations="monetaryDonationContent" :donationLink="donationLink" :donateItemButtonText="donateItemButtonText" />
</template>


<script setup>
const { bakeSaleContent, monetaryDonationContent, donationLink, donateItemButtonText } = await fetchTextData();
</script>

<style scoped></style>