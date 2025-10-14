import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    currentTrack: null,
    isPlaying: false,
    audio: null,
    queue: [],
    currentTime: 0,
    duration: 0,
    volume: 1, // Add volume state (0 to 1)
    previousVolume: 1, // To restore volume after unmuting
  }),

  actions: {
    playSong(track, trackList = []) {
      if (this.audio && this.currentTrack?.id !== track.id) {
        this.audio.pause();
        this.isPlaying = false;
        this.audio.removeEventListener('timeupdate', this.updateProgress);
        this.audio.removeEventListener('loadedmetadata', this.updateDuration);
        this.audio.removeEventListener('ended', this.playNext);
      }

      this.currentTrack = track;
      this.setQueue(trackList, track);

      if (!this.audio || this.audio.src !== track.preview) {
         this.audio = new Audio(track.preview);
         this.audio.volume = this.volume; // Set volume on new audio
      }
      
      this.audio.play();
      this.isPlaying = true;

      this.audio.addEventListener('timeupdate', this.updateProgress);
      this.audio.addEventListener('loadedmetadata', this.updateDuration);
      this.audio.addEventListener('ended', this.playNext);
    },

    togglePlayPause() {
      if (!this.audio) return;

      if (this.isPlaying) {
        this.audio.pause();
      } else {
        this.audio.play();
      }
      this.isPlaying = !this.isPlaying;
    },
    
    setQueue(tracks, startTrack) {
      this.queue = tracks;
      // If a start track is provided, find its index and rearrange queue
      const startIndex = this.queue.findIndex(t => t.id === startTrack.id);
      if (startIndex > -1) {
        // No need to slice and concat, we can just play from the index
      }
    },

    playNext() {
      if (!this.currentTrack) return;
      const currentIndex = this.queue.findIndex(t => t.id === this.currentTrack.id);
      const nextIndex = (currentIndex + 1) % this.queue.length;
      if (currentIndex !== -1 && this.queue.length > 0) {
        this.playSong(this.queue[nextIndex], this.queue);
      }
    },

    playPrevious() {
      if (!this.currentTrack) return;
      const currentIndex = this.queue.findIndex(t => t.id === this.currentTrack.id);
      if (currentIndex > 0) { // Only go back if not the first track
        const prevIndex = currentIndex - 1;
        this.playSong(this.queue[prevIndex], this.queue);
      }
    },

    updateProgress() {
      this.currentTime = this.audio.currentTime;
    },

    updateDuration() {
      this.duration = this.audio.duration;
    },

    seek(time) {
      if (this.audio) {
        this.audio.currentTime = time;
      }
    },

    setVolume(level) {
      this.volume = level;
      if (this.audio) {
        this.audio.volume = this.volume;
      }
      if (level > 0) {
        this.previousVolume = level;
      }
    },

    toggleMute() {
      if (this.volume > 0) {
        this.setVolume(0);
      } else {
        this.setVolume(this.previousVolume);
      }
    },
  }
})