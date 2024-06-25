<template>
  <div class="album-detail">
    <h1>{{ albumTitle }}</h1>
    <div class="photos-grid">
      <div
        class="photo-container"
        v-for="(photo, index) in photos"
        :key="index"
        @click="showPhoto(photo.url)"
      >
        <img :src="photo.thumbnailUrl" :alt="photo.title" />
        <div class="overlay">
          <span>{{ photo.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAlbumsStore } from '../stores/album';
import { usePhotosStore } from '../stores/photo';

export default defineComponent({
  setup() {
    const route = useRoute();
    const albumTitle = ref('');
    const photos = ref([]);
    const albumsStore = useAlbumsStore();
    const photosStore = usePhotosStore();

    onMounted(async () => {
      const albumId = route.params.id;
      await photosStore.fetchPhotos(albumId);
      photos.value = photosStore.photos;
      albumTitle.value = albumsStore.albums.find(album => album.id == albumId)?.title;
    });

    const showPhoto = (url) => {
      window.open(url);
    };

    return {
      albumTitle,
      photos,
      showPhoto,
    };
  },
});
</script>

<style scoped>
/* Global Styles */
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f8f9fa !important;
  color: #343a40 !important;
}

.container {
  margin: 0;
  padding: 20px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #333  !important;
}

/* Album Detail Styles */
.album-detail {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background-color: #cdd5e0!important ;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1) !important;
  text-align: center;
}

.album-detail h1 {
  font-size: 2.5rem;
  color: #333 !important;
  margin-bottom: 20px;
  font-weight: bold;
}

/* Photos Grid Styles */
.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.photo-container {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.photo-container:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2) !important;
}

.photo-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5) !important;
  color: rgb(255, 255, 255) !important;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.photo-container:hover .overlay {
  opacity: 1;
}

.overlay span {
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  padding: 8px 12px;
}
</style>
