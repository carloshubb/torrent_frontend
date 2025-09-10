<template>

    <Head title="Trending Torrents" />
    <AppLayout>
        <TorrentHome v-if="Object.keys(torrents).length > 0" key="trending" :torrents="torrents" :flag_edit=true />
        <TorrentPagination v-if="lastPage > 1" :currentPage="currentPage" :lastPage="lastPage" @page-changed="onPageChange" />
    </AppLayout>
</template>

<script setup>

import AppLayout from '~/layouts/AppLayout.vue';
import TorrentPagination from '~/components/TorrentPagination.vue';
import torrentService from '~/api/torrentService';
const config = useRuntimeConfig()
const torrents = ref({})
const head_title = ref('')
const icon = "flaticon-top"
const route = useRoute()
const category = route.params.category
const topLinks = ref([]);
const page = route.params.page
const currentPage = ref(1);
const lastPage = ref(1);
// SEO and meta tags
useHead({
    title: '1331x - Ultimate Torrent Hub',
    meta: [
        { name: 'description', content: 'Your ultimate destination for high-quality torrents and streaming content' }
    ]
})
onMounted(() => {
    fetchTorrents();
});
// Fetch function to get torrent data and update dashboard_data
async function fetchTorrents() {
    try {
        const response = await torrentService.get(`/torrents/type?type=subcategory&sub_cat=${category}&page=${page}`);
        // For demo, assuming all torrents in one group with title "All Torrents"
               
        if (response?.data?.data?.data.length > 0) {
            currentPage.value = response.data.data.current_page
            lastPage.value = response.data.data.last_page
            head_title.value = response.data.data.data[0].subcategory.name + ' Torrents download list'
        }
        torrents.value = {
            icon: icon,
            title: head_title,
            data: response.data.data.data,
        }

    } catch (error) {
        console.error('Failed to fetch torrents:', error)
    }


}



</script>