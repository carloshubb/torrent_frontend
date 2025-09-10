<script setup>
import AppLayout from '~/layouts/AppLayout.vue';
import TorrentAdminUpload from '~/components/TorrentAdminUpload.vue';
import torrentService from '~/api/torrentService';
import { useRouter } from 'vue-router'
const router = useRouter()
const categories = ref([]);
const isLoggedIn = ref(false)
// Fetch function to get torrent data and update dashboard_data
async function fetchCategoryData() {
  try {
    const response = await torrentService.get('/torrents/categorydata');
    // For demo, assuming all torrents in one group with title "All Torrents"
    //dashboard_data.splice(0) // clear previous data
    categories.value = response.data.data;
  } catch (error) {
    console.error('Failed to fetch torrents:', error)
  }
}

onMounted(() => {
  const token = localStorage.getItem('token')
  isLoggedIn.value = !!token
  if(isLoggedIn.value == false) router.push('/login')
  fetchCategoryData();
  
});
</script>
<template>

  <AppLayout> 
     <TorrentAdminUpload  v-if="categories.length > 0" :categories = "categories"/>    
  </AppLayout>
   
</template>
