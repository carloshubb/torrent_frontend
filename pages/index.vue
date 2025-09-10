<template>

  <Head title='12' />
  <h1> </h1>
  <AppLayout>
    <TorrentHead v-if="home_images.length > 0" :images="home_images" />
    <TorrentHome v-for="(torrents, index) in home_torrents" :key="index" :torrents="torrents" />
  </AppLayout>
</template>

<script setup>

import AppLayout from '~/layouts/AppLayout.vue';
import TorrentHead from '~/components/TorrentHead.vue';
import TorrentHome from '~/components/TorrentHome.vue';
import torrentService from '~/api/torrentService';
const config = useRuntimeConfig()
const home_images = ref([])
const home_torrents = ref([])
const home_torrent_list = [
  { slug: 'most_popular', title: 'Most Popular Torrents this week', icon: 'flaticon-top' },
  { slug: 'popular_movie', title: 'Popular Movie Torrents', icon: 'flaticon-movies' },
  { slug: 'popular_tv', title: 'Popular TV Torrents', icon: 'flaticon-tv' },
  { slug: 'popular_music', title: 'Popular Music Torrents', icon: 'flaticon-music' },
  { slug: 'popular_foreignmovie', title: 'Popular Foreign Movie Torrents', icon: 'flaticon-movies' },
  { slug: 'popular_application', title: 'Popular Application Torrents', icon: 'flaticon-apps' },
  { slug: 'popular_game', title: 'Popular Game Torrents', icon: 'flaticon-games' },
  { slug: 'popular_other', title: 'Popular Other Torrents', icon: 'flaticon-other' },
]
// SEO and meta tags
useHead({
  title: '1331x - Ultimate Torrent Hub',
  meta: [
    { name: 'description', content: 'Your ultimate destination for high-quality torrents and streaming content' }
  ]
})
onMounted(() => {
  fetchHomePageImage();
  fetchHomePopularTorrents();
});
async function fetchHomePageImage() {
  try {
    const response = await torrentService.get(`/torrents/type?type=homeimage`);
    home_images.value.push({
      title: 'images',
      data: response.data,
    })
  } catch (error) {
    console.error('Failed to fetch torrents:', error);
  }
}
// Fetch function to get torrent data and update dashboard_data
async function fetchHomePopularTorrents() {
  home_torrent_list.forEach(async item => {
    try {
      const response = await torrentService.get('/torrents/type?type=' + item.slug);
      // For demo, assuming all torrents in one group with title "All Torrents"
      home_torrents.value.push({
        icon: item.icon,
        title: item.title,
        data: response.data.data,      
      })
    } catch (error) {
      console.error('Failed to fetch torrents:', error)
    }

  });
 

}



</script>