<template>
  <div v-if="store.currentTrack" class="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex items-center justify-between shadow-lg">
    <div class="flex items-center gap-4 w-1/4">
      <img :src="store.currentTrack.album.cover_small" alt="Album Art" class="w-14 h-14 rounded">
      <div>
        <h3 class="font-bold truncate">{{ store.currentTrack.title }}</h3>
        <p class="text-sm text-gray-400 truncate">{{ store.currentTrack.artist.name }}</p>
      </div>
    </div>

    <div class="flex flex-col items-center gap-2 w-1/2">
      <div class="flex items-center gap-4">
        <button @click="store.playPrevious()" class="text-white hover:text-gray-400 disabled:opacity-50" :disabled="!canGoPrevious">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M4 5h3v10H4V5zm12 0v10l-9-5 9-5z"/></svg>
        </button>
        <button @click="store.togglePlayPause()" class="text-white w-10 h-10 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600">
          <svg v-if="store.isPlaying" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z"/></svg>
          <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4l10 6-10 6V4z"/></svg>
        </button>
        <button @click="store.playNext()" class="text-white hover:text-gray-400 disabled:opacity-50" :disabled="!canGoNext">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M13 5h3v10h-3V5zM4 15l9-5-9-5v10z"/></svg>
        </button>
      </div>
      <div class="w-full flex items-center gap-2 text-xs">
        <span>{{ formatDuration(store.currentTime) }}</span>
        <div class="w-full bg-gray-600 rounded-full h-1 cursor-pointer" @click="seek">
          <div class="bg-green-500 h-1 rounded-full" :style="{ width: progressPercentage }"></div>
        </div>
        <span>{{ formatDuration(store.duration) }}</span>
      </div>
    </div>

    <div class="w-1/4 flex items-center justify-end gap-3">
      <button @click="store.toggleMute()" class="text-white hover:text-gray-400">
        <svg v-if="store.volume > 0.5" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 3.25a.75.75 0 01.75.75v12a.75.75 0 01-1.5 0V4A.75.75 0 0110 3.25zM3.75 7.5a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5zM13.75 7.5a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5z"/></svg>
        <svg v-else-if="store.volume > 0" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 3.25a.75.75 0 01.75.75v12a.75.75 0 01-1.5 0V4A.75.75 0 0110 3.25zM3.75 9a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5z"/></svg>
        <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 3.25a.75.75 0 01.75.75v12a.75.75 0 01-1.5 0V4A.75.75 0 0110 3.25zM6.22 8.22a.75.75 0 011.06 0L10 10.94l2.72-2.72a.75.75 0 111.06 1.06L11.06 12l2.72 2.72a.75.75 0 11-1.06 1.06L10 13.06l-2.72 2.72a.75.75 0 01-1.06-1.06L8.94 12 6.22 9.28a.75.75 0 010-1.06z"/></svg>
      </button>
      <input 
        type="range" 
        min="0" 
        max="1" 
        step="0.01" 
        :value="store.volume"
        @input="store.setVolume(parseFloat($event.target.value))"
        class="w-24 h-1 rounded-lg appearance-none cursor-pointer form-range bg-gray-600 focus:outline-none focus:ring-0 focus:shadow-none"
      >
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { usePlayerStore } from '../store/player';
const store = usePlayerStore();

const progressPercentage = computed(() => {
  if (store.duration === 0) return '0%';
  return `${(store.currentTime / store.duration) * 100}%`;
});

const canGoPrevious = computed(() => {
    if (!store.currentTrack || store.queue.length === 0) return false;
    const currentIndex = store.queue.findIndex(t => t.id === store.currentTrack.id);
    return currentIndex > 0;
});

const canGoNext = computed(() => {
    return store.queue.length > 1;
});

const formatDuration = (seconds) => {
  if (isNaN(seconds) || seconds === 0) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const seek = (event) => {
  const progressBar = event.currentTarget;
  const clickPosition = event.offsetX;
  const barWidth = progressBar.clientWidth;
  const seekTime = (clickPosition / barWidth) * store.duration;
  store.seek(seekTime);
};
</script>