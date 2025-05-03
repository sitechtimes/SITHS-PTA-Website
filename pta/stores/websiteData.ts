export function usePtaMemberStore() {
  const fetchLoading = ref(false);
  const ptaMembers = ref<PtaMember[]>([]);

  async function fetchPtaMembers() {
    if (ptaMembers.value.length > 0 || fetchLoading.value) return;

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

  onMounted(async () => {
    await nextTick();
    await fetchPtaMembers();
  });

  return {
    ptaMembers,
    fetchLoading,
    fetchPtaMembers,
  };
}
