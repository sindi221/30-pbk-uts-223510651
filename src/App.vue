<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'

const goToHome = () => {
  alert("Ini adalah tombol home");
}

const goToAbout = () => {
  alert("Ini adalah tombol about");
}

</script>

<template>
  <div class="container">
    <img alt="Vue logo" class="logo" src="./assets/PAGE.SINDY-removebg-preview.png" width="400" height="400" />

    <div class="content">
      <HelloWorld msg="You did it!" />
      <p class="about">Halo teman, nama saya Sindi. Saya berasal dari Tapung Hilir. 😘</p>
    </div>
    <br><br>

    <nav>
      <ul>
        
      </ul>
    </nav>
    <br><br>

    <TheWelcome/>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.logo {
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  margin: auto; 
}

.content {
  margin-top: 20px;
  margin: auto; 
}

.about {
  font-size: 18px;
  font-style: italic;
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  display: inline-block;
  margin-right: 20px;
}

nav ul li a:hover {
  color: #007bff;
}

.menu-item {
  font-size: 16px;
}
button {
  padding: 10px 20px;
  margin-left: 50px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #ff00c8;
  color: #fff;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
