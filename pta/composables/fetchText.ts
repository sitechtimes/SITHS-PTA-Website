import type { BlockContent } from '@/utils/types';

export async function fetchTextData() {
    const fetchLoading = ref(false);
    const aboutUsContent = ref<BlockContent[]>([]);
    const activitiesContent = ref<BlockContent[]>([]);
    const bakeSaleContent = ref<BlockContent[]>([]);
    const monetaryDonationContent = ref<BlockContent[]>([]);
    const joinUsContent = ref<BlockContent[]>([]);
 const donationLink = ref<string>("");

    async function fetchHomePageContent() {
        const query = `*[_type == "homePageContent"][0]{
            aboutUs,
            activitiesContent
        }`;
        try {
            const { data, error } = await useSanityQuery<HomePageData>(query);
            if (error.value) {
                console.error("Error fetching Home Page content:", error.value);
                aboutUsContent.value = [];
                activitiesContent.value = [];
            } else if (data.value) {
                aboutUsContent.value = data.value.aboutUs || [];
                activitiesContent.value = data.value.activitiesContent || [];
            }
        } catch (error) {
            console.log(error);
            aboutUsContent.value = [];
            activitiesContent.value = [];
        }
    }

    async function fetchDonationPageContent() {
        const query = `*[_type == "donationPageContent"][0]{
            bakeSales,
            monetaryDonations,
            donationLink
        }`;
        try {
            const { data, error } = await useSanityQuery<DonationPageData>(query);
            if (error.value) {
                console.error("Error fetching Donation Page content:", error.value);
                bakeSaleContent.value = [];
                monetaryDonationContent.value = [];
                donationLink.value = "";
            } else if (data.value) {
                bakeSaleContent.value = data.value.bakeSales || [];
                monetaryDonationContent.value = data.value.monetaryDonations || [];
                donationLink.value = data.value.donationLink || "";
            }
        } catch (error) {
            console.log(error);
            bakeSaleContent.value = [];
            monetaryDonationContent.value = [];
            donationLink.value = "";
        }
    }
    
    async function fetchJoinUsContent() {
        const query = `*[_type == "joinUsPageContent"][0]{
            joinUs
        }`;
        try {
            const { data, error } = await useSanityQuery<JoinUsData>(query);
            if (error.value) {
                console.error("Error fetching Join Us content:", error.value);
                joinUsContent.value = []; 
            } else if (data.value) {
                joinUsContent.value = data.value.joinUs || [];
                console.log(joinUsContent)
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    fetchJoinUsContent();
    fetchHomePageContent();
    fetchDonationPageContent();
        
    return {
        fetchLoading,
        aboutUsContent,
        activitiesContent,
        bakeSaleContent,
        monetaryDonationContent,
        joinUsContent,
        fetchHomePageContent,
        fetchDonationPageContent,
        fetchJoinUsContent,
        donationLink
    };
}