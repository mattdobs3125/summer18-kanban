<template>
  <div class="list">
    Your Tasks
    <form @submit.prevent="addTask">
      <input type="text" placeholder="title" v-model="newTask.title" required>
      <input type="text" placeholder="description" v-model="newTask.description">
      <button type="submit">Create Task</button>
    </form>
    <div v-for="task in tasks" :key="task._id">
      <router-link :to="{name: 'task', params: {taskId: task._id}}">{{task.title}}</router-link>
      <button @click="deleteTask(task._id)">Delete Task</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "task",
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    data() {
      return {
        newTask: {
          title: "",
          description: ""
        }
      };
    },
    computed: {
      tasks() {
        return this.$store.state.tasks;
      }
    },
    methods: {
      addTask() {
        this.$store.dispatch("addTask", this.newTask);
        this.newTask = { title: "", description: "" };
      },
      deleteTask(taskId) {
        this.$store.dispatch("deleteTask", taskId);
      }
    }
  };</script>

<style scoped>
</style>