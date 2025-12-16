type FooterContentData = {
    aboutUsText?: any[];
    aboutUsButtonText?: string;
    aboutUsButtonLink?: string;
    donateButtonText?: string;
    donateButtonLink?: string;
    studentCredit?: any[]; // portable text
};
import type { BlockContent } from '@/utils/types';

export async function fetchTextData() {
    const fetchLoading = ref(false);
    const aboutUsContent = ref<BlockContent[]>([]);
    const activitiesContent = ref<BlockContent[]>([]);
    const bakeSaleContent = ref<BlockContent[]>([]);
    const monetaryDonationContent = ref<BlockContent[]>([]);
    const joinUsContent = ref<BlockContent[]>([]);
    const donationLink = ref("");
    const donateItemButtonText = ref("");
    const footerAboutUsButtonText = ref("");
    const footerAboutUsButtonLink = ref("");
    const footerAboutUsText = ref<any[]>([]);
    const footerDonateButtonText = ref("");
    const footerDonateButtonLink = ref("");
    const studentCredit = ref<any[]>([]);
    async function fetchFooterContent() {
        const query = `*[_type == \"footerContent\"][0]{
            aboutUsText,
            aboutUsButtonText,
            aboutUsButtonLink,
            donateButtonText,
            donateButtonLink,
            studentCredit
        }`;
        try {
            const { data, error } = await useSanityQuery<FooterContentData>(query);
            if (error.value) {
                console.error("Error fetching Footer Content:", error.value);
                footerAboutUsText.value = [];
                footerAboutUsButtonText.value = "";
                footerAboutUsButtonLink.value = "";
                footerDonateButtonText.value = "";
                footerDonateButtonLink.value = "";
                studentCredit.value = [];
            } else if (data.value) {
                const footerData = data.value as FooterContentData;
                footerAboutUsText.value = footerData.aboutUsText || [];
                footerAboutUsButtonText.value = footerData.aboutUsButtonText || "";
                footerAboutUsButtonLink.value = footerData.aboutUsButtonLink || "";
                footerDonateButtonText.value = footerData.donateButtonText || "";
                footerDonateButtonLink.value = footerData.donateButtonLink || "";
                studentCredit.value = footerData.studentCredit || [];
            }
        } catch (error) {
            console.log(error);
            footerAboutUsText.value = [];
            footerAboutUsButtonText.value = "";
            footerAboutUsButtonLink.value = "";
            footerDonateButtonText.value = "";
            footerDonateButtonLink.value = "";
            studentCredit.value = [];
        }
    }

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
            donationLink,
            donateItemButtonText
        }`;
        try {
            const { data, error } = await useSanityQuery<DonationPageData>(query);
            if (error.value) {
                console.error("Error fetching Donation Page content:", error.value);
                bakeSaleContent.value = [];
                monetaryDonationContent.value = [];
                donationLink.value = "";
                donateItemButtonText.value = "Donate Item";
            } else if (data.value) {
                bakeSaleContent.value = data.value.bakeSales || [];
                monetaryDonationContent.value = data.value.monetaryDonations || [];
                donationLink.value = data.value.donationLink || "";
                donateItemButtonText.value = data.value.donateItemButtonText || "Donate Item";
            }
        } catch (error) {
            console.log(error);
            bakeSaleContent.value = [];
            monetaryDonationContent.value = [];
            donationLink.value = "";
            donateItemButtonText.value = "Donate Item";
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
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    fetchJoinUsContent();
    fetchHomePageContent();
    fetchDonationPageContent();
    fetchFooterContent();
    
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
        donationLink,
        donateItemButtonText,
        footerAboutUsText,
        footerAboutUsButtonText,
        footerAboutUsButtonLink,
        footerDonateButtonText,
        footerDonateButtonLink,
        studentCredit
    };
}