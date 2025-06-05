export async function useWebsiteData() {
  const fetchLoading = ref(false);
  const ptaMembers = ref<PtaMember[]>([]);
  const galleryImages = ref<GalleryImage[]>([]);
  const resources = ref<Resource[]>([]);
  const websiteInformation = ref<WebsiteInformation[]>([]);

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

  async function fetchResources() {
    const query = `*[_type == "resource"] | order(order asc) {
      _id,
      name,
      description,
      link,
      "imageUrl": image.asset->url,
      order
    }`; 

    try {
      const { data, error } = await useSanityQuery<Resource[]>(query);
      if (error?.value) {
        console.error("Error fetching resources:", error.value);
        resources.value = [];
      } else if (data?.value) {
        resources.value = data.value;
      }
    } catch (error) {
      console.error("Error during resources fetch:", error);
      resources.value = [];
    }
  }

  async function fetchWebsiteInformation() {
    const query = `*[_type == "websiteInformation"]{
      _id,
      title,
      description,
      "imageUrl": image.asset->url,
      link
    }`;
    try {
      const { data, error } = await useSanityQuery<WebsiteInformation[]>(query);
      if (error?.value) {
        throw new Error(String(error.value));
      } else if (data?.value) {
        websiteInformation.value = data.value;
        return data.value;
      }
      return [];
    } catch (error) {
      throw new Error(String(error));
    }
}

  fetchPtaMembers()
  fetchGalleryImages()
  fetchResources()
  fetchWebsiteInformation()

  return {
    ptaMembers,
    galleryImages,
    fetchLoading,
    resources,
    websiteInformation
  };
}
