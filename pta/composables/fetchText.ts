import type { BlockContent } from '@/utils/types';

export function fetchTextData() {
    const fetchLoading = ref(false);
    const aboutUsContent = ref<BlockContent[]>([]);
    const activitiesContent = ref<BlockContent[]>([]);

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

    fetchHomePageContent();

    return {
        fetchLoading,
        aboutUsContent,
        activitiesContent,
        fetchHomePageContent,
    };
}
