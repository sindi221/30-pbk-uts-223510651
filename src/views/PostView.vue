<template>
  <div class="app-container">
    <div class="container">
      <div class="posts-container">
        <h2>Postingan</h2>
        <select v-model="selectedUser" @change="fetchPosts" class="user-select">
          <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
        </select>
        <table class="posts-table">
          <thead>
            <tr>
              <th>Judul</th>
              <th>Isi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(post, index) in posts" :key="index" class="post-item">
              <td class="post-title">{{ post.title }}</td>
              <td class="post-body">{{ post.body }}</td>
              <td class="post-actions">
                <button @click="editPost(post.id)" class="btn btn-primary">Edit</button>
                <button @click="deletePost(post.id)" class="btn btn-secondary">Hapus</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostsComponent',
  data() {
    return {
      users: [],
      posts: [],
      selectedUser: null
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
          this.users = users;
        });
    },
    fetchPosts() {
      if (this.selectedUser) {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`)
          .then(response => response.json())
          .then(posts => {
            this.posts = posts;
          });
      }
    },
    editPost(postId) {
      const post = this.posts.find(post => post.id === postId);
      const newTitle = prompt('Edit Judul', post.title);
      const newBody = prompt('Edit Isi', post.body);

      if (newTitle && newBody) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title: newTitle, body: newBody, userId: this.selectedUser })
        })
          .then(response => response.json())
          .then(updatedPost => {
            post.title = updatedPost.title;
            post.body = updatedPost.body;
          });
      }
    },
    deletePost(postId) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'DELETE'
      }).then(() => {
        this.posts = this.posts.filter(post => post.id !== postId);
      });
    }
  }
};
</script>

<style scoped>
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f8f9fa;
  color: #343a40;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
}

.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.navbar {
  width: 100%;
  background-color: #007bff;
  padding: 10px 0;
  text-align: center;
  color: #fff;
}

.container {
  padding: 20px;
  width: 100%;
  max-width: 1200px !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.posts-container {
  width: 100%;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.posts-container h2 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #000000;
  margin-bottom: 20px;
  text-transform: uppercase;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
  text-align: center;
}

.user-select {
  margin-bottom: 20px;
  padding: 10px;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ced4da;
  width: 100%;
  max-width: 300px;
}

.posts-table {
  width: 100%;
  border-collapse: collapse;
}

.posts-table th,
.posts-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.post-title {
  font-weight: bold;
}

.post-body {
  color: #555;
}

.post-actions {
  text-align: center;
}

.post-actions .btn {
  margin-right: 5px;
}

.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.post-item:hover {
  background-color: #f1f1f1;
}

.post-item td {
  vertical-align: middle;
}
</style>
