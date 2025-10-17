export async function useWebsiteData() {
  const fetchLoading = ref(false);
  const staffMembers = ref<PtaMember[]>([]);
  const sltMembers = ref<PtaMember[]>([]);
  const galleryImages = ref<GalleryImage[]>([]);
  const resources = ref<Resource[]>([]);
  const websiteInformation = ref<WebsiteInformation[]>([]);

  async function fetchAllMembers() {
    const staffQuery = `*[_type == "staffMember"]{
      _id,
      name,
      role,
      email,
      phone,
      "profilePhotoUrl": profilePhoto.asset->url,
      memberType,
      order,
      textfield
    }`;

    try {
      const { data } = await useSanityQuery<PtaMember[]>(staffQuery);
      const [sltList, nonSlt] = (Array.isArray(data.value) ? data.value : []).reduce<[PtaMember[], PtaMember[]]>(
        (acc, m) => {
          const mt = String(m?.memberType ?? m?._type ?? m?.type ?? '').toLowerCase();
          const role = String(m?.role ?? '').toLowerCase();
          const isSlt = mt.includes('slt') || role.includes('slt');
          if (isSlt) acc[0].push(m); else acc[1].push(m);
          return acc;
        },
        [[], []]
      );

      staffMembers.value = nonSlt.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      sltMembers.value = sltList.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    } catch (err) {
      console.error('Error during members fetch:', err);
      staffMembers.value = [];
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

  fetchAllMembers();
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
    fetchAllMembers,
  };
}
