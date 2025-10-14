<template>
  <div class="bg-gray-900 text-white min-h-screen flex">
    <Sidebar :is-minimized="isSidebarMinimized" @toggle="toggleSidebar" />
    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />
      <main class="flex-grow p-4 md:p-8 overflow-y-auto">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
      <MusicPlayer />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MusicPlayer from './components/MusicPlayer.vue';
import Sidebar from './components/Sidebar.vue';
import Header from './components/Header.vue';

const isSidebarMinimized = ref(false);

const toggleSidebar = () => {
  isSidebarMinimized.value = !isSidebarMinimized.value;
};
</script>
