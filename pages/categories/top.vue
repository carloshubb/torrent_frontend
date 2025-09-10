
<template>

    <Head title="Trending Torrents" />
    <AppLayout>
        <div class="space-y-4  mt-5">

            <!-- Second row -->
            <div class="flex flex-wrap gap-2 bg-gray-300 p-2 rounded">
                <a class="btn-icon" href="/top/movies"><i class="flaticon-movies"></i> Top 100 Movies</a>
                <a class="btn-icon" href="/top/tv"><i class="flaticon-tv"></i> Top 100 TV</a>
                <a class="btn-icon" href="/top/games"><i class="flaticon-games"></i> Top 100 Games</a>
                <a class="btn-icon" href="/top/apps"><i class="flaticon-apps"></i> Top 100 Apps</a>
                <a class="btn-icon" href="/top/music"><i class="flaticon-music"></i> Top 100 Music</a>
                <a class="btn-icon" href="/top/doc"><i class="flaticon-documentary"></i> Top 100
                    Documentaries</a>
                <a class="btn-icon" href="/top/anime"><i class="flaticon-ninja-portrait"></i> Top 100 Anime</a>
                <a class="btn-icon" href="/top/other"><i class="flaticon-other"></i> Top 100 Other</a>
                <a class="btn-icon" href="/top/xxx"><i class="flaticon-xxx"></i> Top 100 XXX</a>
            </div>

        </div>
        <TorrentHome  v-if="Object.keys(torrents).length > 0" key="trending" :torrents="torrents" />
    </AppLayout>
</template>

<script setup>
import AppLayout from '~/layouts/AppLayout.vue'; 
import torrentService from '~/api/torrentService';
const torrents = ref({})
const head_title = ref('TOP 100 TORRENTS')
const icon = ref('flaticon-top')
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
      const response = await torrentService.get('/torrents/type?type=top');
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
