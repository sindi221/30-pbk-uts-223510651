<template>
  <div class="form-container">
    <h2>Form Pendaftaran Kegiatan</h2>
    <button @click="emitEvent">Click Me</button>
    <table>
      <tr>
        <td><label for="activity">Kegiatan:</label></td>
        <td><input type="text" id="activity" v-model="newActivity"></td>
      </tr>
      <tr>
        <td><label for="date">Tanggal:</label></td>
        <td><input type="date" id="date" v-model="newDate"></td>
      </tr>
      <tr>
        <td><label for="time">Jam:</label></td>
        <td><input type="time" id="time" v-model="newTime"></td>
      </tr>
      <tr>
        <td><label for="hobby">Hobi:</label></td>
        <td><input type="text" id="hobby" v-model="newHobby"></td>
      </tr>
      <tr>
        <td colspan="2">
          <button v-if="editIndex !== null" @click="updateActivity">Simpan</button>
          <button v-else @click="addActivity">Daftar</button>
        </td>
      </tr>
    </table>

    <h2>Daftar Kegiatan</h2>
    <table>
      <tr v-for="(activity, index) in activities" :key="index">
        <td>
          <input type="checkbox" v-model="activity.completed" @change="toggleCompletion(activity)">
        </td>
        <td :class="{ 'completed': activity.completed }">{{ activity.name }}</td>
        <td>{{ activity.date }}</td>
        <td>{{ activity.time }}</td>
        <td>{{ activity.hobby }}</td>
        <td><button @click="cancelActivity(index)">Batalkan</button></td>
        <td><button @click="editActivity(index)">Edit</button></td>
        <td><button @click="deleteActivity(index)">Hapus</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ['activities'],
  data() {
    return {
      newActivity: '',
      newDate: '',
      newTime: '',
      newHobby: '',
      editIndex: null
    };
  },
  methods: {
    emitEvent() {
      this.$emit('customEvent', 'Hello from Todos Component');
    },
    addActivity() {
      if (this.newActivity && this.newDate && this.newTime && this.newHobby) {
        const newActivity = {
          name: this.newActivity,
          date: this.newDate,
          time: this.newTime,
          hobby: this.newHobby,
          completed: false
        };
        this.$emit('add-activity', newActivity);
        this.clearForm();
      }
    },
    updateActivity() {
      if (this.editIndex !== null && this.newActivity && this.newDate && this.newTime && this.newHobby) {
        const updatedActivity = {
          name: this.newActivity,
          date: this.newDate,
          time: this.newTime,
          hobby: this.newHobby,
          completed: this.activities[this.editIndex].completed
        };
        this.$emit('update-activity', { index: this.editIndex, activity: updatedActivity });
        this.clearForm();
        this.editIndex = null;
      }
    },
    toggleCompletion(activity) {
      this.$emit('toggle-completion', activity);
    },
    cancelActivity(index) {
      this.$emit('cancel-activity', index);
    },
    editActivity(index) {
      const activity = this.activities[index];
      this.newActivity = activity.name;
      this.newDate = activity.date;
      this.newTime = activity.time;
      this.newHobby = activity.hobby;
      this.editIndex = index;
    },
    deleteActivity(index) {
      this.$emit('cancel-activity', index);
    },
    clearForm() {
      this.newActivity = '';
      this.newDate = '';
      this.newTime = '';
      this.newHobby = '';
      this.editIndex = null;
    },
    setEditActivity(activity) {
      this.newActivity = activity.name;
      this.newDate = activity.date;
      this.newTime = activity.time;
      this.newHobby = activity.hobby;
    }
  }
};
</script>
<style scoped>
body {
  background-color: #79e8c5;
}
.form-container {
  margin: 20px;
}

h2 {
  text-align: center;
}

table {
  width: 100%;
  margin-top: 10px;
  border-collapse: collapse;
}

td, th {
  padding: 10px;
  border: 1px solid #ddd;
}

.completed {
  text-decoration: line-through;
  color: #999;
}

button {
  background-color: #98c935;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #c6b8c5;
}

input[type="text"], input[type="date"], input[type="time"] {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
</style>
