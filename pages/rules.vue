<script setup>
import AppLayout from '~/layouts/AppLayout.vue'
import TorrentRules from '~/components/TorrentRules.vue'
import { reactive } from 'vue'


</script>
<template>
  <Head :title="'Torrent Rules'" />
  <AppLayout> 
     <TorrentRules/>
    
  </AppLayout>
   
</template>
