<template>
  <!-- Top Bar -->
  <div class="grid grid-cols-6 gap-4  min-h-[40px]  bg-[#000] border-b-4 border-[#822a0b]">
    <div class="col-span-4 col-start-2 text-right inline-block mt-2">
      <a href="/login" v-if="!isLoggedIn" class="title text-red-600 hover:text-red-600">Login</a>
      <a v-if="isLoggedIn" class="title text-white hover:text-red-600 ml-1 mr-1" href="/uploads">Uploads |</a>
      <button v-if="isLoggedIn" class="title text-white hover:text-red-600  ml-1 mr-1"
        @click="handleLogout">Logout</button>
    </div>
  </div>

  <div class="grid grid-cols-6 bg-gray-800 backdrop-blur-sm border-b border-orange-500/50 
            divide-y divide-gray-700"> <!-- optional divider -->
    <div class="col-span-4 col-start-2 space-y-6 py-6">
      <!-- Logo + Search -->
      <div class="flex items-center justify-between">
        <div class="logo text-4xl font-bold text-white">
          1331<span class="text-orange-500">X</span>
        </div>
        <div class="relative w-full md:w-96">
          <input type="text" placeholder="Search for torrents..." v-model="searchQuery" @keyup.enter="handleSearch"
            class="block w-full focus:outline-none bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded focus:border-orange-500" />
          <i class="flaticon-search absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500"></i>
        </div>
      </div>

      <!-- Navbar -->
      <header>
        <nav class="hidden md:flex justify-between gap-3">
          <a v-for="(tab, index) in navTabs" :key="index" :href="tab.slug" :class="[
            'flex-1 px-10 py-3 transition-colors text-center',
            index === 0
              ? 'bg-gray-700 text-white border-l-4 border-orange-100 hover:bg-black'
              : 'bg-orange-600 text-white hover:bg-gray-700'
          ]">
            {{ tab.title }}
          </a>
        </nav>

        <!-- Mobile Menu Button -->
        <button class="md:hidden mt-3" @click="isMenuOpen = !isMenuOpen">☰</button>
      </header>
    </div>
  </div>

  <!-- Mobile Nav -->
  <nav v-if="isMenuOpen" class="md:hidden bg-gray-800 text-white px-4 py-2 space-y-2">
    <a v-for="(tab, index) in navTabs" :key="index" :href=tab.slug class="block">{{ tab.title }}</a>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { usePage } from '@inertiajs/vue3'
const { user, logout } = useAuth();
const isMenuOpen = ref(false);
const searchQuery = ref(""); // <-- define searchQuery
const page = usePage()
const isLoggedIn = ref(false)
import { useRouter } from 'vue-router'
const router = useRouter()
// Methods
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push("/search/" + searchQuery.value + "/1/");
  }
}
const handleLogout = () => {
  logout();
  router.push('/')
};
onMounted(() => {
  const token = localStorage.getItem('token')
  isLoggedIn.value = !!token


});

// const logout = async () => {
//   try {
//     const response = await fetch('/logout', {
//       method: 'POST',
//       headers: {
//         'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
//         'Content-Type': 'application/json'
//       }
//     });
//     router.push("/";
//   } catch (error) {
//     console.error('Logout failed:', error);
//   }
// };
const navTabs = [{ title: 'HOME', slug: "/" },
{ title: 'UPLOAD', slug: "/upload" },
{ title: 'RULES', slug: "/rules" },
{ title: 'CONTACT', slug: "/contact" },
{ title: 'ABOUT US', slug: "/about" }];

</script>