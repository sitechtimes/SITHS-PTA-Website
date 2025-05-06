export function useWebsiteData() {
  const fetchLoading = ref(false);
  const ptaMembers = ref<PtaMember[]>([]);
  const galleryImages = ref<GalleryImage[]>([]);

  async function fetchPtaMembers() {
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
      console.error("Error during PTA members fetch:", error);
      ptaMembers.value = [];
    }
  }

  async function fetchGalleryImages() {
    const query = `*[_type == "galleryImage"] | order(order asc) {
      "src": image.asset->url,
      alt
    }`;

    try {
      const { data, error } = await useSanityQuery<GalleryImage[]>(query);
      if (error?.value) {
        console.error("Error fetching gallery images:", error.value);
        galleryImages.value = [];
      } else if (data?.value) {
        galleryImages.value = data.value;
      }
    } catch (error) {
      console.error("Error during gallery images fetch:", error);
      galleryImages.value = [];
    }
  }

  onMounted(async () => {
    fetchLoading.value = true;
    await nextTick();
    try {
      await Promise.all([
        fetchPtaMembers(),
        fetchGalleryImages()
      ]);
    } catch (error) {
        console.error("Error fetching website data:", error);
    } finally {
      fetchLoading.value = false;
    }
  });

  return {
    ptaMembers,
    galleryImages,
    fetchLoading,
    fetchPtaMembers,
    fetchGalleryImages,
  };
}