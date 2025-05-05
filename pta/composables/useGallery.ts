export function useGallery() {
  const fetchLoading = ref(false);
  const galleryImages = ref<GalleryImage[]>([]);

  async function fetchGalleryImages() {
    fetchLoading.value = true;
    const query = `*[_type == "galleryImage"] | order(order asc) {
      "src": image.asset->url,
      alt
    }`;

    try {
      const { data, error } = await useSanityQuery(query);
      if (error?.value) {
        console.error("Error fetching gallery images:", error.value);
        galleryImages.value = [];
      } else if (data?.value) {
        galleryImages.value = Array.isArray(data.value) ? data.value : [];
      }
    } catch (error) {
      console.log(error);
      galleryImages.value = [];
    } finally {
      fetchLoading.value = false;
    }
  }

  onMounted(async () => {
    await nextTick();
    await fetchGalleryImages();
  });

  return {
    galleryImages,
    fetchLoading,
    fetchGalleryImages,
  };
}