export async function useWebsiteData() {
  const fetchLoading = ref(false);
  const staffMembers = ref<PtaMember[]>([]);
  const sltMembers = ref<PtaMember[]>([]);
  const galleryImages = ref<GalleryImage[]>([]);
  const resources = ref<Resource[]>([]);
  const websiteInformation = ref<WebsiteInformation[]>([]);

  // Fetch both staffMember and sltMember documents in one function and populate both refs.
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

    const sltQuery = `*[_type == "sltMember"]{
      _id,
      name,
      role,
      email,
      phone,
      "profilePhotoUrl": profilePhoto.asset->url,
      order
    }`;

    try {
      const [{ data: staffData, error: staffError }, { data: sltData, error: sltError }] = await Promise.all([
        useSanityQuery<PtaMember[]>(staffQuery),
        useSanityQuery<PtaMember[]>(sltQuery),
      ]);

      if (staffError?.value) {
        console.error('Error fetching staffMember docs:', staffError.value);
        staffMembers.value = [];
      } else if (staffData?.value) {
        staffMembers.value = staffData.value;
      } else {
        staffMembers.value = [];
      }

      // Build sltMembers from two sources: those embedded in staffMember (memberType) and standalone sltMember docs
      const results: PtaMember[] = [];

      if (Array.isArray(staffMembers.value) && staffMembers.value.length) {
        results.push(...staffMembers.value.filter((m) => {
          const mt = (m && (m.memberType || m._type || m.type) || '').toString().toLowerCase();
          const role = (m && m.role || '').toString().toLowerCase();
          return mt === 'slt' || mt === 'sltmember' || role.includes('slt');
        }));
      }

      if (sltError?.value) {
        console.error('Error fetching sltMember docs:', sltError.value);
      } else if (sltData?.value) {
        results.push(...sltData.value);
      }

      // Dedupe by _id and sort
      const seen = new Set<string>();
      sltMembers.value = results.filter((r) => {
        if (!r || !r._id) return false;
        if (seen.has(r._id)) return false;
        seen.add(r._id);
        return true;
      }).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    } catch (error) {
      console.error('Error during members fetch:', error);
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
