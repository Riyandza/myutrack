<template>
  <div>
    <h1 class="text-4xl font-bold mb-6">Explore</h1>

    <!-- New Releases Section -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">New Releases</h2>
      <div v-if="newReleases.length" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div v-for="album in newReleases" :key="album.id" class="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 cursor-pointer transition-all duration-300">
          <img :src="album.cover_medium" alt="Album Art" class="w-full rounded mb-2" @click="viewAlbum(album.id)">
          <h3 class="font-semibold truncate">{{ album.title }}</h3>
          <router-link :to="`/artist/${album.artist.id}`" @click.stop class="text-sm text-gray-400 truncate hover:underline">{{ album.artist.name }}</router-link>
        </div>
      </div>
      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <TrackCardSkeleton v-for="n in 5" :key="n" />
      </div>
    </section>

    <!-- Top Tracks Section -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">Top Tracks</h2>
      <div v-if="topTracks.length" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div v-for="track in topTracks" :key="track.id" @click="play(track)" class="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 cursor-pointer transition-all duration-300" :class="{ 'bg-green-500 bg-opacity-20': playerStore.currentTrack?.id === track.id }">
          <img :src="track.album.cover_medium" alt="Album Art" class="w-full rounded mb-2">
          <h3 class="font-semibold truncate" :class="{ 'text-green-400': playerStore.currentTrack?.id === track.id }">{{ track.title }}</h3>
          <router-link :to="`/artist/${track.artist.id}`" @click.stop class="text-sm text-gray-400 truncate hover:underline">{{ track.artist.name }}</router-link>
        </div>
      </div>
      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <TrackCardSkeleton v-for="n in 10" :key="n" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getNewReleases, getTopTracks } from '../api/deezer';
import { usePlayerStore } from '../store/player';
import TrackCardSkeleton from '../components/TrackCardSkeleton.vue';

const newReleases = ref([]);
const topTracks = ref([]);
const playerStore = usePlayerStore();
const router = useRouter();

const fetchData = async () => {
  try {
    const [releasesResponse, tracksResponse] = await Promise.all([
      getNewReleases(),
      getTopTracks()
    ]);
    newReleases.value = releasesResponse.data.data;
    topTracks.value = tracksResponse.data.data;
  } catch (error) {
    console.error("Error fetching explore data:", error);
  }
};

const play = (track) => {
  // Pass the list of top tracks to set the queue
  playerStore.playSong(track, topTracks.value);
};

const viewAlbum = (albumId) => {
  router.push({ name: 'albumDetail', params: { id: albumId } });
};

onMounted(() => {
  fetchData();
});
</script>
