import type { BlockContent } from '@/utils/types';

export function useWebsiteData() {
  const fetchLoading = ref(false);
  const ptaMembers = ref<PtaMember[]>([]);
  const aboutUsContent = ref<BlockContent[]>([])
  const activitiesContent = ref<BlockContent[]>([])

  async function fetchPtaMembers() {
    fetchLoading.value = true;
    const query = `*[_type == "ptaMember"]{
      _id,
      name,
      role,
      email,
      phone,
      "profilePhotoUrl": profilePhoto.asset->url,
      memberType
    }`;

    try {
      const { data, error } = await useSanityQuery<PtaMember[]>(query);
      if (error.value) {
        console.error("Error fetching PTA members:", error.value);
        ptaMembers.value = [];
      } else if (data.value) {
        ptaMembers.value = data.value;
      }
    } catch (error) {
      console.log(error);
      ptaMembers.value = [];
    } finally {
      fetchLoading.value = false;
    }
  }

  async function fetchHomePageContent() {
    const query = `*[_type == "homePage"][0]{
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

  onMounted(async () => {
    await nextTick();
    await fetchPtaMembers();
    await fetchHomePageContent();
  });
  return {
    ptaMembers,
    fetchLoading,
    fetchPtaMembers,
    aboutUsContent,
    activitiesContent,
    fetchHomePageContent,
  };
}