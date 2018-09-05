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
    name: 'List'
  }
</script>

<style scoped>
</style>