<script setup>
import AppLayout from '~/layouts/AppLayout.vue'
import TorrentPagination from '~/components/TorrentPagination.vue'
import torrentService from '~/api/torrentService'
import dayjs from 'dayjs'
// some data in parent
const torrents = ref([])
const userInfo = ref({})
const currentPage = ref(1)
const lastPage = ref(1)
const route = useRoute()
const user_id = route.params.user
const page = route.params.page
const getAge = (birthdayString) => {
    const birthday = dayjs(birthdayString);
    if (!birthday.isValid()) return null;
    return dayjs().diff(birthday, 'year'); // difference in years
};


// Fetch data from API
const fetchTorrentDetails = async () => {
  try {
    const response = await torrentService.get(`/user/${user_id}/${page}`); 
    torrents.value = response.data.torrents.data // Assign to ref
    userInfo.value = response.data.info // Assign to ref
    currentPage.value = response.data.torrents.current_page
    lastPage.value = response.data.torrents.last_page
  } catch (error) {
    console.error('Error fetching torrent details:', error);
  }
};
//const torrents = props.data.torrent.data
// Run fetch on component mount
onMounted(() => {
    fetchTorrentDetails()

})
</script>
<template>

    <Head title='' />
    <AppLayout>
        <div class="flex-1 mt-5" v-if="userInfo">
            <!-- Title -->
            <div class="bg-gray-700 px-4 py-2 mb-4 rounded">
                <h1 class="text-lg font-semibold">{{ userInfo.username }}</h1>
            </div>

            <!-- Torrent Info -->
            <div class="bg-gray-800 rounded mb-4">
                <div class="grid grid-cols-2 gap-4 p-4 text-sm">
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span class="text-gray-400">Username:</span>
                            <span>{{ userInfo.username }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-400">User Rank:</span>
                            <span>{{ userInfo.rank }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-400">Privacy:</span>
                            <span>{{ userInfo.privacy }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-400">Join Date:</span>
                            <span>{{ formatApprovedAt(userInfo.joindate) }}</span>
                        </div>

                    </div>
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span class="text-gray-400">Age:</span>
                            <span>{{ getAge(userInfo.birthday) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-400">Gender:</span>
                            <span>{{ userInfo.gender }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-400">Country:</span>
                            <span>{{ userInfo.country }}</span>
                        </div>

                    </div>
                </div>


            </div>
        </div>
        <div class="px-2 md:px-0">
            <!-- Popular Torrents Section -->
            <div class="featured-list bg-gray-800 rounded-lg overflow-hidden shadow-xl mt-6">


                <div class="overflow-x-auto">
                    <table class="min-w-full">
                        <thead class="bg-gray-700">
                            <tr>
                                <th class="text-left px-4 py-1 text-gray-300 font-semibold">name</th>
                                <th class="hidden md:table-cell text-center px-4 py-1 text-gray-300 font-semibold">se
                                </th>
                                <th class="hidden md:table-cell text-center px-4 py-1 text-gray-300 font-semibold">le
                                </th>
                                <th class="hidden md:table-cell text-center px-4 py-1 text-gray-300 font-semibold">time
                                </th>
                                <th class="hidden md:table-cell text-center px-4 py-1 text-gray-300 font-semibold">size
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="torrents.length > 0" v-for="(torrent, index) in torrents" :key="index"
                                class="border-b border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer text-xs">
                                <td class="px-2 py-3" v-if="page_type != 'top' && page_type != 'trending'">
                                    <div class="flex items-center justify-between ">
                                        <!-- Left side: icon + name -->
                                        <div class="flex items-center">
                                            <a :href="`/sub/${torrent.subcategory_id}/0/`">
                                                <button class="" v-if="torrent.subcategory"><i
                                                        :class="`${torrent.subcategory.icon}`"></i></button>
                                            </a>
                                            <a :href="`/torrent/${torrent.id}/${torrent.slug}/`"
                                                class="text-gray-300 hover:text-orange-400 transition-colors ml-3">
                                                {{ torrent.name }}
                                            </a>
                                        </div>

                                        <!-- Right side: badge -->
                                        <span v-if="torrent.comments_count"
                                            class="bg-gray-500 text-black-900 rounded text-xs font-semibold px-2">
                                            {{ torrent.comments_count }}
                                        </span>
                                    </div>
                                </td>

                                <td class="px-2 py-3" v-if="page_type == 'top' || page_type == 'trending'">
                                    <div class="flex items-center justify-between ">
                                        <!-- Left side: icon + name -->
                                        <div class="flex items-center">
                                            <a :href="`/sub/${torrent.subcategory_id}/0/`">
                                                <button class="" v-if="torrent.subcategory"><i
                                                        :class="`${torrent.subcategory.icon}`"></i></button>
                                            </a>
                                            <a :href="`${torrent.torrent_link}`"
                                                class="text-gray-300 hover:text-orange-400 transition-colors ml-3">
                                                {{ torrent.name }}
                                            </a>
                                        </div>

                                        <!-- Right side: badge -->
                                        <span v-if="torrent.comments_count"
                                            class="bg-gray-500 text-black-900 rounded text-xs font-semibold px-2">
                                            {{ torrent.comments_count }}
                                        </span>
                                    </div>
                                </td>
                                <td class="text-center px-2 py-2 hidden md:table-cell">
                                    <span class="bg-green-600 text-white px-1 text-xs rounded ">
                                        {{ torrent.seeders }}
                                    </span>
                                </td>
                                <td class="text-center px-2 py-2 hidden md:table-cell">
                                    <span class="bg-red-800 text-white px-1 text-xs rounded ">
                                        {{ torrent.leechers }}
                                    </span>
                                </td>
                                <td class="text-center px-2 py-2 text-gray-400 hidden md:table-cell">
                                    {{ formatApprovedAt(torrent.approved_at) }}
                                </td>
                                <td class="text-center px-2 py-2 text-gray-400 hidden md:table-cell">
                                    {{ torrent.size_formatted }}
                                </td>

                            </tr>
                        </tbody>
                    </table>

                    <!-- Pagination component -->
                    <TorrentPagination :currentPage="currentPage" :lastPage="lastPage" @page-changed="onPageChange" />
                </div>
            </div>
        </div>
    </AppLayout>
</template>
