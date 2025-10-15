export async function useWebsiteData() {
  const fetchLoading = ref(false);
  const staffMembers = ref<PtaMember[]>([]);
  const sltMembers = ref<PtaMember[]>([]);
  const galleryImages = ref<GalleryImage[]>([]);
  const resources = ref<Resource[]>([]);
  const websiteInformation = ref<WebsiteInformation[]>([]);

  async function fetchStaffMembers() {
    const query = `*[_type == "staffMember"]{
      _id,
      name,
      role,
      email,
      phone,
      "profilePhotoUrl": profilePhoto.asset->url,
      order,
      textfield,
    }`;

    try {
      const { data, error } = await useSanityQuery<PtaMember[]>(query);
      if (error.value) {
        console.error("Error fetching staff members:", error.value);
        staffMembers.value = [];
      } else if (data.value) {
        staffMembers.value = data.value;
      }
    } catch (error) {
      console.error("Error during staff members fetch:", error);
      staffMembers.value = [];
    }
  }

  async function fetchSLTMembers() {
    const query = `*[_type == "sltMember"]{
      _id,
      name,
      role,
      email,
      phone,
      "profilePhotoUrl": profilePhoto.asset->url,
      order
    }`;

    try {
      const { data, error } = await useSanityQuery<PtaMember[]>(query);
      if (error.value) {
        console.error("Error fetching staff members:", error.value);
        sltMembers.value = [];
      } else if (data.value) {
        sltMembers.value = data.value;
      }
    } catch (error) {
      console.error("Error during staff members fetch:", error);
      sltMembers.value = [];
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
      alt,
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
      link,
      footerDonateButtonText
    }`;
    try {
      const { data, error } = await useSanityQuery<WebsiteInformation[]>(query);
      console.log(data);
      if (error?.value) {
        throw new Error(String(error.value));
      } else if (data?.value) {
        websiteInformation.value = data.value;
        return data.value;
      }
    } catch (error) {
      throw new Error(String(error));
    }
  }

  fetchStaffMembers();
  fetchSLTMembers();
  fetchGalleryImages();
  fetchResources();
  fetchWebsiteInformation();

  return {
    staffMembers,
    sltMembers,
    galleryImages,
    fetchLoading,
    resources,
    websiteInformation,
  };
}
