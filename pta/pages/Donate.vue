<template>
    <Donations :bakeSales="bakeSaleContent" :monetaryDonations="monetaryDonationContent" :donationLink="donationLink" />
</template>


<script setup>
const { bakeSaleContent, monetaryDonationContent, donationLink } = await fetchTextData();
</script>

<style scoped></style>