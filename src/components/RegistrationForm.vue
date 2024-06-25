<template>
  <div class="form-container">
    <h2>Form Pendaftaran Kegiatan</h2>
    <div class="form-content">
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
          <td colspan="2"><button @click="addActivity">Daftar</button></td>
        </tr>
      </table>

      <div class="filter-section">
        <select v-model="currentFilter">
          <option value="all">Semua</option>
          <option value="undone">Belum Selesai</option>
          <option value="done">Selesai</option>
        </select>
      </div>
    </div>

    <h2>Daftar Kegiatan</h2>
    <table>
      <tr v-for="(activity, index) in filteredActivities" :key="index">
        <td>
          <input type="checkbox" v-model="activity.completed">
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
  data() {
    return {
      newActivity: '',
      newDate: '',
      newTime: '',
      newHobby: '',
      editIndex: null,
      activities: JSON.parse(localStorage.getItem('activities')) || [],
      currentFilter: 'all'
    };
  },
  computed: {
    filteredActivities() {
      if (this.currentFilter === 'undone') {
        return this.activities.filter(activity => !activity.completed);
      } else if (this.currentFilter === 'done') {
        return this.activities.filter(activity => activity.completed);
      } else {
        return this.activities;
      }
    }
  },
  watch: {
    activities: {
      handler() {
        localStorage.setItem('activities', JSON.stringify(this.activities));
      },
      deep: true
    }
  },
  methods: {
    addActivity() {
      if (this.newActivity && this.newDate && this.newTime && this.newHobby) {
        const newActivity = {
          name: this.newActivity,
          date: this.newDate,
          time: this.newTime,
          hobby: this.newHobby,
          completed: false
        };
        if (this.editIndex !== null) {
          this.activities.splice(this.editIndex, 1, newActivity);
          this.editIndex = null;
        } else {
          this.activities.push(newActivity);
        }
        this.clearForm();
      }
    },
    cancelActivity(index) {
      this.activities.splice(index, 1);
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
      this.activities.splice(index, 1);
    },
    clearForm() {
      this.newActivity = '';
      this.newDate = '';
      this.newTime = '';
      this.newHobby = '';
      this.editIndex = null;
    }
  }
};
</script>

<style scoped>
.form-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background: linear-gradient(135deg, #92c8ff, #cc6dff) !important;

}

.form-content {
  margin-bottom: 20px;
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
  border: 1px solid #000000;
}

button {
  background-color: #5f2222 !important;
  color: white !important;
  padding: 10px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #c6b8c5 !important;
}

input[type="text"], input[type="date"], input[type="time"] {
  width: calc(100% - 20px); /* Sesuaikan lebar input dengan margin padding */
  padding: 8px;
  box-sizing: border-box;
}
</style>
