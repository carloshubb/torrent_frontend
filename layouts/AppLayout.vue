<!-- layouts/default.vue -->
<template>
  <div class="flex flex-col min-h-screen  bg-gradient-to-r from-gray-300 to-gray-700 text-white">
    <!-- Header -->
    <Header />
    <!-- Main Layout -->
    <div class="grid grid-cols-6">

      <!-- LeftSpace -->
      <LeftSpace class="col-start-1"/>
      <div class="col-span-4 col-start-2">

        <div class="grid grid-cols-1 md:grid-cols-12 flex-1">
          <!-- Content -->
          <main class="md:col-span-10 mr-3">
            <slot />
          </main>

          <!-- Sidebar -->
          <Sidebar />
        </div>
        
      </div>

      <!-- RightSpace -->
        <RightSpace class="col-end-7"/>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
// Components are auto-imported in Nuxt 3
import Header from '~/components/layout/Header.vue';
import Sidebar from '~/components/layout/Sidebar.vue';
import Footer from '~/components/layout/Footer.vue';
import LeftSpace from '~/components/layout/LeftSpace.vue';
import RightSpace from '~/components/layout/RightSpace.vue';

import { ref } from "vue";

const isMenuOpen = ref(false);
</script>