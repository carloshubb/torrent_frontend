<script setup>
import AppLayout from '~/layouts/AppLayout.vue';
import TorrentPagination from '~/components/TorrentPagination.vue';
import torrentService from '~/api/torrentService';
import TorrentHome from '~/components/TorrentHome.vue';

const route = useRoute()
const keyword = route.params.key
const page = route.params.page

const torrents = ref({})
const head_title = ref([])
const topLinks = ref([]);
const currentPage = ref([]);
const lastPage = ref([]);

// Fetch function to get torrent data and update dashboard_data
async function fetchTorrents() {
  
    try {
      const response = await torrentService.get(`/torrents/type?type=search&search=${keyword}&page=${page}`);
      // For demo, assuming all torrents in one group with title "All Torrents"
      if (response?.data?.data?.data.length > 0) {
            currentPage.value = response.data.data.current_page
            lastPage.value = response.data.data.last_page
            
        }
      torrents.value = {
        icon: 'flaticon-top',
        title: `Searching for: ${keyword}`,
        data: response.data.data.data,      
      }
    } catch (error) {
      console.error('Failed to fetch torrents:', error)
    }


}
onMounted(() => {
   fetchTorrents()     
});

</script>
<template>

    <Head title="Trending Torrents" />
    <AppLayout>
      <TorrentHome v-if="Object.keys(torrents).length > 0" key="searching" :torrents="torrents" :flag_edit=true />
      <TorrentPagination :currentPage="currentPage" :lastPage="lastPage" @page-changed="onPageChange" />
    </AppLayout>
</template>
