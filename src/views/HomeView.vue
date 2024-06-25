<script setup>
const props = defineProps(["getTasks"]);
</script>

<template>
  <header class="header-background p-5 mb-4 mt-8 rounded-3 text-center animated-header-background">
    <h2><b>HELLO WELCOME TO MY PROJECT</b></h2>
  </header>
</template>

<style>
@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes moveLightning {
  0% { left: -100%; }
  50% { left: 200%; }
  100% { left: -100%; }
}

body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #809ebc !important;
  color: #343a40 !important;
}

.header-background {
  position: relative;
  width: 100vw;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px;
  margin-top: 5%;
  border-radius: 8px;
  color: #171111!important;
  background: linear-gradient(90deg, rgba(255, 159, 159, 0.619), rgba(157, 235, 255, 0.696), rgba(224, 157, 255, 0.5), rgba(142, 255, 142, 0.5), rgba(144, 144, 255, 0.5), rgba(176, 107, 226, 0.5), rgba(238, 130, 177, 0.5)) !important;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5) !important; 
  box-shadow: 0 4px 8px rgba(159, 144, 144, 0.2) !important;
  transition: transform 0.5s ease, box-shadow 0.5s ease; 
  overflow: hidden; /* Untuk memastikan elemen pseudo tidak meluap */
}

.header-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%) !important;
  animation: moveLightning 10s infinite linear;
  z-index: 1;
}

.animated-header-background {
  background-size: 400% 400%;
  animation: gradientAnimation 15s ease infinite;
}

.header-background:hover {
  transform: scale(1.05); /* Membesarkan saat hover */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2) !important; /* Bayangan lebih dalam saat hover */
}

h2 {
  margin-bottom: 20px;
  font-size: 2.5em;
  font-weight: bold;
  color: #000000 !important; /* Warna teks hitam */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5) !important; /* Bayangan teks */
  z-index: 2; /* Memastikan teks berada di atas animasi pseudo-element */
}

p {
  font-size: 1.2em;
  color: #ffffff !important; /* Warna teks putih */
  background-color: rgba(0, 0, 0, 0.5) !important; /* Latar belakang semi-transparan untuk teks */
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 2; /* Memastikan teks berada di atas animasi pseudo-element */
}

.animated-item:hover {
  transform: scale(1.1); 
}
</style>