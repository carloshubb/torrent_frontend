<template>
    <div class="px-2 md:px-0">
        <div class="featured-list bg-gray-800 rounded-lg overflow-hidden shadow-xl mt-5">
            <div class="featured-heading bg-gradient-to-r from-orange-400 to-red-500 px-4 py-3 flex items-center">
                <h2 class="text-white font-bold">
                    <span class="featured-icon">
                        <i :class=icon></i>
                    </span>
                    {{ head_title }}
                </h2>
            </div>
            <div class="overflow-x-auto">
                <table class="min-w-full">
                    <thead class="bg-gray-700">
                        <tr v-if="torrents.length == 0">
                            <td colspan="6" class="text-center py-4 text-gray-500">No torrents found</td>
                        </tr>
                        <tr v-if="torrents.length > 0">
                            <th class="text-left px-4 py-1 text-gray-300 font-semibold">name</th>
                            <th class="hidden md:table-cell text-center px-4 py-1 text-gray-300 font-semibold">se
                            </th>
                            <th class="hidden md:table-cell text-center px-4 py-1 text-gray-300 font-semibold">le
                            </th>
                            <th class="hidden md:table-cell text-center px-4 py-1 text-gray-300 font-semibold">time
                            </th>
                            <th class="hidden md:table-cell text-center px-4 py-1 text-gray-300 font-semibold">size
                            </th>
                            <th class="text-center px-4 py-1 text-gray-300 font-semibold">uploader</th>
                            <th v-if="isLoggedIn" class="text-center px-4 py-1 text-gray-300 font-semibold">edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(torrent, index) in torrents" :key="index"
                            class="border-b border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer text-xs">
                            <td class="px-2 py-3">
                                <div class="flex items-center justify-between ">
                                    <!-- Left side: icon + name -->
                                    <div class="flex items-center">
                                        <a :href="`/sub/${torrent.subcategory_id}/1/`">
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
                            <td class="text-center px-2 py-2">
                                <a :href="`${torrent.uploader}1`">
                                    <span class="text-orange-400 hover:text-orange-300 transition-colors">
                                        {{ torrent.uploader?.split('/')[2] }}
                                    </span>
                                </a>
                            </td>

                            <td v-if="isLoggedIn" class="text-center px-2 py-2 text-gray-400 hidden md:table-cell"
                                @click="editTorrent(torrent, 0)">
                                <button>✏️</button>
                            </td>

                        </tr>
                    </tbody>
                </table>


            </div>
        </div>
    </div>
</template>

<script setup>
// Props: receive posters + optional visibleCount
const props = defineProps({
    torrents: {
        type: Object,
        required: true,
    },
    flag_edit : Boolean,
});

const head_title = props.torrents.title;
const icon = props.torrents.icon || 'flaticon-movies'; // Default icon if not provided
const torrents = props.torrents.data;
const isLoggedIn = ref(false)
const flag_edit = ref(props.flag_edit ?? false)
import { useRouter } from 'vue-router'
const router = useRouter()

const formatApprovedAt = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

const editTorrent = (item, flag) => {  
    let idd = 0;
    if (flag_edit.value == true) {
        idd = item.id;     
        router.push(`/edit/${idd}`);
    }
    else {
        idd = item.torrent_link.split('/') ? item.torrent_link.split('/')[2] : null;

        router.push(`/edit/${idd}`);

    }

};
onMounted(() => {
    const token = localStorage.getItem('token')
    isLoggedIn.value = !!token


});
</script>
<style scoped>
.bg-gray-750 {
    background-color: rgba(55, 65, 81, 0.5);
}

.btn-icon {
    display: inline-flex;
    /* keeps icon + text aligned */
    align-items: center;
    /* vertical center */
    justify-content: center;
    /* horizontal center */
    gap: 0.5rem;
    /* space between icon and text */
    background-color: #e65100;
    /* orange background */
    color: white;
    /* text color */
    padding: 0.25rem 0.75rem;
    /* vertical / horizontal padding */
    border-radius: 0.25rem;
    /* rounded corners */
    cursor: pointer;
    /* pointer on hover */
    font-size: 14px;
    /* text size */
    text-align: center;
    /* centers text if wrapped */
    border: none;
    /* remove default button border */
}

.btn-icon:hover {
    background-color: #bf360c;
    /* darker orange on hover */
}


.btn-icon-tr {
    display: inline-flex;
    /* keeps icon + text aligned */
    align-items: center;
    /* vertical center */
    justify-content: center;
    /* horizontal center */
    gap: 0.5rem;
    /* space between icon and text */
    /* background-color: #e65100; */
    /* orange background */
    color: white;
    /* text color */
    padding: 0.45rem 0.25rem;
    /* vertical / horizontal padding */
    border-radius: 0.25rem;
    /* rounded corners */
    cursor: pointer;
    /* pointer on hover */
    font-size: 22px;
    /* text size */
    text-align: center;
    /* centers text if wrapped */
    border: none;
    /* remove default button border */
    margin-right: 10px;
}

.btn-icon-tr:hover {
    text-decoration: underline;
    /* darker orange on hover */
}

/*  */
.featured-list .featured-heading {
    line-height: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
}

.featured-heading {
    background-color: #d1d1d1;
    border-radius: 4px 4px 0 0;
    padding: 0 13px 0 68px;
    position: relative;
}


.featured-icon {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 50px;
    padding: 0 10px;
    display: block;
    color: #fff;
    border-top-left-radius: 3px;
    background-color: #d63600;
}

.featured-icon:after {
    position: absolute;
    right: -8px;
    top: 50%;
    content: "";
    height: 0;
    width: 0;
    margin-top: -8px;
    border-bottom: 8px solid transparent;
    border-left: 8px solid #d63600;
    border-top: 8px solid transparent;
}

.featured-heading .featured-icon i {
    left: 50%;
    margin-left: -12px;
    margin-top: -12px;
    position: absolute;
    top: 50%;
    line-height: 1;
    font-size: 22px;
}
</style>
