<template>
  <div class="post-container">
    <h2>Post</h2>
    <select v-model="localSelectedUser" @change="handleUserChange">
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>
    <div v-for="post in posts" :key="post.id">
      <h3>{{ post.title }}</h3>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    users: Array,
    posts: Array,
    selectedUser: Number
  },
  data() {
    return {
      localSelectedUser: this.selectedUser
    };
  },
  watch: {
    selectedUser(newVal) {
      this.localSelectedUser = newVal;
    }
  },
  methods: {
    handleUserChange() {
      this.$emit('update:selectedUser', this.localSelectedUser);
      this.$emit('fetch-posts', this.localSelectedUser);
    }
  }
};
</script>

<style>
.post-container {
  margin-top: 20px;
}

h2 {
  text-align: center;
}

select {
  display: block;
  margin: 10px auto;
  padding: 10px;
  font-size: 16px;
}

h3 {
  color: #d4e8e5;
}

p {
  color: #0a0101;
}
</style>
