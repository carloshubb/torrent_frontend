<template>
  <Head title='12' />
  <h1> </h1>
  <AppLayout>
        <div class="mt-5">
            <!-- First row -->
            <div class="flex gap-2 bg-gray-300 p-2 rounded">
                <a class="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
                    href="/categories/trending">
                    <i class="flaticon-trending"></i>
                    All Trending Today
                </a>
                <a class="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
                    href="/categories/trending-week">
                    <i class="flaticon-trending"></i>
                    All Trending This Week
                </a>
            </div>

            <!-- Second row -->
            <div class="flex flex-wrap gap-2 bg-gray-300 p-2 rounded">
                <a class="btn-icon" href="/trending/d/movies/"><i class="flaticon-movies"></i> Trending Movies</a>
                <a class="btn-icon" href="/trending/d/tv/"><i class="flaticon-tv"></i> Trending TV</a>
                <a class="btn-icon" href="/trending/d/games/"><i class="flaticon-games"></i> Trending Games</a>
                <a class="btn-icon" href="/trending/d/apps/"><i class="flaticon-apps"></i> Trending Apps</a>
                <a class="btn-icon" href="/trending/d/music/"><i class="flaticon-music"></i> Trending Music</a>
                <a class="btn-icon" href="/trending/d/doc/"><i class="flaticon-documentary"></i> Trending
                    Documentaries</a>
                <a class="btn-icon" href="/trending/d/anime/"><i class="flaticon-ninja-portrait"></i> Trending Anime</a>
                <a class="btn-icon" href="/trending/d/other/"><i class="flaticon-other"></i> Trending Other</a>
                <a class="btn-icon" href="/trending/d/xxx/"><i class="flaticon-xxx"></i> Trending XXX</a>
            </div>

        </div>
        <TorrentHome  v-if="Object.keys(torrents).length > 0" key="trending" :torrents="torrents" />
  </AppLayout>
</template>

<script setup>

import AppLayout from '~/layouts/AppLayout.vue';
import torrentService from '~/api/torrentService';
const config = useRuntimeConfig()
const torrents = ref({})
const head_title = "TRENDING TORRENTS LAST 24 HOURS"
const icon = "flaticon-top"
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
      const response = await torrentService.get('/torrents/type?type=trending');
      // For demo, assuming all torrents in one group with title "All Torrents"
      torrents.value = {
        icon: icon,
        title: head_title,
        data: response.data.data,
      }         
    } catch (error) {
      console.error('Failed to fetch torrents:', error)
    }


}



</script>