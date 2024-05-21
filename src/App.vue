<template>
  <div id="app">
    <button @click="goToPost">Post</button>
    <button @click="showTodoListForm">TodoList</button>
    <EmitCom @response="UbahTeks" />
    <NewComponent title="Todo List Form">
      <Todos 
        v-if="!showPost" 
        ref="todosComponent"
        :activities="activities" 
        @cancel-activity="cancelActivity" 
        @toggle-completion="toggleCompletion" 
        @add-activity="addActivity" 
        @edit-activity="editActivity"
        @update-activity="updateActivity"
        @customEvent="handleCustomEvent"
      />
    </NewComponent>
    <Post 
      v-if="showPost" 
      :users="users" 
      :posts="posts" 
      :selectedUser="selectedUser" 
      @fetch-posts="fetchPosts" 
    />
  </div>
</template>

<script>
import NewComponent from './components/NewComponent.vue';
import Todos from './components/Todos.vue';
import Post from './components/Post.vue';
import EmitCom from './components/EmitCom.vue';

export default {
  components: {
    NewComponent,
    Todos,
    Post
  },
  data() {
    return {
      showPost: false,
      activities: [],
      users: [],
      selectedUser: null,
      posts: [],
      editIndex: null,
    };
  },
  methods: {
    showTodoListForm() {
      this.showPost = false;
    },
    goToPost() {
      this.showPost = true;
    },
    async fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        this.users = data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async fetchPosts(selectedUserId) {
      if (!selectedUserId) return;
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUserId}`);
        const data = await response.json();
        this.posts = data;
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
    addActivity(newActivity) {
      if (this.editIndex !== null) {
        this.$set(this.activities, this.editIndex, newActivity);
        this.editIndex = null;
      } else {
        this.activities.push(newActivity);
      }
    },
    cancelActivity(index) {
      this.activities.splice(index, 1);
    },
    toggleCompletion(activity) {
      activity.completed = !activity.completed;
    },
    editActivity(index) {
      this.editIndex = index;
      const activityToEdit = this.activities[index];
      this.$refs.todosComponent.setEditActivity(activityToEdit);
    },
    updateActivity(updatedActivity) {
      if (this.editIndex !== null) {
        this.$set(this.activities, this.editIndex, updatedActivity);
        this.editIndex = null;
      }
    },
    handleCustomEvent(message) {
      console.log(message);  // Or handle the event as needed
      alert(message);
    }
  },
  async created() {
    await this.fetchUsers();
  }
};
</script>

<style scoped>
* {
  background-color: rgb(30, 103, 82);
}
</style>
